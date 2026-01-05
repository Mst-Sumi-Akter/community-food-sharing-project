import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import logo from "../assets/1logo.png";

// Corrected Icons
import { GoHome } from "react-icons/go";
import { IoFastFoodOutline, IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { ImBoxAdd } from "react-icons/im";
import { FaRegUser } from "react-icons/fa6";
import { LuHeartHandshake } from "react-icons/lu";
import { MdAdminPanelSettings } from "react-icons/md";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isAdmin] = useAdmin(); // check admin status
  /* Theme State */
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const AdminLink = () => {
    if (!isAdmin) return null;
    return (
      <li>
        <Link
          to="/admin-dashboard"
          className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-500 font-semibold"
          onClick={() => setMenuOpen(false)}
        >
          <MdAdminPanelSettings /> Admin Panel
        </Link>
      </li>
    )
  };

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
      setMenuOpen(false);
    } catch (err) {
      console.error(err);
      alert("Logout failed!");
    }
  };

  const activeClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-2 text-white bg-gradient-to-r from-orange-500 to-pink-500 px-3 py-2 rounded-md"
      : "flex items-center gap-2 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 px-3 py-2 rounded-md transition";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-4 md:px-8 py-3 rounded-4xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-orange-500"
        >
          <img src={logo} alt="PlateShare Logo" className="h-12 w-auto" />
          PlateShare
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={activeClass}>
            <GoHome /> Home
          </NavLink>

          <NavLink to="/available-foods" className={activeClass}>
            <IoFastFoodOutline /> Available Foods
          </NavLink>

          <NavLink to="/all-foods" className={activeClass}>
            <IoFastFoodOutline /> All Foods
          </NavLink>

          <NavLink to="/about-us" className={activeClass}>
            <FaRegUser /> About Us
          </NavLink>

          <NavLink to="/contact-us" className={activeClass}>
            <LuHeartHandshake /> Contact Us
          </NavLink>

          {/* {user && (
            <>
              <NavLink to="/add-food" className={activeClass}>
                <ImBoxAdd /> Add Food
              </NavLink>

              <NavLink to="/manage-foods" className={activeClass}>
                <FaRegUser /> Manage My Foods
              </NavLink>

              <NavLink to="/my-requests" className={activeClass}>
                <LuHeartHandshake /> My Requests
              </NavLink>
            </>
          )} */}
        </ul>

        {/* User / Auth / Theme Toggle */}
        <div className="flex items-center gap-3 relative">

          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            {theme === "light" ? (
              <svg className="w-6 h-6 text-orange-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,4.93l.71.71A1,1,0,0,0,5.64,7.05Zm12,1.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,17.64,5.64l.71.71A1,1,0,0,0,17.64,8.1ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
            ) : (
              <svg className="w-6 h-6 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
            )}
          </button>

          {user ? (
            <div>
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="User"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-orange-400"
                onClick={() => setMenuOpen(!menuOpen)}
              />

              {menuOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 z-50">
                  <li className="px-4 py-2 text-gray-800 font-bold">{user.displayName}</li>
                  <li className="px-4 py-2 text-gray-600 dark:text-gray-300 text-sm">{user.email}</li>

                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaRegUser /> Profile
                    </Link>
                  </li>

                  {!isAdmin && (
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                        onClick={() => setMenuOpen(false)}
                      >
                        <LuHeartHandshake /> Dashboard
                      </Link>
                    </li>
                  )}

                  {/* Admin Dashboard Link in Dropdown */}
                  {user && (
                    <AdminLink />
                  )}

                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 font-semibold flex items-center gap-2"
                    >
                      <IoLogOutOutline /> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold flex items-center gap-2"
              >
                <IoLogInOutline /> Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


