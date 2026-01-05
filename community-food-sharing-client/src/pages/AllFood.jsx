import React, { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";
import Spinner from "../components/Spinner";

const AllFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* Pagination States */
  const [search, setSearch] = useState("");
  const [querySearch, setQuerySearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  const handleSearch = () => {
    setQuerySearch(search);
    setPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const query = `?search=${querySearch}&page=${page}&limit=${limit}&sort=${sort}`;
        const res = await fetch(`https://community-food-sharing-server-iota.vercel.app/foods${query}`);
        if (!res.ok) throw new Error("Failed to fetch foods");
        const data = await res.json();

        if (data.foods) {
          setFoods(data.foods);
          setTotalPages(Math.ceil(data.total / limit));
        } else {
          setFoods([]);
          setTotalPages(1);
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [querySearch, page, sort]);

  /* Industry standard page numbers */
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section (Same as AvailableFoods) */}
      <div className="relative bg-gradient-to-r from-[#ff8a0c] to-[#07a0e3] py-20 px-4 sm:px-6 lg:px-8 text-center text-white overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 drop-shadow-md">
            All Community Foods
          </h1>
          <p className="text-xl opacity-90 mb-10 font-light">
            Explore all shared meals from our community — cooked with care and shared with kindness.
          </p>

          {/* Search + Sort */}
          <div className="relative w-full max-w-2xl mx-auto flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search food by name..."
                className="w-full py-4 pl-12 pr-12 text-gray-800 bg-white rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-300/50 transition-all font-medium text-lg placeholder-gray-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <button
                onClick={handleSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg> */}
            </div>

            <select
              className="select select-bordered w-full md:w-auto rounded-full h-[60px] shadow-2xl text-gray-800 bg-white border-none font-medium focus:outline-none focus:ring-4 focus:ring-orange-300/50"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort by Default</option>
              <option value="expire_asc">Expiry: Soonest First</option>
              <option value="expire_desc">Expiry: Latest First</option>
            </select>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        {foods.length === 0 ? (
          <p className="text-center text-gray-500">
            No foods available at the moment.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {foods.map((food) => (
                <FoodCard key={food._id} food={food} />
              ))}
            </div>

            {/* Pagination (Same as AvailableFoods) */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-14">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition
                      ${
                        page === 1
                          ? "border-gray-300 text-gray-400 cursor-not-allowed"
                          : "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                      }`}
                  >
                    Prev
                  </button>

                  {getPageNumbers().map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-full text-sm font-semibold transition
                        ${
                          page === p
                            ? "bg-orange-500 text-white shadow-md"
                            : "border border-gray-300 text-gray-700 hover:bg-orange-100"
                        }`}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition
                      ${
                        page === totalPages
                          ? "border-gray-300 text-gray-400 cursor-not-allowed"
                          : "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                      }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllFood;


