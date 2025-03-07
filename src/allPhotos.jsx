import { useState } from 'react'
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

const url = import.meta.env.VITE_SERVER;

export const AllPhotos = (det) => {
  const [index, setindex] = useState(0);
  return (
    <div className='Image fixed top-0 left-0 z-30 w-screen h-screen bg-black flex justify-center place-items-center transition-all'>
        <img src={`${url}/uploads/${det.photos[index]}`} className='relative rounded-2xl h-[70%] w-[50%] object-cover cursor-pointer' onClick={()=>{det.setbiggerImage(true)}}/>

        <div className='absolute flex top-1/2 w-[100%] justify-between text-6xl text-white px-20 '>
            <IoIosArrowDropleft className='active:scale-110 transition-all' onClick={()=>{
            setindex((index-1+(det.photos.length))%det.photos.length);}}/>

            <IoIosArrowDropright className='active:scale-110 transition-all' onClick={()=>{
            setindex((index+1)%(det.photos.length));}}/>
        </div>

        <RxCross1 className='absolute text-white text-4xl top-8 right-12 active:scale-110' onClick={()=>{det.setbiggerImage(false)}}/>

        <div className='absolute top-8 left-10 text-white text-xl border border-white p-2 rounded-xl'>Image {index+1}</div>
    </div>
  )
}
