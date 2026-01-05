import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = e.target;

    toast.loading("Logging in...", { id: "login" });

    try {
      await login(email.value, password.value);
      toast.success("Logged in successfully!", { id: "login" });
      navigate(from, { replace: true });
      e.target.reset();
    } catch (error) {
      toast.error(error.message || "Login failed", { id: "login" });
      console.error(error);
    }
  };

  const handleGoogle = async () => {
    toast.loading("Signing in with Google...", { id: "google" });
    try {
      await loginWithGoogle();
      toast.success("Logged in successfully!", { id: "google" });
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Google sign-in failed", { id: "google" });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center  p-10">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl text-black font-bold text-center mb-6">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" name="email" placeholder="Email" className="input input-bordered w-full rounded-full" required />
            <input type="password" name="password" placeholder="Password" className="input input-bordered w-full rounded-full" required />
            <button type="submit" className="w-full bg-gradient-to-r from-[#ff8a0c] via-[#ff9e2b] to-[#07a0e3] text-white py-2 rounded-full font-semibold">Login</button>
          </form>

          <div className="my-4 flex items-center justify-center">
            <span className="border-t border-gray-300 flex-grow mr-2"></span>
            <span className="text-gray-400">or</span>
            <span className="border-t border-gray-300 flex-grow ml-2"></span>
          </div>

          <button onClick={handleGoogle} className="w-full flex text-black items-center justify-center gap-2 border border-gray-300 rounded-full py-2 hover:bg-gray-100 transition-all">
            <FaGoogle className="text-red-500" /> Login with Google
          </button>

          <p className="text-center text-black text-sm mt-6">
            New to our platform? <Link to="/auth/register" state={{ from: location.state?.from }} className="text-blue-500 hover:underline">Register</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;


