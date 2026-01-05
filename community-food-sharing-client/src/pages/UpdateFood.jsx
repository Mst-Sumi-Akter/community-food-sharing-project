import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://community-food-sharing-server-iota.vercel.app/foods/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedFood = {
      food_name: form.food_name.value,
      food_quantity: form.food_quantity.value,
      pickup_location: form.pickup_location.value,
      expire_date: form.expire_date.value,
      additional_notes: form.additional_notes.value,
    };

    try {
      const res = await fetch(`https://community-food-sharing-server-iota.vercel.app/foods/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFood),
      });

      const data = await res.json();
      if (data.modifiedCount) {
        alert("Food updated successfully!");
        navigate("/manage-foods"); // redirect back to list
      } else {
        alert("Nothing updated");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update food");
    }
  };

  if (loading) return <Spinner />;
  if (!food) return <p>Food not found</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Update <span className="text-orange-500">Foods</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="food_name"
          defaultValue={food.food_name}
          placeholder="Food Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="food_quantity"
          defaultValue={food.food_quantity}
          placeholder="Quantity"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="pickup_location"
          defaultValue={food.pickup_location}
          placeholder="Pickup Location"
          className="input input-bordered w-full"
          required
        />
        <input
          type="date"
          name="expire_date"
          defaultValue={food.expire_date?.split("T")[0]}
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="additional_notes"
          defaultValue={food.additional_notes}
          placeholder="Additional Notes"
          className="textarea textarea-bordered w-full"
        />
        <button
          type="submit"
          className="btn bg-blue-500 text-white w-full"
        >
          Update Food
        </button>
      </form>
    </div>
  );
};

export default UpdateFood;


