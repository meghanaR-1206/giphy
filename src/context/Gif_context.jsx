import { createContext, useContext, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
 
const GifContext = createContext();

const GifProvider = ({ children }) => {
    const apiKey = import.meta.env.VITE_GIPHY_KEY;

    if (!apiKey) {
        console.error("GIPHY API key is missing. Make sure VITE_GIPHY_KEY is set in your .env file.");
        return null; // Prevents rendering if API key is missing
    }
    const [gifs,setGifs]=useState([]);
    const [filter,setFilter]=useState(["gifs"]);
    const [favorites,setFavorites]=useState([]);

    const gf = new GiphyFetch(apiKey);

    return( <GifContext.Provider 
    value={{ gf,gifs,setGifs,filter,setFilter,favorites }}>{children}
    </GifContext.Provider>);
};
export const GifState=()=>{
    return useContext(GifContext)
}

export { GifContext };
export default GifProvider;
