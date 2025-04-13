import React, { useEffect, useState } from "react";
import { useParams ,Link} from "react-router-dom";
import { GifState } from "../context/Gif_context";

const Category = () => {
  const [categoryGifs, setCategoryGifs] = useState([]);
  const { gf } = GifState();
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchCategoryGifs = async () => {
      try {
        const { data } = await gf.search(categoryName, {
          sort: "relevant",
          lang: "en",
          type: "gifs",
          limit: 20,
        });
        setCategoryGifs(data);
      } catch (error) {
        console.error("Error fetching category GIFs:", error);
      }
    };

    fetchCategoryGifs();
  }, [categoryName, gf]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">{categoryName} GIFS</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categoryGifs.length > 0 ? (
          categoryGifs.map((gif) => (
            <Link to={`/gif/${gif.id}`} key={gif.id} className="block">
            <img
              key={gif.id}
              src={gif.images.fixed_height.url}
              alt={gif.title}
              className="w-full rounded-lg shadow-md hover:scale-105 transition-transform"
            />
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No GIFs found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
