import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Spinner from "../components/Spinner";

const ManageMyFoods = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's foods
  useEffect(() => {
    if (!user) return;

    fetch(`https://community-food-sharing-server-iota.vercel.app/my-foods?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [user]);

  // Delete food
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://community-food-sharing-server-iota.vercel.app/foods/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.deletedCount) {
        setFoods(foods.filter((f) => f._id !== id));
        alert("Food deleted successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete food!");
    }
  };

  // Update food (navigate to update page)
  const handleUpdate = (id) => {
    window.location.href = `/update-food/${id}`;
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 dark:bg-slate-900 min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Manage <span className="text-orange-500">My Foods</span>
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Discover community-shared meals waiting for you — fresh, homemade, and shared with love.
        </p>
      </div>

      <div className="flex justify-center pt-4 py-6">
        <div className="w-24 h-1 rounded-full bg-gradient-to-r from-[#ff8a0c] to-[#07a0e3]"></div>
      </div>

      {foods.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
          No foods added yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 dark:bg-slate-700">
                <th className="border px-4 py-2 text-left">Food Name</th>
                <th className="border px-4 py-2 text-left">Quantity</th>
                <th className="border px-4 py-2 text-left">Pickup Location</th>
                <th className="border px-4 py-2 text-left">Expire Date</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id} className="hover:bg-gray-100 dark:hover:bg-slate-700">
                  <td className="border px-4 py-2">{food.food_name}</td>
                  <td className="border px-4 py-2">{food.food_quantity}</td>
                  <td className="border px-4 py-2">{food.pickup_location}</td>
                  <td className="border px-4 py-2">{food.expire_date}</td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleUpdate(food._id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Update
                    </button>
                    {/* <button
                      onClick={() => handleDelete(food._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMyFoods;


