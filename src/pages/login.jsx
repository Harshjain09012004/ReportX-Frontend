import { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import {usercontext} from '../UserContext'
import { GiCancel } from "react-icons/gi";
import axios from 'axios';

function Login() {
  const [lname, setlname] = useState('');
  const [lpass, setlpass] = useState('');
  const [redirect, setredirect] = useState(false);
  const {setuser,setdp,setisAdmin,setready} = useContext(usercontext);
  
  const [showCredentials, setshowCredentials] = useState(true);
  
  function credentialsHandler(){setshowCredentials(false);}

  async function loginhandler(e)
  {
    e.preventDefault();                
    try{
        const res = await axios.post('/login',{lname,lpass});

        if(res.data.success){
            setuser(res.data.name); setdp(res.data.photo); 
            if(res.data.role == 'admin') setisAdmin(true); 
            setredirect(true); setready(true);
        }
        else {alert('login failed : ' + res.data.err)}
    }
    catch(e){alert('login failed')}
    setlname(""); setlpass("");
  }

  if(redirect) {return <Navigate to={'/'}/>}
  return (
    <>
        <div className='login h-[88vh] w-full bg-gray-200 flex justify-center place-items-center'>
            {showCredentials && (
                <div className=" bg-red-500 w-[43%] p-1 text-white flex gap-4 text-xl rounded-xl place-items-center px-4 absolute top-28">
                    <GiCancel
                    className="cursor-pointer text-2xl hover:scale-110"
                    onClick={credentialsHandler}
                    />
                    <div className='flex flex-col place-items-center'>
                        <p>Use <b>a@mail.com</b> for User Access <b>b@mail.com</b> for Admin Access</p>

                        <p>& <b>123</b> as Password For Both Emails</p>
                    </div>
                    
                </div>
            )}
            
            <div className='bg-white h-96 w-[30%] rounded-3xl flex flex-col place-items-center justify-center gap-12'>
                <h3 className=' text-3xl font-semibold'>Login / Sign In </h3>
                <form className='flex flex-col justify-center place-items-center gap-7 ' onSubmit={loginhandler}>
                    <input className='Email' placeholder='Enter Your Email' value={lname} onChange={(e)=>{
                        setlname(e.target.value);
                    }} type='email' required/>

                    <input className='Pass' placeholder='Enter Your Password' value={lpass} type='password' onChange={(e)=>{
                        setlpass(e.target.value);
                    }} required/>

                    <button type='submit' className='submit'>Login</button>
                </form>

                <div className='flex flex-row gap-10'>
                    <Link to={'/register'} className=' text-sm text-blue-700'>New User ? Sign Up Here</Link>
                    <Link to={'/'} className=' text-sm text-blue-700'>Back To Home</Link>
                </div>
            </div>
            
        </div>
    </>
  )
}
export default Login;