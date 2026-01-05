import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// All videos are now MP4 and stored locally in public/videos/
const videos = [
  "/videos/food1.mp4",
  "/videos/food3.mp4",
  "/videos/food2.mp4",
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Auto-play the carousel every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrent((current - 1 + videos.length) % videos.length);
  const nextSlide = () => setCurrent((current + 1) % videos.length);

  return (
    <div className="relative w-full mt-10">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-2xl shadow-2xl">
        {/* Video Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {videos.map((src, i) => (
            <div key={i} className="w-full shrink-0 relative">
              <video
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[60vh] md:h-[70vh] object-cover brightness-75"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Hero Text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            Welcome to PlateShare 🍽️
          </h1>
          <p className="mt-4 text-white/90 text-sm md:text-base max-w-xl">
            Share your surplus food with the community — connect, reduce waste,
            and make a difference together.
          </p>
          <Link
            to="/available-foods"
            className="mt-6 px-6 py-3 bg-gradient-to-r from-[#ff8a0c] via-[#ff9e2b] to-[#07a0e3] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View Available Foods
          </Link>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                current === i ? "bg-white w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;


