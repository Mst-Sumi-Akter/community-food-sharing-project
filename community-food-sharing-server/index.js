const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ztnzz8f.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("food-sharing-db");
    const foodsCollection = db.collection("food");
    const usersCollection = db.collection("users");

    console.log("MongoDB connected successfully ✅");

    // -------------------- MIDDLEWARE -------------------- //
    const verifyUser = async (req, res, next) => {
      try {
        const email = req.query?.email || req.body?.email;
        // console.log("Verifying user:", email); 
        if (!email) {
          // Allow GET requests without body email if query email is present, handled above.
          // If neither, technically public or unrestricted? 
          // For now, if verifyUser is used, email is expected.
          return res.status(401).send({ message: "Email required for verification" });
        }

        // Simple verification: Just check if user exists in DB. 
        // In a real app, you'd verify a JWT token here.
        const user = await usersCollection.findOne({ email });
        if (!user) {
          return res.status(403).send({ message: "User not found / Unauthorized" });
        }

        req.user = user;
        next();
      } catch (err) {
        console.error("verifyUser error:", err);
        res.status(500).send({ message: "Verify user failed" });
      }
    };

    const verifyAdmin = (req, res, next) => {
      if (req.user?.role !== "admin") {
        return res.status(403).send({ message: "Admin access required" });
      }
      next();
    };


    // -------------------- ROOT -------------------- //
    app.get("/", (req, res) => {
      res.send("PlateShare server is running!");
    });

    // -------------------- USERS -------------------- //

    // Get user by email (For role checking & Profile)
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = await usersCollection.findOne({ email });
      res.send(user || {});
    });

    // Add user (Login/Register sync)
    app.post("/users", async (req, res) => {
      const user = req.body;
      if (!user.email || !user.displayName) {
        return res.status(400).send({ message: "Email & displayName required" });
      }

      const exists = await usersCollection.findOne({ email: user.email });
      if (exists) {
        return res.send({ acknowledged: true, message: "User already exists" });
      }

      user.role = "user"; // Default role
      user.createdAt = new Date();

      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // Get all users (Admin only)
    app.get("/users", verifyUser, verifyAdmin, async (req, res) => {
      const users = await usersCollection.find().toArray();
      res.send(users);
    });

    // -------------------- FOODS -------------------- //

    // Get all foods (Sorted by quantity desc or just all) - with Search & Pagination & Sort
    app.get("/foods", async (req, res) => {
      const { search, page, limit, sort } = req.query;
      const pageNumber = parseInt(page) || 1;
      const limitNumber = parseInt(limit) || 100; // Default large limit if not specified
      const skip = (pageNumber - 1) * limitNumber;

      let query = {};
      if (search) {
        query.food_name = { $regex: search, $options: "i" };
      }

      let sortOptions = { food_quantity: -1 }; // Default
      if (sort === "expire_asc") {
        sortOptions = { expire_date: 1 };
      } else if (sort === "expire_desc") {
        sortOptions = { expire_date: -1 };
      }

      const foods = await foodsCollection
        .find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNumber)
        .toArray();

      const total = await foodsCollection.countDocuments(query);

      res.send({ foods, total }); // Sending object with data and total count
    });

    // Get foods by status (e.g. "Available") with Search & Pagination & Sort
    app.get("/foods/status/:status", async (req, res) => {
      const status = req.params.status;
      const { search, page, limit, sort } = req.query;
      const pageNumber = parseInt(page) || 1;
      const limitNumber = parseInt(limit) || 100;
      const skip = (pageNumber - 1) * limitNumber;

      let query = { food_status: status };
      if (search) {
        query.food_name = { $regex: search, $options: "i" };
      }

      let sortOptions = { food_quantity: -1 }; // Default
      if (sort === "expire_asc") {
        sortOptions = { expire_date: 1 };
      } else if (sort === "expire_desc") {
        sortOptions = { expire_date: -1 };
      }

      const foods = await foodsCollection
        .find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNumber)
        .toArray();

      const total = await foodsCollection.countDocuments(query);

      res.send({ foods, total });
    });

    // Get single food details
    app.get("/foods/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const food = await foodsCollection.findOne({ _id: new ObjectId(id) });
        res.send(food);
      } catch (error) {
        res.status(404).send({ message: "Food not found" });
      }
    });

    // Add Food (Protected)
    app.post("/add-food", verifyUser, async (req, res) => {
      const food = req.body;

      // Ensure default fields
      food.food_status = "Available";
      food.created_at = new Date();
      food.donator_email = req.user.email;
      food.donator_name = req.user.displayName;
      food.donator_image = req.user.photoURL || "";

      const result = await foodsCollection.insertOne(food);
      res.send(result);
    });

    // My Foods (Protected)
    app.get("/my-foods", verifyUser, async (req, res) => {
      const foods = await foodsCollection.find({ donator_email: req.user.email }).toArray();
      res.send(foods);
    });

    // Request Food (Protected)
    app.patch("/foods/:id/request", verifyUser, async (req, res) => {
      const id = req.params.id;
      const requestingEmail = req.user.email;

      const food = await foodsCollection.findOne({ _id: new ObjectId(id) });
      if (!food) return res.status(404).send({ message: "Food not found" });

      if (food.requested_by_email === requestingEmail) {
        return res.send({ acknowledged: true, modifiedCount: 0, message: "Already requested by you" });
      }

      const result = await foodsCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            requested_by_email: requestingEmail,
            food_status: "Requested"
          }
        }
      );
      res.send(result);
    });

    // My Requests (Protected) - Foods I have requested
    app.get("/food-requests", verifyUser, async (req, res) => {
      const requests = await foodsCollection.find({ requested_by_email: req.user.email }).toArray();
      res.send(requests);
    });

    // All Requested Foods (For Admin Dashboard: "All Food Requests")
    // Anyone can see technically, but useful for admin.
    app.get("/foods-requested", verifyUser, verifyAdmin, async (req, res) => {
      const requests = await foodsCollection.find({ food_status: "Requested" }).toArray();
      res.send(requests);
    });


    // -------------------- ADMIN OPERATIONS -------------------- //

    // Delete Food (Admin only)
    app.delete("/foods/:id", verifyUser, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const result = await foodsCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // Update Food Status (Admin Approve/Reject)
    app.patch("/foods/:id/status", verifyUser, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const { status } = req.body;
      const filter = { _id: new ObjectId(id) };
      let updateDoc = {
        $set: { food_status: status }
      };

      if (status === "Available") {
        updateDoc.$unset = { requested_by_email: "" };
      }

      const result = await foodsCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Update Food (Admin or Owner - Simplified here to Admin/Owner if needed, likely Owner update logic exists elsewhere or handled by 'update-food' page which might call a specific route. 
    // Usually update is PUT /foods/:id. Let's add general update.)
    app.put("/foods/:id", async (req, res) => {
      const id = req.params.id;
      const updatedDoc = req.body;
      delete updatedDoc._id; // prevent _id update error

      const result = await foodsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedDoc }
      );
      res.send(result);
    });


    // Send a ping to confirm a successful connection
    // await db.command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Start server ONLY after DB connection
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error("Mongodb connection error:", error);
  }
}

run().catch(console.dir);
