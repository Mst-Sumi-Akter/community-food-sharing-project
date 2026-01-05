import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import AddFood from "./AddFood"; // Reuse existing component
import { FaUserShield, FaUsers, FaUtensils, FaClipboardList, FaBox, FaCheck, FaTimes } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  // DATA STATE
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [allFoods, setAllFoods] = useState([]);

  // FETCHERS
  const fetchUsers = async () => {
    try {
      const res = await fetch(`https://community-food-sharing-server-iota.vercel.app/users?email=${user?.email}`);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await fetch(`https://community-food-sharing-server-iota.vercel.app/foods-requested?email=${user?.email}`);
      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load requests");
    }
  };

  const fetchAllFoods = async () => {
    try {
      const res = await fetch(`https://community-food-sharing-server-iota.vercel.app/foods`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setAllFoods(data);
      } else if (data.foods && Array.isArray(data.foods)) {
        setAllFoods(data.foods);
      } else {
        setAllFoods([]);
        toast.error("No foods found");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load foods");
    }
  };

  // TAB CHANGE HANDLER
  useEffect(() => {
    if (activeTab === "users") fetchUsers();
    if (activeTab === "requests") fetchRequests();
    if (activeTab === "added-foods") fetchAllFoods();
  }, [activeTab, user]);

  // HANDLERS
  const handleDeleteFood = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`https://community-food-sharing-server-iota.vercel.app/foods/${id}?email=${user?.email}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.deletedCount > 0) {
        toast.success("Deleted successfully");
        if (activeTab === "requests") fetchRequests();
        if (activeTab === "added-foods") fetchAllFoods();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await fetch(`https://community-food-sharing-server-iota.vercel.app/foods/${id}/status?email=${user?.email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.modifiedCount > 0) {
        toast.success(`Request ${status === 'Approved' ? 'Approved' : 'Rejected'}`);
        fetchRequests();
        if (activeTab === "added-foods") fetchAllFoods();
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg max-w-2xl mx-auto text-center animate-fade-in">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="Admin"
              className="w-32 h-32 rounded-full mx-auto border-4 border-orange-500 mb-4 object-cover shadow-md"
            />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{user?.displayName}</h2>
            <p className="text-gray-500 dark:text-gray-300 font-medium mb-6">{user?.email}</p>
            <div className="badge badge-lg bg-red-500 text-white border-none px-4 py-3">Administrator</div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 bg-orange-50 dark:bg-orange-200 rounded-xl">
                <p className="text-2xl font-bold text-orange-600">Active</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">Status</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-200 rounded-xl">
                <p className="text-2xl font-bold text-blue-600">Full</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">Access Level</p>
              </div>
            </div>
          </div>
        );

      case "users":
        return (
          <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <FaUsers className="text-orange-500" /> All Users
            </h3>
            <table className="table w-full text-gray-800 dark:text-gray-100">
              <thead className="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-200">
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-slate-700 transition">
                    <th>{idx + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={u.photoURL || "https://via.placeholder.com/40"} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{u.displayName}</div>
                        </div>
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge ${u.role === 'admin' ? 'badge-error text-white' : 'badge-ghost'}`}>
                        {u.role || 'user'}
                      </span>
                    </td>
                    <td><span className="text-green-500 font-semibold">Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "requests":
        return (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <FaClipboardList className="text-orange-500" /> All Food Requests
            </h3>

            {requests.length === 0 ? <p className="text-gray-700 dark:text-gray-300">No requested foods found.</p> :
              <div className="overflow-x-auto">
                <table className="table w-full text-gray-800 dark:text-gray-100">
                  <thead className="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-200">
                    <tr>
                      <th>Food Name</th>
                      <th>Donator</th>
                      <th>Requested By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map(req => (
                      <tr key={req._id}>
                        <td>
                          <div className="flex items-center gap-2">
                            <img src={req.food_image} className="w-10 h-10 rounded-lg object-cover" />
                            <span className="font-semibold">{req.food_name}</span>
                          </div>
                        </td>
                        <td>{req.donator_name}<br /><span className="text-xs text-gray-400 dark:text-gray-300">{req.donator_email}</span></td>
                        <td>{req.requested_by_email}</td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleStatusUpdate(req._id, 'Approved')}
                              className="btn btn-sm btn-circle btn-success text-white"
                              title="Approve Request"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(req._id, 'Available')}
                              className="btn btn-sm btn-circle btn-error text-white"
                              title="Reject Request"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
          </div>
        );

      case "added-foods":
        return (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2 text-gray-800 dark:text-gray-100"><FaBox className="text-orange-500" /> Added Foods</h3>
              <div className="badge badge-lg badge-primary text-white">Total: {allFoods.length}</div>
            </div>

            {Array.isArray(allFoods) && allFoods.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table w-full text-gray-800 dark:text-gray-100">
                  <thead className="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-200">
                    <tr>
                      <th>#</th>
                      <th>Food Info</th>
                      <th>Donator Info</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allFoods.map((food, idx) => (
                      <tr key={food._id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                        <th>{idx + 1}</th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="w-12 h-12 rounded-lg">
                                <img src={food.food_image} alt="Food" />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{food.food_name}</div>
                              <div className="text-xs opacity-50">Qty: {food.food_quantity}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="font-semibold">{food.donator_name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-300">{food.donator_email}</div>
                        </td>
                        <td>
                          <span className={`badge ${food.food_status === 'Available' ? 'badge-success text-white' : 'badge-warning text-white'}`}>
                            {food.food_status}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDeleteFood(food._id)}
                            className="btn btn-sm btn-ghost text-red-500 tooltip"
                            data-tip="Delete"
                          >
                            <MdDeleteForever size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">No foods found.</p>
            )}
          </div>
        );

      case "add-food":
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100"></h3>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700">
              <AddFood />
            </div>
            <p className="text-center text-sm text-gray-400 dark:text-gray-300 mt-4"></p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col md:flex-row">
      {/* Sidebar / Mobile Topbar */}
      <aside className="bg-white dark:bg-slate-800 w-full md:w-64 flex-shrink-0 shadow-xl z-10">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            AdminPanel
          </h1>
        </div>

        <nav className="p-4 space-y-2">
          {[
            { key: "profile", icon: <FaUserShield />, label: "Profile" },
            { key: "users", icon: <FaUsers />, label: "All Users" },
            { key: "added-foods", icon: <FaBox />, label: "Added Foods" },
            { key: "requests", icon: <FaClipboardList />, label: "All Food Requests" },
            { key: "add-food", icon: <FaUtensils />, label: "Add Food" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition
                ${activeTab === tab.key
                  ? 'bg-gradient-to-r from-orange-400 to-pink-500 text-white cursor-default'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-500 hover:text-white'
                }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;


