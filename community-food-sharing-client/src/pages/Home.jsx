import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import FoodCard from "../components/FoodCard";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://community-food-sharing-server-iota.vercel.app/foods/status/Available")
      .then((res) => res.json())
      .then((data) => {
        if (data.foods) {
          // Sort by quantity descending
          const sorted = data.foods.sort((a, b) => b.quantity - a.quantity);
          setFoods(sorted.slice(0, 6)); // Top 6 featured
        } else {
          setFoods([]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 dark:bg-slate-900">
      {/* Banner Section */}
      <section className="mb-12">
        <Banner />
      </section>

      {/* Featured Foods Section */}
      <section className="py-12">
        <h1 className="text-4xl font-bold text-center text-gray-600 dark:text-white mb-6 drop-shadow-md">
          Featured <span className="text-orange-500">Dishes</span>
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : foods.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300 mt-6">
            No featured foods available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {foods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        )}

        {/* Show All Foods Button */}
        <div className="text-center mt-10">
          <Link
            to="/all-foods"
            className="px-6 py-3 bg-gradient-to-r from-[#ff8a0c] via-[#ff9e2b] to-[#07a0e3] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Show All Foods
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-gray-50 dark:bg-slate-800 rounded-xl my-10">
        <h1 className="text-4xl font-bold text-center text-gray-600 dark:text-white mb-6">
          How <span className="text-orange-500">It Works</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center px-4">
          {[
            {
              title: "1. Post Food",
              desc: "Donate your surplus food by posting it with all necessary details.",
            },
            {
              title: "2. Find Food",
              desc: "Browse the available food posts shared by others in your community.",
            },
            {
              title: "3. Collect Food",
              desc: "Request and pick up the food from the donator safely and efficiently.",
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Community Stats Section */}
      <section className="py-12">
        <h1 className="text-4xl font-bold text-center text-gray-600 dark:text-white mb-6 drop-shadow-md">
          Our <span className="text-orange-500">Mission</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center px-4">
          {[
            { value: "500+", label: "Meals Shared" },
            { value: "200+", label: "Active Donators" },
            { value: "100+", label: "Communities Reached" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-6 bg-gradient-to-r from-[#ff8a0c] to-[#07a0e3] text-white rounded-lg shadow hover:scale-105 transition-transform"
            >
              <h3 className="font-bold text-xl mb-2">{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;


