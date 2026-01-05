import React from "react";
import { LuHeartHandshake } from "react-icons/lu";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaRegSmileBeam } from "react-icons/fa";
import { HiOutlineUsers, HiOutlineGlobeAlt } from "react-icons/hi2";
import { MdOutlineFoodBank } from "react-icons/md";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen py-12 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            About <span className="text-orange-500">PlateShare</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            PlateShare is a community-driven food sharing platform where people
            can share extra food with those who need it the most.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <IoFastFoodOutline className="text-4xl text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl text-gray-700 font-semibold mb-2">Reduce Food Waste</h3>
            <p className="text-gray-600 text-sm">
              We help minimize food waste by connecting food donors with people
              who can use it.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <LuHeartHandshake className="text-4xl text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl text-gray-700 font-semibold mb-2">Help Communities</h3>
            <p className="text-gray-600 text-sm">
              Our mission is to support local communities and spread kindness
              through sharing.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <FaRegSmileBeam className="text-4xl text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl text-gray-700 font-semibold mb-2">Make People Smile</h3>
            <p className="text-gray-600 text-sm">
              A small act of sharing food can bring a big smile to someone’s
              life.
            </p>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <MdOutlineFoodBank className="text-3xl text-orange-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">1,200+</h3>
            <p className="text-gray-600 text-sm">Meals Shared</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <HiOutlineUsers className="text-3xl text-pink-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">600+</h3>
            <p className="text-gray-600 text-sm">Happy Users</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <LuHeartHandshake className="text-3xl text-orange-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">350+</h3>
            <p className="text-gray-600 text-sm">Successful Requests</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <HiOutlineGlobeAlt className="text-3xl text-pink-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">15+</h3>
            <p className="text-gray-600 text-sm">Cities Covered</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            How PlateShare Works
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <h3 className="font-semibold text-gray-700 text-lg mb-2">1. Share Food</h3>
              <p className="text-gray-600 text-sm">
                List extra food with details like quantity, location, and
                pickup time.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <h3 className="font-semibold text-gray-700 text-lg mb-2">2. Request Food</h3>
              <p className="text-gray-600 text-sm">
                People nearby can request food easily through the platform.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <h3 className="font-semibold text-gray-700 text-lg mb-2">3. Make an Impact</h3>
              <p className="text-gray-600 text-sm">
                Food reaches those who need it, reducing waste and hunger.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            PlateShare was created with a simple idea — no food should go to
            waste while people go hungry. Many households, restaurants, and
            events often have surplus food that can be shared safely.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Through PlateShare, donors can easily list available food, and
            recipients can request it with dignity and ease. Together, we are
            building a kinder and more sustainable future.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl p-10">
          <h2 className="text-3xl font-bold mb-4">
            Join PlateShare Today
          </h2>
          <p className="max-w-xl mx-auto mb-6 text-sm">
            Be a part of the movement to reduce food waste and help communities
            grow stronger together.
          </p>
          <button className="bg-white text-orange-500 font-semibold px-6 py-3 rounded-full hover:scale-105 transition">
            Get Started
          </button>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;


