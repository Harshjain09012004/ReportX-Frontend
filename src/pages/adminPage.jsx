import { useContext, useState } from 'react';
import axios from 'axios';
import { usercontext } from '../UserContext.jsx';
import { Navigate } from 'react-router-dom';
import Footer from '../footer';
import Subfooter from '../subfooter';
import { AllComplaints } from '../allcomplaints.jsx';
import { Filter } from '../filter.jsx';

import { FiSearch } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import { BsTable } from "react-icons/bs";
import { FaAddressCard } from "react-icons/fa";
import StickyHeadTable from '../table.jsx';
import { Downloader } from '../downloader.jsx';

function Admin() {
  const {isAdmin,ready,user} = useContext(usercontext);
  const [table, settable] = useState(false);
  const [card, setcard] = useState(true);
  const [download, setdownload] = useState(false);
  const [det, setdet] = useState([]);

  const [field,setfield] = useState('name');
  const [search, setsearch] = useState('');
  const [type, settype] = useState('text');

  const [sortBy, setsortBy] = useState({name:false,age:false,title:false,date:false,startTime:false,gender:false});

  const [searchBy, setsearchBy] = useState({theft:false,threat:false,accounthacking:false,violence:false,scam:false,bribery:false,childmarriage:false,hatespeech:false,property:false});

  async function searchData(){
    const {data} = await axios.post('/Search',{field,search});
    setdet(data);
  }

  if(ready && (!user || !isAdmin)) {return <Navigate to={'/'}/>}

  return (

    <div className='h-[100%] w-[100%] bg-zinc-50'>

      <div className='AdminHeader mt-3 flex place-items-center justify-between sticky top-0 z-10 bg-zinc-50 h-24  bg-opacity-85'>

        <Filter sort={sortBy} setsort={setsortBy} search={searchBy} setsearch={setsearchBy} setdet={setdet} />

        <div className='flex gap-14 justify-center place-items-center text-lg font-semibold'>
            <div className={`py-2 px-5 flex gap-4 items-center rounded-3xl cursor-pointer transition-all hover:scale-105 ${card?'bg-zinc-900 text-white':'bg-gray-300'}`} onClick={()=>{
              setcard(true); setdownload(false); settable(false);
            }}>
                <FaAddressCard/>
                Card View
            </div>

            <div className={`py-2 px-5 flex gap-4 items-center rounded-3xl cursor-pointer transition-all hover:scale-105 ${table?'bg-zinc-900 text-white':'bg-gray-300'}`} onClick={()=>{
              setcard(false); setdownload(false); settable(true);
            }}>
                <BsTable/>
                Tabular View
            </div>

            <div className={`py-2 px-5 flex gap-4 items-center rounded-3xl cursor-pointer transition-all hover:scale-105 ${download?'bg-zinc-900 text-white':'bg-gray-300'}`} onClick={()=>{
              setcard(false); setdownload(true); settable(false);
            }}>
                <FiDownload />
                Complaint Data
            </div>
        </div>

        <div className='Search w-72 h-11 border border-x-red-200 border-y-blue-200  shadow-md shadow-slate-400 rounded-full flex place-items-center gap-1 mr-20 px-2 hover:scale-105 transition-all bg-white'>

          <select onChange={(e)=>{
            const inpField = e.target.value; 
            setfield(inpField); setsearch('');

            if(inpField=='age') settype('number');
            else if(inpField=='date') settype('date');
            else if(inpField=='startTime') settype('time')
            else settype('text');
          }} 
          className='bg-white outline-none w-20 p-0 text-center rounded-none appearance-none border-gray-300 border-r-2 font-semibold cursor-pointer'>
            <option value={'name'}>Name</option>
            <option value={'age'}>Age</option>
            <option value={'title'}>Title</option>
            <option value={'date'}>Date</option>
            <option value={'startTime'}>Time</option>
            <option value={'status'}>Status</option>
            <option value={'address'}>Location</option>
          </select>

          <input type={`${type}`} placeholder='Search Here' className='w-36 placeholder:text-gray-900 outline-none rounded-full h-9 bg-white px-4' value={search}  onChange={(e)=>{
              setsearch(e.target.value);
          }}/>

          <FiSearch className='text-2xl active:scale-110 transition-all cursor-pointer' onClick={searchData}/>
        </div>

      </div>

      {card && (<AllComplaints det={det} setdet={setdet}/>)}
      {table && (<StickyHeadTable rows={det} setrows={setdet}/>)}
      {download && (<Downloader/>)}
      
      <Subfooter/>
      <Footer/>
    </div>
  )
}

export default Admin