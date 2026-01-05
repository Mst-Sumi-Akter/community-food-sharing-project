import { Link } from "react-router-dom";

const FoodCard = ({ food }) => {
  const {
    _id,
    food_name,
    food_image,
    additional_notes,
    donator_name,
    donator_image,
    food_status,
  } = food;

  return (
    <div className="card bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-[20px] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
      {/* Food Image - Increased Height */}
      <figure className="h-48 overflow-hidden relative">
        <img
          src={food_image}
          alt={food_name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Status Badge Overlay */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm backdrop-blur-md bg-white/90 ${food_status === "Available"
              ? "text-green-600"
              : food_status === "Approved" // "Approved" effectively means Not Available anymore
                ? "text-red-500"
                : "text-orange-500"
              }`}
          >
            {food_status === "Approved" ? "Not Available" : food_status}
          </span>
        </div>
      </figure>

      {/* Card Body - Compacted */}
      <div className="p-3 flex flex-col justify-between h-full">

        <div>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1 truncate" title={food_name}>{food_name}</h2>

          <div className="flex items-center gap-2 mb-2">
            <img
              src={donator_image || "https://i.ibb.co/5GzXkwq/user.png"}
              alt={donator_name}
              className="w-5 h-5 rounded-full object-cover ring-2 ring-gray-100 dark:ring-slate-600"
            />
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">By {donator_name}</span>
          </div>

          <p className="text-[11px] text-gray-600 dark:text-gray-300 line-clamp-2 mb-3 leading-relaxed bg-gray-50 dark:bg-slate-700/50 p-1.5 rounded-lg border border-gray-100 dark:border-slate-700 italic">
            "{additional_notes}"
          </p>

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-500/10 p-1 rounded-lg">
              <div className="p-0.5 bg-white dark:bg-slate-700 rounded-md text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 dark:text-gray-400 uppercase font-bold">Qty</p>
                <p className="text-[10px] font-semibold text-gray-700 dark:text-gray-200">{food.food_quantity || '1'}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-500/10 p-1 rounded-lg">
              <div className="p-0.5 bg-white dark:bg-slate-700 rounded-md text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 dark:text-gray-400 uppercase font-bold">Exp</p>
                <p className="text-[10px] font-semibold text-gray-700 dark:text-gray-200">{food.expire_date || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>


        <div className="pt-2 border-t border-gray-100 dark:border-slate-700">
          <Link
            to={`/food/${_id}`}
            className="group relative flex justify-center items-center w-full py-2 px-4 text-white text-xs font-bold uppercase tracking-wider rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-orange-300 bg-gradient-to-r from-[#ff8a0c] via-[#ff9e2b] to-[#07a0e3]"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Details
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;


