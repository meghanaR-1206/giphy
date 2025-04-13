import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiEllipsisVertical, HiMiniBars3BottomRight, HiOutlineHeart } from 'react-icons/hi2';
import '../App.css';
import { GifState } from '../context/Gif.context';
import Gif_search from './Gif_search';

const Header = () => {
    const [showCategories, setShowCategories] = useState(false);
    const [categories, setCategories] = useState([]);
    const { gf } = GifState();
    const [favorites, setFavorites] = useState([]);

    // Fetch gif categories
    useEffect(() => {
        const fetchGifCategories = async () => {
            try {
                const { data } = await gf.categories();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchGifCategories();
    }, [gf]);

    // Get favorites from localStorage
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    return (
        <nav className="relative">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-900 text-white">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2">
                    <img 
                        src="https://tse3.mm.bing.net/th?id=OIP.oE-2zR_aKEUmyPRVT8soCQAAAA&pid=Api&P=0&h=220" 
                        className="w-12" 
                        alt="Giphy Logo" 
                    />
                    <h1 className="text-4xl font-bold tracking-tight cursor-pointer">GIPHY</h1>
                </Link>

                {/* Navigation Links (Visible on Large Screens) */}
                <div className="hidden lg:flex items-center gap-4 font-bold text-md">
                    {categories.slice(0, 5)?.map((category) => (
                        <Link 
                            key={category.name}
                            to={`/category/${category.name_encoded}`}
                            className="px-4 py-1 hover:gradient border-b-4 hover:gradient"
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu & Favorites */}
                <div className="flex items-center gap-4">
                    {/* Favorites Button (Only shown if favorites exist) */}
                    {favorites.length > 0 && (
                        <Link to="/Favorites" className="relative flex items-center">
                            <HiOutlineHeart size={30} className="text-sky-400 hover:text-red-500 transition" />
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                {favorites.length}
                            </span>
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setShowCategories(!showCategories)}>
                        <HiEllipsisVertical 
                            size={30} 
                            className={`py-0.5 hover:gradient ${showCategories ? 'border-b-4 gradient' : ''}`} 
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu for Categories */}
            {showCategories && (
                <div className="absolute right-0 top-20 px-10 pt-6 pb-9 w-full bg-gray-800 rounded shadow-md gradient z-20">
                    <span className="text-lg font-bold">Categories</span>
                    <hr className="my-2 border-gray-500" />
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 rounded-lg shadow-md">
                        {categories.map((category) => (
                            <Link key={category.name}  
                                to={`/category/${category.name_encoded}`}  
                                className="block py-1 hover:gradient"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Search Component */}
            <Gif_search />
        </nav>
    );
}

export default Header;
