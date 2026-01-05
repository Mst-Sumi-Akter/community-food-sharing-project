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

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload to img
  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setLoading(true);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=cac96f4485226aa9453719d109846426`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, food_image: data.data.url }));
      }
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert(" Please login first!");
      return;
    }

    if (!formData.food_image) {
      alert(" Please upload a food image first!");
      return;
    }

    const payload = {
      ...formData,
      donator_name: user.displayName,
      donator_email: user.email,
      donator_image: user.photoURL,
      food_status: "Available",
    };

    try {
      setLoading(true);
      const res = await fetch("https://community-food-sharing-server-iota.vercel.app/add-food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.acknowledged) {
        alert(" Food added successfully!");
        setFormData({
          food_name: "",
          food_image: "",
          food_quantity: "",
          pickup_location: "",
          expire_date: "",
          additional_notes: "",
        });
      }
    } catch (error) {
      console.error("Add food failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // UI Layout

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Add New Food
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Food Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Food Name
            </label>
            <input
              type="text"
              name="food_name"
              value={formData.food_name}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
              placeholder="Enter food name"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Upload Food Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full"
              required
            />
            {loading && (
              <p className="text-sm text-gray-500 mt-2">Uploading image...</p>
            )}
            {formData.food_image && (
              <img
                src={formData.food_image}
                alt="Uploaded"
                className="mt-3 w-40 h-40 object-cover rounded-lg shadow-md"
              />
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Food Quantity
            </label>
            <input
              type="text"
              name="food_quantity"
              value={formData.food_quantity}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
              placeholder="e.g., Serves 2 people"
            />
          </div>

          {/* Pickup Location */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Pickup Location
            </label>
            <input
              type="text"
              name="pickup_location"
              value={formData.pickup_location}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
              placeholder="e.g., Dhaka City, Dhanmondi"
            />
          </div>

          {/* Expire Date */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Expire Date
            </label>
            <input
              type="date"
              name="expire_date"
              value={formData.expire_date}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="additional_notes"
              value={formData.additional_notes}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              placeholder="Write any details or special info..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn bg-gradient-to-r bg-gradient-to-r from-[#ff8a0c] to-[#07a0e3] text-white font-semibold px-6"
            >
              {loading ? "Adding..." : "Add Food"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;


