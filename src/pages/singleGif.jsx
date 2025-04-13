import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GifState } from "../context/Gif.context";
import {
  HiOutlineHeart,
  HiOutlineClipboardCopy,
  HiOutlineDownload,
  HiOutlinePlus,
} from "react-icons/hi";

const SingleGif = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { gf } = GifState();
  const [gif, setGif] = useState(null);
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false); // ✅ State to track favorite status

  useEffect(() => {
    const fetchGif = async () => {
      try {
        setLoading(true);
        setError(false);

        const { data } = await gf.gif(id);
        setGif(data);

        if (data.title) {
          const related = await gf.search(data.title, { limit: 8 });
          setRelatedGifs(related.data);
        }

        // ✅ Check if GIF is in favorites
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorited(storedFavorites.some((fav) => fav.id === data.id));

      } catch (error) {
        console.error("Error fetching GIF:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGif();
  }, [id, gf]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-gray-400 text-xl animate-pulse">Loading GIF...</p>
      </div>
    );
  }

  if (error || !gif) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-red-500 text-xl">Failed to load GIF. Please try again.</p>
      </div>
    );
  }

  // ✅ Handle Favorite Button Click
  const handleFavorite = () => {
    let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = storedFavorites.some((fav) => fav.id === gif.id);

    if (isAlreadyFavorite) {
      storedFavorites = storedFavorites.filter((fav) => fav.id !== gif.id);
    } else {
      storedFavorites.push(gif);
    }

    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    setIsFavorited(!isAlreadyFavorite);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(gif.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = gif.images.original.url;
    link.download = `${gif.title}.gif`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Main GIF Section */}
      <div className="flex flex-col items-center text-center p-6">
        <h1 className="text-2xl font-bold mb-2">{gif.title || "Untitled GIF"}</h1>
        <img
          src={gif.images.original.url}
          alt={gif.title}
          className="max-h-[70vh] rounded-lg shadow-lg"
        />
        <p className="mt-4 text-gray-400">
          {gif.user?.display_name ? `Uploaded by: ${gif.user.display_name}` : "Source: Unknown"}
        </p>
      </div>

      {/* Related GIFs Section */}
      <div className="px-6 pb-6">
        <h2 className="text-xl font-semibold mb-3">Related GIFs</h2>
        {relatedGifs.length > 0 ? (
          <div className="flex overflow-x-auto gap-4 scrollbar-hide">
            {relatedGifs.map((relatedGif) => (
              <div
                key={relatedGif.id}
                className="cursor-pointer hover:scale-105 transition transform duration-200"
                onClick={() => navigate(`/gif/${relatedGif.id}`)}
              >
                <img
                  src={relatedGif.images.fixed_height.url}
                  alt={relatedGif.title}
                  className="w-40 h-40 rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No related GIFs found.</p>
        )}
      </div>

      {/* Action Panel */}
      <div className="flex justify-between p-6 bg-gray-800 border-t border-gray-700">
        <button onClick={handleFavorite} className="flex items-center gap-2 transition">
          <HiOutlineHeart size={24} className={isFavorited ? "text-red-500" : "text-gray-300"} />
          Favorite
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <HiOutlineClipboardCopy size={24} />
          {copied ? "Copied!" : "Copy Link"}
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <HiOutlineDownload size={24} />
          Download
        </button>

        <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
          <HiOutlinePlus size={24} />
          Add to Collection
        </button>
      </div>
    </div>
  );
};

export default SingleGif;
