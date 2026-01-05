import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register = () => {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Handle Email/Password Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    const { displayName, photoURL, email, password } = e.target;

    toast.loading("Creating user...", { id: "register" });

    try {
      await register(email.value, password.value, displayName.value, photoURL.value);
      toast.success("User created successfully!", { id: "register" });
      navigate(from, { replace: true });
      e.target.reset();
    } catch (error) {
      toast.error(error.message || "Login failed", { id: "login" });
      console.error(error);


      // Handle specific Firebase errors
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please login.", { id: "register" });
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format.", { id: "register" });
      } else if (error.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters.", { id: "register" });
      } else {
        toast.error(error.message || "Registration failed", { id: "register" });
      }
    }
  };

  // Handle Google Registration/Login
  const handleGoogle = async () => {
    toast.loading("Signing in with Google...", { id: "google" });
    try {
      await loginWithGoogle();
      toast.success("Logged in successfully!", { id: "google" });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Google sign-in failed", { id: "google" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center  p-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl text-black font-bold text-center mb-6">Register</h1>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="displayName"
              placeholder="Name"
              className="input input-bordered w-full rounded-full"
              required
            />
            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL"
              className="input input-bordered w-full rounded-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full rounded-full"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full rounded-full"
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-red-600 text-white py-2 rounded-full font-semibold"
            >
              Register
            </button>
          </form>

          <div className="my-4 flex items-center justify-center">
            <span className="border-t border-gray-300 flex-grow mr-2"></span>
            <span className="text-gray-400">or</span>
            <span className="border-t border-gray-300 flex-grow ml-2"></span>
          </div>

          <button
            onClick={handleGoogle}
            className="w-full text-black flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2 hover:bg-gray-100 transition-all"
          >
            <FaGoogle className="text-red-500" />
            Register with Google
          </button>

          <p className="text-center text-black text-sm mt-6">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;


