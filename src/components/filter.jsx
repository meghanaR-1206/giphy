import React from 'react'
import { GifState } from '../context/gif.context'
import { HiMiniArrowTrendingUp } from 'react-icons/hi2';

const filters=[
    {
        title:"GIFs",
        value:"gifs",
        background:"bg-gradient-to-tr from purple-500 via purple-600 to-purple-500",
    },

    {
        title:"Stickers",
        value:"stickes",
        background:"bg-gradient-to-tr from teal-500 via teal-600 to-teal-500",
    },

    {
        title:"Text",
        value:"text",
        background:"bg-gradient-to-tr from blue-500 via blue-600 to-blue-500",
    },
]
const FilterGif = ({alignLeft=false,showTrending=flase}) => {

    const {filter,setFilter}=GifState();
  return (
    <div className={`flex gap-3 my-3 align-middle justify-center ${alignLeft?"":"justify-end"} ${showTrending?"justify-between flex-col sm:flex-row sm:flex-items-center":""}`}>
        {showTrending &&(
            <span className="rounded-full  bg-gray-700 flex gap-2 align-middle justify-center py-2 px-3">
                <HiMiniArrowTrendingUp size={25} className='text-teal-400'/>
                <span className="font-semibold">Trending</span>
            </span>
        )}
        <div className="w-80 flex rounded-full bg-gray-800">
           
                
            {filters.map((f)=>{
                
                return (<spam 
                    onClick={()=>setFilter(f.value)}
                    className={` ${ filter==f.value?f.background:""} flex-col gap-4 font-semibold py-2 w-1/3 text-center rounded-full cursor-pointer`}>
                    {f.title}
                    </spam>
                )


            })}
            
            
        </div>
        

    </div>
  )
}

export default FilterGif