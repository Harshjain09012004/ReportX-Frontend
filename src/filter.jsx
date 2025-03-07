import { useState } from 'react'
import { BsSortDownAlt } from "react-icons/bs";
import { TbCategory2 } from "react-icons/tb";
import { IoFilter } from "react-icons/io5";
import axios from 'axios';
import PropTypes from 'prop-types';

export const Filter = ({search,setsearch,sort,setsort,setdet}) => {
  const [rotation, setrotation] = useState(0);
  const [menuVisibility, setmenuVisibility] = useState('hidden');

  function menuHandler(){
    if(menuVisibility){
      setmenuVisibility(''); setrotation(180)
    }
    else{
      setmenuVisibility('hidden'); setrotation(0);
    }
  }
  
  async function Apply(){
    const selectedTags = Object.keys(search).filter(tag => search[tag]).map(tag => tag.toLowerCase()); 
    
    const selectedTags2 = Object.keys(sort).filter(tag => sort[tag]);

    const { data } = await axios.post('/filterComplaints', { search: selectedTags , sort: selectedTags2});
    setdet(data); setmenuVisibility('hidden'); setrotation(0);
  }

  return (
    <div>
      <div className='Filter w-28 p-2 px-3 m-3 mx-24 flex gap-4 rounded-full place-items-center border border-violet-100 bg-white shadow-slate-400 shadow-md hover:scale-105 transition-all cursor-pointer' onClick={menuHandler}>
          <p className='text-lg text-zinc-700'>Filter</p>
          <IoFilter className={`text-2xl transition-all ${rotation == 180 ? "rotate-180" : "rotate-0"}`}/>
      </div>

      <div className={`MenuBar absolute top-24 left-24 pt-4 pb-4 w-72 flex flex-col place-items-center gap-6 bg-white border border-gray-300 shadow-md shadow-zinc-400 rounded-2xl transition-all ${menuVisibility}`}>

          <div className='SortBy flex flex-col gap-3'>
            <div className='flex place-items-center justify-center gap-2 text-lg font-semibold'>
              <p>Sort By</p> 
              <BsSortDownAlt className='text-xl'/>
            </div>

            <div className='flex flex-wrap gap-x-6 gap-y-2 justify-center'>
              <label className='flex gap-2'>
                <p>Name</p>
                <input type='checkbox' checked={sort.name} onChange={()=>{
                  setsort({...sort,name:!sort.name})
                }}/>
              </label>

              <label className='flex gap-2'>
                <p>Age</p>
                <input type='checkbox' checked={sort.age} onChange={()=>{
                  setsort({...sort,age:!sort.age})
                }}/>
              </label>

              <label className='flex gap-2'>
                <p>Title</p>
                <input type='checkbox' checked={sort.title} onChange={()=>{
                  setsort({...sort,title:!sort.title})
                }}/>
              </label>

              <label className='flex gap-2'>
                <p>Date</p>
                <input type='checkbox' checked={sort.date} onChange={()=>{
                  setsort({...sort,date:!sort.date})
                }}/>
              </label>

              <label className='flex gap-2'>
                <p>Time</p>
                <input type='checkbox' checked={sort.startTime} onChange={()=>{
                  setsort({...sort,startTime:!sort.startTime})
                }}/>
              </label>

              <label className='flex gap-2'>
                <p>Gender</p>
                <input type='checkbox' checked={sort.gender} onChange={()=>{
                  setsort({...sort,gender:!sort.gender})
                }}/>
              </label>
            </div>
          </div>

          <div className='SelectCategory flex flex-col gap-3'>
            <div className='flex place-items-center justify-center gap-2 text-lg font-semibold'>
              <p>Categories</p> 
              <TbCategory2/>
            </div>

            <div className='flex flex-wrap gap-x-6 gap-y-2 justify-center'>
              <label className='flex gap-2'>
                <p>Theft</p>
                <input type='checkbox' checked={search.theft} onChange={()=>{
                  setsearch({...search,theft:!search.theft})
                }}/>
              </label>

              <label className='flex gap-2'>
                <p>Threat</p>
                <input type='checkbox' checked={search.threat} onChange={()=>{
                  setsearch({...search,threat:!search.threat})
                }}/>
              </label>

              <label className='flex gap-2'>
                <p>Hacking</p>
                <input type='checkbox' checked={search.hacking} onChange={()=>{
                  setsearch({...search,hacking:!search.hacking})
                }}/>
              </label>

              <label className='flex gap-2'>
                <p>Violence</p>
                <input type='checkbox' checked={search.violence} onChange={()=>{
                  setsearch({...search,violence:!search.violence})
                }}/>
              </label>

              <label className='flex gap-2'>
                <p>Scam</p>
                <input type='checkbox' checked={search.scam} onChange={()=>{
                  setsearch({...search,scam:!search.scam})
                }}/>
              </label>

              <label className='flex gap-2'>
                <p>Bribery</p>
                <input type='checkbox' checked={search.bribery} onChange={()=>{
                  setsearch({...search,bribery:!search.bribery})
                }}/>
              </label>

              <label className='flex gap-2'>
                <p>HateSpeech</p>
                <input type='checkbox' checked={search.hateSpeech} onChange={()=>{
                  setsearch({...search,hateSpeech:!search.hateSpeech})
                }}/>
              </label>

              <label className='flex gap-2'>
                <p>Property</p>
                <input type='checkbox' checked={search.property} onChange={()=>{
                  setsearch({...search,property:!search.property})
                }}/>
              </label>
            </div>
          </div>

          <div className='Apply h-11 w-28 flex place-items-center justify-center bg-black rounded-full text-white font-medium active:scale-105 transition-all cursor-pointer' onClick={Apply}>Apply</div>

      </div>
    </div>
  )
}

Filter.propTypes = {
  search: PropTypes.object.isRequired,  // search should be an object
  setsearch: PropTypes.func.isRequired, // setsearch should be a function
  sort: PropTypes.object.isRequired,    // sort should be an object
  setsort: PropTypes.func.isRequired,   // setsort should be a function
  setdet: PropTypes.func.isRequired,    // setdet should be a function
};