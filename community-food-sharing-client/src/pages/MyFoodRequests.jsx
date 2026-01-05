import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Spinner from "../components/Spinner";

const MyFoodRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchRequests = async () => {
      try {
        const res = await fetch(
          `https://community-food-sharing-server-iota.vercel.app/food-requests?email=${user.email}`
        );
        if (!res.ok) throw new Error("Failed to load your food requests");
        const data = await res.json();
        setRequests(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load your food requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 text-lg py-10">{error}</p>
    );

  if (requests.length === 0)
    return (
      <p className="text-center text-gray-600 dark:text-gray-300 text-lg py-10">
        No food requests yet.
      </p>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          My <span className="text-orange-500">Food Requests</span>
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Track the meals you’ve requested from your community — stay updated and collect on time.
        </p>
      </div>

      {/* Decorative line */}
      <div className="flex justify-center pt-4 py-6">
        <div className="w-24 h-1 rounded-full bg-gradient-to-r from-[#ff8a0c] to-[#07a0e3]"></div>
      </div>

      {/* Requests Table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full border-collapse border bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 dark:bg-slate-700">
              <th className="border px-4 py-2 text-left">Food Name</th>
              <th className="border px-4 py-2 text-left">Quantity</th>
              <th className="border px-4 py-2 text-left">Pickup Location</th>
              <th className="border px-4 py-2 text-left">Expire Date</th>
              <th className="border px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((food) => (
              <tr
                key={food._id}
                className="hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <td className="border px-4 py-2">{food.food_name}</td>
                <td className="border px-4 py-2">{food.food_quantity}</td>
                <td className="border px-4 py-2">{food.pickup_location}</td>
                <td className="border px-4 py-2">
                  {food.expire_date
                    ? new Date(food.expire_date).toISOString().split("T")[0]
                    : "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {food.food_status || "Requested"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFoodRequests;


