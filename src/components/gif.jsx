// import React from 'react'
// import GifProvider from '../context/gif.context'
// import { Link } from 'react-router-dom'
// const Gif = ({gif,hover=true}) => {
//   return (
//     <Link to={`${gif.type}/${gif.slug}`}>
//     <div key={gif.id} className="p-2 bg-gray-800 rounded-lg shadow-lg">
//                     <img 
//                         src={gif.images.fixed_height.url} 
//                         alt={gif.title} 
//                         className="w-full  rounded-lg"
//                     />
//     </div>
//     </Link>
//   )
// }

// export default Gif
import React from 'react';
import { Link } from 'react-router-dom';

const Gif = ({ gif, hover = true }) => {

    if (!gif) {
        return <div className="p-2 text-gray-400">Loading GIF...</div>;
    }

  return (
    <Link to={`${gif.type}/${gif.slug}`}>
        
      <div 
        className={`p-2 bg-gray-800 rounded-lg shadow-lg transition-transform cursor-pointer ${
          hover ? 'hover:scale-105 hover:shadow-xl' : ''
        }`}
      >
        <img 
          src={gif.images.fixed_height.url} 
          alt={gif.title} 
          className="w-full rounded object-cover transition-all duration-300 "
        />
      </div>
    </Link>
  );
};

export default Gif;
