import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Spinner from "../components/Spinner";
import toast, { Toaster } from "react-hot-toast";

/* -------------------- MAIN COMPONENT -------------------- */
const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Helper to calculate Expiry Progress
  const calculateExpiryHealth = (expireDateStr) => {
    if (!expireDateStr) return 0;
    const today = new Date();
    const expire = new Date(expireDateStr);
    const diffTime = expire - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return 0;
    if (diffDays >= 7) return 100;
    return Math.round((diffDays / 7) * 100);
  };

  // Fetch food details
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await fetch(
          `https://community-food-sharing-server-iota.vercel.app/foods/${id}`
        );
        if (!res.ok) throw new Error("Unable to load food details");
        setFood(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  // Request food
  const handleRequestFood = async () => {
    if (!user) {
      return navigate("/login", { state: { from: location } });
    }

    try {
      const res = await fetch(
        `https://community-food-sharing-server-iota.vercel.app/foods/${id}/request`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        }
      );

      const result = await res.json();

      if (result.modifiedCount > 0) {
        setFood({ ...food, food_status: "Requested", requested_by_email: user.email });
        toast.success("Food requested successfully! ");
      } else {
        toast.error("Unable to request this food. ");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again!");
    }
  };

  if (loading) return <Spinner />;
  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  // Derived metrics
  const availabilityPercent = food.food_status === "Available" ? 100 : 0;

  let requestProgress = 15; // Base level for "Registered"
  if (food.food_status === "Requested") requestProgress = 60;
  if (food.food_status === "Approved") requestProgress = 100;

  const expiryHealth = calculateExpiryHealth(food.expire_date);

  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      {/* Toaster for notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* HERO */}
      <div className="relative h-[420px] ">
        <img
          src={food.food_image}
          alt={food.food_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-8 left-8 text-white">
          <span
            className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-3 ${
              food.food_status === "Requested"
                ? "bg-gray-500 text-black" // ← black text for Requested
                : "bg-emerald-600 text-white" // ← white text for other statuses
            }`}
          >
            {food.food_status}
          </span>
          <h1 className="text-4xl font-bold">{food.food_name}</h1>
          <p className="opacity-90 mt-1">
            Shared by <strong>{food.donator_name}</strong>
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-6xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-10">
          <Section title="Food Information">
            <InfoGrid food={food} />
          </Section>

          {food.additional_notes && (
            <Section title="Pickup Instructions">
              <p className="text-gray-700 leading-relaxed">
                {food.additional_notes}
              </p>
            </Section>
          )}

          <Section title="Safety & Responsibility">
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 text-sm">
              <li>Pickup on time before expiry</li>
              <li>Check food condition before consumption</li>
              <li>Respect donor’s instructions</li>
            </ul>
          </Section>
        </div>

        {/* RIGHT ACTION CARD */}
        <div className="sticky top-24 h-fit bg-white border rounded-2xl shadow-md p-6 space-y-5">
          <div className="text-center">
            <p className="text-sm text-gray-500">Food Status</p>
            <p className="font-semibold text-lg">{food.food_status}</p>
          </div>

          <button
            onClick={handleRequestFood}
            disabled={
              food.food_status === "Approved" ||
              (food.food_status === "Requested" &&
                food.requested_by_email === user?.email)
            }
            className={`w-full py-4 rounded-xl text-lg font-semibold transition ${
              food.food_status === "Approved" ||
              (food.food_status === "Requested" &&
                food.requested_by_email === user?.email)
                ? "bg-gray-300 dark:bg-gray-600 text-black cursor-not-allowed"
                : "bg-gradient-to-r from-[#ff8a0c] to-[#07a0e3] text-white hover:shadow-lg"
            }`}
          >
            {food.food_status === "Approved"
              ? "Not Available"
              : food.food_status === "Requested" &&
                food.requested_by_email === user?.email
              ? "You Requested This"
              : "Request This Food"}
          </button>

          {!user && (
            <p className="text-center text-sm text-gray-500">
              Login required to request food
            </p>
          )}

          <p className="text-xs text-gray-400 text-center">
            By requesting, you agree to collect responsibly.
          </p>
        </div>
      </div>

      {/* -------------------- ANIMATED DASHBOARD -------------------- */}
      <div className="max-w-6xl mx-auto px-4 mt-24">
        <div className="bg-white border rounded-3xl shadow-lg p-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Food Lifecycle Analytics
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Real-time progress and health of this shared food item
              </p>
            </div>
            <span className="mt-4 md:mt-0 text-xs px-4 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              Dynamic Metrics
            </span>
          </div>

          {/* TIMELINE */}
          <div className="mb-14">
            <p className="text-sm font-medium text-gray-700 mb-4">
              Lifecycle Progress
            </p>
            <div className="relative flex items-center justify-between">
              <div className="absolute left-0 right-0 top-1/2 h-[3px] bg-gray-200" />
              {["Posted", "Available", "Requested", "Pickup"].map((step, i) => {
                let activeIndex = 0;
                if (food.food_status === "Available") activeIndex = 1;
                if (food.food_status === "Requested") activeIndex = 2;
                if (food.food_status === "Approved") activeIndex = 3;

                return (
                  <div
                    key={step}
                    className="relative z-10 flex flex-col items-center"
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 transition-all duration-500 ${
                        i <= activeIndex
                          ? "bg-gradient-to-r from-orange-500 to-pink-500 border-transparent"
                          : "bg-white border-gray-300"
                      }`}
                    />
                    <span className="mt-3 text-xs text-gray-600 dark:text-gray-300">
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* METRICS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedMetric
              title="Availability Status"
              value={food.food_status}
              targetPercent={availabilityPercent}
              color="bg-emerald-500"
              subText={
                availabilityPercent === 100 ? "Ready for Pickup" : "Currently Engaged"
              }
            />

            <AnimatedMetric
              title="Request Progress"
              value={`${requestProgress}%`}
              targetPercent={requestProgress}
              color="bg-orange-500"
              subText="Completion Rate"
            />

            <AnimatedMetric
              title="Freshness / Expiry Health"
              value={`${Math.min(expiryHealth, 100)}%`}
              targetPercent={expiryHealth}
              color={expiryHealth > 50 ? "bg-sky-500" : "bg-red-500"}
              subText={food.expire_date}
            />
          </div>

          <p className="text-xs text-gray-400 mt-10">
            * 'Freshness' is estimated based on remaining days until expiry.
          </p>
        </div>
      </div>
    </main>
  );
};

/* -------------------- REUSABLE COMPONENTS -------------------- */
const Section = ({ title, children }) => (
  <section>
    <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
    <div className="bg-white border rounded-xl p-6">{children}</div>
  </section>
);

const InfoGrid = ({ food }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
    <Info label="Quantity" value={food.food_quantity} />
    <Info label="Pickup Location" value={food.pickup_location} />
    <Info label="Expiry Date" value={food.expire_date} />
    <Info label="Donator" value={food.donator_name} />
  </div>
);

const Info = ({ label, value }) => (
  <div className="flex items-start gap-4">
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

/* -------------------- ANIMATED METRIC COMPONENT -------------------- */
const AnimatedMetric = ({ title, value, targetPercent, color, subText }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const stepTime = 20;
    const increment = (targetPercent / duration) * stepTime;

    const interval = setInterval(() => {
      start += increment;
      if (start >= targetPercent) {
        start = targetPercent;
        clearInterval(interval);
      }
      setPercent(Math.round(start));
    }, stepTime);

    return () => clearInterval(interval);
  }, [targetPercent]);

  return (
    <div className="border rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-500">{title}</p>
        <span className="text-lg font-bold text-gray-800">{value}</span>
      </div>
      <div className="h-3 rounded-full bg-gray-200 overflow-hidden mb-2">
        <div
          className={`h-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 flex justify-between">
        <span>{percent}%</span>
        <span>{subText}</span>
      </p>
    </div>
  );
};

export default FoodDetails;
