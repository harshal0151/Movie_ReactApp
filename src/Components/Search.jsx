import { useState } from "react";
import { useNavigate } from "react-router-dom";




function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
  
    function handleSubmit(e) {
      e.preventDefault();
      navigate("/search/" + searchTerm);
    }

  return (
    <>
      <section className="w-full h-screen flex flex-col justify-center items-center text-center gap-7 bg-gray-100">
        <h1 className="text-5xl font-bold text-gray-800">Welcome.</h1>
        <p className="text-lg text-gray-600 max-w-lg">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
          exercitationem nisi necessitatibus totam vero dolore nihil quas ipsum!
          Labore, totam.
        </p>
        <form action=""
        onSubmit={handleSubmit}
         className="flex items-center gap-3">
          <input
            className="bg-gray-600 text-slate-100 px-12 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition duration-300"
        
          >
            Search
          </button>
        </form>
      </section>
    </>
  );
}

export default Search;
