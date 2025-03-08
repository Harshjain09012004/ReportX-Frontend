import { useContext } from 'react'
import { MdAccountCircle } from "react-icons/md";
import { Link } from 'react-router-dom';
import {usercontext} from './UserContext'
import { Menu } from './menu';

const url = import.meta.env.VITE_SERVER;

const Header = () => {
  const {user,dp,isAdmin} = useContext(usercontext);
  return (
    <>
        <div className=' bg-white h-20 w-full flex  place-items-center px-[6%] justify-between shadow-md'>
            <Link to={'/'}>
                <img src='banner.png' className='w-56 h-40'/>
            </Link>
            
            <div className='flex place-items-center gap-6 '>

                <Link to={user ? (isAdmin ? '/account' : '/account/register'): '/login'} className='w-36 h-12 text-center bg-black text-white p-2 border text-lg rounded-full hover:scale-110 transition-all'>Be Fearless</Link>

                <div className='relative flex place-items-center min-w-32 justify-evenly gap-6  rounded-full p-2 shadow-md shadow-slate-400 bg-white'>

                    <Menu/>
                    <Link className='flex place-items-center gap-2' to={user?'/account':'/login'}>
                        {dp && <img src={`${url}/uploads/${dp}`} className='h-[32px] w-[32px] rounded-full object-cover'/>}
                        {!dp && <MdAccountCircle className='text-3xl'/>}
                        <h1>{user}</h1>
                    </Link>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default Header