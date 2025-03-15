import { useContext, useState } from 'react'
import { HiOutlineMenu } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { usercontext } from './UserContext';
import { Link } from 'react-router-dom';

export const Menu = () => {
  const {user,ready,isAdmin} = useContext(usercontext);
  const [pressedmenu, setpressedmenu] = useState(false);
  const [menuclass, setmenuclass] = useState('hidden');

  function menu(){
    setpressedmenu(!pressedmenu);
    if(menuclass) setmenuclass('');
    else setmenuclass('hidden')
  }

  return (
    <div>
        <div className={`absolute bg-zinc-200 top-[60px] w-44 max-h-40 text-md rounded-2xl transition-all z-20 shadow-md shadow-zinc-400 ${menuclass}`} onMouseLeave={menu}>
        
            {!user && (
                <div className='flex flex-col gap-2 mt-4 mb-4'>
                    <Link className='text-center p-1 hover:bg-slate-400 transition-colors' to={'/login'}>Login Easily</Link>
                    <Link className='text-center p-1 hover:bg-slate-400 transition-colors'  to={'/register'}>Register Now</Link>
                </div>
            )}
            
            {(ready && user && !isAdmin) && (
                <div className='flex flex-col gap-2 mt-4 mb-4'>
                    <Link className='text-center p-1 hover:bg-slate-400 transition-colors' to={'/account/profile'}>Your Profile</Link>
                    <Link className='text-center p-1 hover:bg-slate-400 transition-colors'  to={'/account/complaints'}>Your Complaints</Link>
                    <Link className='text-center 
                    p-1 hover:bg-slate-400 transition-colors'  to={'/account/register'}>Register Complaint</Link>
                </div>
            )}
            
            {(ready && isAdmin) && (
                <div className='flex flex-col gap-2 mt-4 mb-4'>
                    <Link className='text-center p-1 hover:bg-slate-400 transition-colors' to={'/account'}>Your Profile</Link>
                    <Link className='text-center p-1 hover:bg-slate-400 transition-colors'  to={'/admin'}>Admin Page</Link>
                    <Link className='text-center 
                    p-1 hover:bg-slate-400 transition-colors'  to={'/insights'}>Data Insights</Link>
                </div>
            )}

        </div>

        {!pressedmenu && <HiOutlineMenu className='text-2xl transition-all hover:scale-110 cursor-pointer' onClick={menu}/>}

        {pressedmenu && <RxCross1 className='text-2xl transition-all hover:scale-110 cursor-pointer' onClick={menu}/>}
    </div>
  )
}
