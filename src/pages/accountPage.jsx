import { useContext, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
import { GrUserPolice } from "react-icons/gr";
import { LuUser2 } from "react-icons/lu";
import { BiPaste } from "react-icons/bi";
import { usercontext } from '../UserContext';
import { Registercomplaints } from './registerComplaints';
import UserComplaints from './usercomplaints';
import ProfilePage from './profilePage';
import Footer from '../footer';
import Subfooter from '../subfooter';

 const AccountPage = () => {
  const {user,ready,isAdmin} = useContext(usercontext);
  const [redirect, setredirect] = useState(null)
  const {subpage} = useParams();

  function linkclass(type=null){
    let classes = 'py-2 px-5 flex gap-4 items-center rounded-3xl';
    if(type === subpage) classes +=' bg-red-500  text-white';
    else classes+=' bg-gray-300'
    return classes;
  }

  if(ready && !user && !redirect) {return <Navigate to={'/login'}/>}
  if(redirect) {return <Navigate to={redirect}/>}

  return (
    <>
        {isAdmin && (
          <>
            <ProfilePage setredirect={setredirect}/>
            <div className='h-16'></div>
            <Subfooter/>
            <Footer/>
          </>
        )}

        {!isAdmin && (
          <>
            <nav className='flex gap-14 mt-7 mb-12 justify-center text-lg font-semibold'>
                <Link to={'/account/profile'} className={linkclass('profile')}>
                  <LuUser2/>
                  My Profile
                </Link>

                <Link to={'/account/complaints'} className={linkclass('complaints')}>
                  <BiPaste/>
                  My Complaints
                </Link>

                <Link to={'/account/register'} className={linkclass('register')}>
                  <GrUserPolice />
                  Register Complaint
                </Link>
            </nav>

            {subpage === 'profile' && (
              <ProfilePage setredirect={setredirect}/>
            )}

            {subpage === 'register' && (
              <Registercomplaints/>
            )}

            {subpage === 'complaints' && (
              <UserComplaints/>
            )}
          </>
        )}
    </>
  )
}
export default AccountPage;