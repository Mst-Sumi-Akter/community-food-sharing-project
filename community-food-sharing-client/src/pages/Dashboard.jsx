import React, { useState } from "react";
import { FaPlus, FaBox, FaHeart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import AddFood from "./AddFood";
import ManageMyFoods from "./ManageMyFoods";
import MyFoodRequests from "./MyFoodRequests";
import Profile from "./Profile";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuItems = [
    { id: "profile", label: "Profile", icon: <FaUser /> },
    { id: "addFood", label: "Add Food", icon: <FaPlus /> },
    { id: "manageFoods", label: "Manage My Foods", icon: <FaBox /> },
    { id: "myRequests", label: "My Requests", icon: <FaHeart /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "addFood":
        return <AddFood />;
      case "manageFoods":
        return <ManageMyFoods />;
      case "myRequests":
        return <MyFoodRequests />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-orange-500">Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
            Your PlateShare panel
          </p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-500 hover:text-white transition ${activeTab === item.id
                  ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white"
                  : ""
                }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </aside>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white shadow-md flex justify-between items-center px-4 py-3">
        <h2 className="text-xl font-bold text-orange-500">Dashboard</h2>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <aside className="md:hidden fixed top-16 left-0 w-64 h-full bg-white shadow-lg z-50 p-6 flex flex-col gap-4 overflow-auto transition-transform duration-300 rounded-r-3xl">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-500 hover:text-white transition ${activeTab === item.id
                  ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white"
                  : ""
                }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1  overflow-auto">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;    

