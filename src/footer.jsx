import {Link} from 'react-router-dom';
import { TfiWorld } from "react-icons/tfi";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { GrMail } from "react-icons/gr";


const Footer = () => {
  return (
    <div className='Footer flex justify-between px-[5%] py-[20px] border-y-[1px] border-zinc-300 bg-zinc-100'>

        <p>© 2024 Central Crime Bureau</p>

        <div className='right flex gap-7 place-items-center'>
            
            <div className='country flex place-items-center gap-2 text-sm font-semibold'>
                <TfiWorld className="text-zinc-900"/>
                <p className='text-zinc-600'>English</p>
            </div>

            <div className='socialmedia flex gap-3 text-xl place-items-center'>
                <Link to={"#"}><FaFacebookSquare/></Link>
                <Link to={"#"}><FaSquareInstagram/></Link>
                <Link to={"#"}><FaSquareTwitter/></Link>
                <Link to={'mailto:CrimePortal2024@mail.com'}><GrMail className='text-[22px]'/></Link>
            </div>

        </div>

    </div>
  )
}

export default Footer