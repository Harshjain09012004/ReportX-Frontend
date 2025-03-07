import { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import PropTypes from 'prop-types';

export const Faq = ({Ques,Ans}) => {
  const [visibility, setvisibility] = useState(false);

  return (
    <div className='flex flex-col gap-6 bg-gray-200 w-[55%] rounded-2xl border border-zinc-200 shadow-md shadow-gray-300 px-8 p-4 transition-all cursor-pointer' onClick={()=>{
        setvisibility(!visibility);
    }}>
        <div className='flex text-xl justify-between place-items-center h-[100%]'>
            <p className='font-medium'>{Ques}</p>
            {visibility ? <IoIosArrowUp/> : <IoIosArrowDown/>}
        </div>

        <div className={`text-lg transition-all ${visibility ? '' : 'hidden'}`}>
            <p>{Ans}</p>
        </div>
    </div>
  )
}

// PropTypes for Type Safety
Faq.propTypes = {
  Ques: PropTypes.string.isRequired,
  Ans: PropTypes.string.isRequired,
};