import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";

const AddFood = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    food_name: "",
    food_image: "",
    food_quantity: "",
    pickup_location: "",
    expire_date: "",
    additional_notes: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle text input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Image upload
  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    const imgData = new FormData();
    imgData.append("image", imageFile);

    try {
      setLoading(true);
      const res = await fetch(
        "https://api.imgbb.com/1/upload?key=cac96f4485226aa9453719d109846426",
        {
          method: "POST",
          body: imgData,
        }
      );
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          food_image: data.data.url,
        }));
      }
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first!");
      return;
    }

    if (!formData.food_image) {
      alert("Please upload food image!");
      return;
    }

    // ✅ ONLY send email for verification
    const payload = {
      ...formData,
      email: user.email, // ⭐ MOST IMPORTANT FIX
    };

    try {
      setLoading(true);

      const res = await fetch(
        "https://community-food-sharing-server-iota.vercel.app/add-food",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (data.acknowledged || data.insertedId) {
        alert("Food added successfully!");
        setFormData({
          food_name: "",
          food_image: "",
          food_quantity: "",
          pickup_location: "",
          expire_date: "",
          additional_notes: "",
        });
      } else {
        alert("Failed to add food");
      }
    } catch (error) {
      console.error("Add food failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Add New Food
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="food_name"
            value={formData.food_name}
            onChange={handleChange}
            required
            placeholder="Food name"
            className="input input-bordered w-full"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />

          {formData.food_image && (
            <img
              src={formData.food_image}
              alt="food"
              className="w-40 h-40 object-cover rounded"
            />
          )}

          <input
            type="text"
            name="food_quantity"
            value={formData.food_quantity}
            onChange={handleChange}
            required
            placeholder="Food quantity"
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="pickup_location"
            value={formData.pickup_location}
            onChange={handleChange}
            required
            placeholder="Pickup location"
            className="input input-bordered w-full"
          />

          <input
            type="date"
            name="expire_date"
            value={formData.expire_date}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />

          <textarea
            name="additional_notes"
            value={formData.additional_notes}
            onChange={handleChange}
            placeholder="Additional notes"
            className="textarea textarea-bordered w-full"
          />

          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-gradient-to-r from-[#ff8a0c] to-[#07a0e3] text-white"
          >
            {loading ? "Adding..." : "Add Food"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
