import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { FaRegUser, FaEnvelope } from "react-icons/fa6";
import { MdOutlineFoodBank } from "react-icons/md";
import { LuHeartHandshake } from "react-icons/lu";
import Spinner from "../components/Spinner";

// CountUp Component
const CountUp = ({ end, duration = 800 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = end / (duration / 20);

    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.round(start));
      }
    }, 20);

    return () => clearInterval(interval);
  }, [end, duration]);

  return <span>{count}</span>;
};

// Profile Page
const Profile = () => {
  const { user, loading } = useAuth();

  const [myFoods, setMyFoods] = useState(0);
  const [myRequests, setMyRequests] = useState(0);
  const [dbRole, setDbRole] = useState("user"); // Default role

  useEffect(() => {
    if (!user?.email) return;

    // My Foods
    fetch(`https://community-food-sharing-server-iota.vercel.app/my-foods?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyFoods(Array.isArray(data) ? data.length : 0))
      .catch(console.error);

    // My Requests
    fetch(`https://community-food-sharing-server-iota.vercel.app/food-requests?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyRequests(Array.isArray(data) ? data.length : 0))
      .catch(console.error);

    // Role from MongoDB
    fetch(`https://community-food-sharing-server-iota.vercel.app/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setDbRole(data?.role || "user"))
      .catch(console.error);
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="User"
            className="w-32 h-32 rounded-full border-4 border-orange-400 object-cover"
          />
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{user?.displayName}</h2>
            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
              <FaEnvelope /> {user?.email}
            </p>
            {/* Role Badge */}
            <span
              className={`inline-block mt-3 px-4 py-1 text-sm rounded-full font-semibold ${
                dbRole === "admin"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-orange-100 text-orange-600"
              }`}
            >
              {dbRole === "admin" ? "Admin" : "PlateShare Member"}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <StatCard
            icon={<MdOutlineFoodBank className="text-4xl text-orange-500 mx-auto mb-3" />}
            title="My Foods"
            description="Foods you shared"
            value={<CountUp end={myFoods} />}
          />
          <StatCard
            icon={<LuHeartHandshake className="text-4xl text-pink-500 mx-auto mb-3" />}
            title="My Requests"
            description="Foods you requested"
            value={<CountUp end={myRequests} />}
          />
          <StatCard
            icon={<FaRegUser className="text-4xl text-green-500 mx-auto mb-3" />}
            title="Role"
            description="Account Type"
            value={<span className="text-black font-bold text-2xl">{dbRole === "admin" ? "Admin" : "User"}</span>}
          />
        </div>

        {/* About */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">
          <h3 className="text-2xl text-black font-bold mb-4">About Me</h3>
          <p className="text-gray-700">
            I believe in reducing food waste and helping people by sharing surplus
            food through PlateShare.
          </p>
        </div>
      </div>
    </div>
  );
};

// StatCard Component
const StatCard = ({ icon, title, description, value }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 text-center">
    {icon}
    <h3 className="text-2xl font-bold text-black">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
    <div className="mt-3 text-black text-3xl font-bold">{value}</div>
  </div>
);

export default Profile;
