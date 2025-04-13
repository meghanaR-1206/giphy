import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GifState } from '../context/Gif.context';
import Gif from '../components/gif';
import FilterGif from '../components/filter';

const Home = () => {
    const { gf } = GifState();
    const [gifs, setGifs] = useState([]);

    useEffect(() => {
        const fetchTrendingGifs = async () => {
            try {
                const { data } = await gf.trending({ limit: 20, rating: 'g' });
                setGifs(data);
            } catch (error) {
                console.error('Error fetching trending GIFs:', error);
            }
        };
        fetchTrendingGifs();
    }, [gf]);
    

    return (
      <div>
        <img src="https://media.giphy.com/headers/2025-02-19-49-1739998199/headers2023-01-25-23-1674674626BHM_BANNER_HP_2023.webp" alt="earth_banner" className="mt-2 rounded w-full" />
        <FilterGif showTrending={true}/>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-6">
            {gifs.map((gif) => (
                <Link to={`/gif/${gif.id}`} key={gif.id} className="block">

                    <Gif key={gif.id} gif={gif} /> 
                </Link>
            ))}
        </div>
      </div>
    );
};

export default Home;
