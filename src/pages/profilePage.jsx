import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import { usercontext } from '../UserContext';
import { FcCompactCamera } from "react-icons/fc";
import PropTypes from 'prop-types';

const url = import.meta.env.VITE_SERVER;

const ProfilePage = (props)=>{
    const {user,setuser,dp,setdp,isAdmin,setisAdmin} = useContext(usercontext);
    const [compldet,setcompldet] = useState([0,0,0,0]);

    useEffect(() => {
        if(isAdmin){
            axios.get('/allComplaints').then(({data})=>{
                let total = data.length;
                let pending = 0, active = 0, closed = 0;
                
                for(let ob of data){
                    if(ob.status == 'Pending') pending++;
                    else if(ob.status == 'Closed') closed++;
                    else active++;
                }

                let arr = [total,active,pending,closed];
                setcompldet(arr);
            })
        }
        else{
            axios.get('/userComplaints').then(({data})=>{
                let total = data.complaints.length; 
                let pending = 0, active = 0, closed = 0;
                
                for(let ob of data.complaints){
                    if(ob.status == 'Pending') pending++;
                    else if(ob.status == 'Closed') closed++;
                    else active++;
                }
                
                let arr = [total,active,pending,closed];
                setcompldet(arr);
            })
        }
        
    }, [])
    

    async function logout(){
        try{
            const resp = await axios.post('/logout');
            if(resp.data.success){
               setuser(''); setdp(''); setisAdmin(false);
               props.setredirect('/');
            }
        }
        catch{alert('Unable to process Request');}
    }

    function imagePicker(e){ 
        const files = e.target.files;
        const data = new FormData();
        for(let file of files) {data.append('photos',file)}

        axios.post('/uploadByButtonProfile',data,{
        headers:{'Content-Type':'multipart/form-data'}
        }).then((res)=>{
            setdp(res.data[0]);
        })
    }

    return (
        <div className='flex gap-10'>
            <div className=' w-72 h-[330px] ml-10 mt-10 p-5 gap-3 shadow-slate-300 shadow-xl rounded-2xl flex flex-col justify-center place-items-center border border-gray-200'>
                <div className='bg-gray-400 w-44 h-44 shadow-slate-700 shadow-md rounded-full mt-2 relative'>
                    <img src={`${url}/uploads/${dp}`} className=' object-cover rounded-full h-44 w-44'/>

                    <label className='absolute right-1 bottom-0 active:scale-125 transition-all cursor-pointer'>
                        <input
                        type='file'
                        hidden
                        id="profileimagepicker"
                        onChange={imagePicker}
                        />
                        <FcCompactCamera className='text-3xl'/>
                    </label>
                </div>

                <p className='text-xl font-semibold'>{user}</p>
                <button className='py-3 px-8 bg-red-500 rounded-xl text-white text-large font-medium' onClick={logout}>Logout</button>
            </div>

            <div className='w-[72%] h-[330px] mt-10 p-10 shadow-slate-300 shadow-xl rounded-2xl border border-gray-200 grid grid-cols-2 text-[26px] font-bold text-center'>
                <div className='gap-1 border border-slate-300 place-content-center rounded-3xl m-2'>
                    <p className=' inline text-zinc-600'>Total Complaints </p> <p className='inline text-green-400'>{compldet[0]}</p>
                </div>

                <div className='border border-slate-300 place-content-center text-green-400 rounded-3xl m-2'>
                    <p className=' inline text-zinc-600'>Active Complaints </p><p className='inline text-green-400'>{compldet[1]}</p>
                </div>

                <div className='border border-slate-300 place-content-center text-rose-400 rounded-3xl m-2'>
                    <p className=' inline text-zinc-600'>Pending Complaints </p> <p className='inline text-red-400'>{compldet[2]}</p>
                </div>
                
                <div className='border border-slate-300 place-content-center text-rose-400 rounded-3xl m-2'>
                    <p className=' inline text-zinc-600'>Closed Complaints </p><p className='inline text-red-400'>{compldet[3]}</p>
                </div>
            </div>
        </div>
    )
}
export default ProfilePage;

ProfilePage.propTypes = {
    setredirect: PropTypes.func.isRequired,
};

ProfilePage.defaultProps = {
    setredirect: () => {},
};