import React, { useState, useEffect } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Retrieve favorite GIFs from local storage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((gif) => gif.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Favorite GIFs</h2>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <img
            src="https://media3.giphy.com/media/jkZtSdwKOx05BOlapR/giphy.gif"
            alt="No favorites"
            className="w-40 h-40 mb-4"
          />
          <p className="text-gray-400 text-lg">No favorites yet. Go add some!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((gif) => (
            <div key={gif.id} className="relative group">
              <img
                src={gif.images.fixed_height.url}
                alt={gif.title}
                className="rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105"
              />
              <button
                onClick={() => removeFavorite(gif.id)}
                className="absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white p-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-200"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
