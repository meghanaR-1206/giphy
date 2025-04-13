import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import { GifState } from "../context/gif.context";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { gf, filter } = GifState();
  const { query } = useParams(); // Extract query from URL params

  const fetchSearchResults = async () => {
    if (!query) return; // Prevent fetching if query is undefined

    try {
      const { data } = await gf.search(query, {
        sort: "relevant",
        lang: "en",
        type: filter,
        limit: 20,
      });
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [query, filter]); // Re-run when query or filter changes

  return (
    <div>
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-6">
        {searchResults.map((gif) => (
          <Link to={`/gif/${gif.id}`} key={gif.id} className="block">
          <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} className="w-full" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
