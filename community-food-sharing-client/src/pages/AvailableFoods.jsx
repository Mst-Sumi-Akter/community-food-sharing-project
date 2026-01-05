import React, { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";
import Spinner from "../components/Spinner";

const AvailableFoods = () => {
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
        const res = await fetch(
          `https://community-food-sharing-server-iota.vercel.app/foods/status/Available${query}`
        );
        if (!res.ok) throw new Error("Failed to fetch available foods");
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

  /* Industry Standard Page Number Logic */
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
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#ff8a0c] to-[#07a0e3] py-20 px-4 text-center text-white overflow-hidden ">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-6 drop-shadow-md">
            Available Foods
          </h1>
          <p className="text-xl opacity-90 mb-10 font-light">
            Discover community-shared meals waiting for you — fresh, homemade, and shared with love.
          </p>

          <div className="w-full max-w-2xl mx-auto flex flex-col md:flex-row gap-4 items-center  dark:bg-slate-900">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search food by name..."
                className="w-full py-4 pl-12 pr-12 text-gray-800 dark:text-white bg-white dark:bg-slate-800 rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-300/50 transition-all font-medium text-lg placeholder-gray-400 dark:placeholder-gray-500 dark:border-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              </div>
            

            <select
              className="select select-bordered w-full md:w-auto rounded-full h-[60px] shadow-2xl text-gray-800 dark:text-white bg-white dark:bg-slate-800 border-none font-medium focus:outline-none focus:ring-4 focus:ring-orange-300/50"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort by Default</option>
              <option value="expire_asc">Expiry: Soonest First</option>
              <option value="expire_desc">Expiry: Latest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Food Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
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

            {/* Industry Standard Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-14">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={`px-4 py-2 rounded-full border text-sm font-medium
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
                      className={`w-10 h-10 rounded-full text-sm font-semibold
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
                    onClick={() =>
                      setPage((p) => Math.min(totalPages, p + 1))
                    }
                    className={`px-4 py-2 rounded-full border text-sm font-medium
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

export default AvailableFoods;


