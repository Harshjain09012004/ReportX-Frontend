import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { HiDotsVertical } from "react-icons/hi";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBinLine } from "react-icons/ri";
import { usercontext } from './UserContext';
import { AllPhotos } from './allPhotos';
import PropTypes from 'prop-types';

const url = import.meta.env.VITE_SERVER;

const AdminCard = ({det}) => {

  const {user} = useContext(usercontext);
  const [statusClass, setstatusClass] = useState();
  const [menuclass, setmenuclass] = useState('hidden');
  const [update,setupdate] = useState(false);
  const [newStatus,setnewStatus] = useState(det.status);
  const [tempState, settempState] = useState(det.status);
  const [doAsk, setdoAsk] = useState(false);
  const [cnfmName, setcnfmName] = useState('');
  const [biggerImage, setbiggerImage] = useState(false);

  useEffect(() => {
    if(newStatus == 'Pending') setstatusClass('text-lg  font-medium' + ' text-orange-400');
    else if(newStatus == 'Active') setstatusClass('text-lg  font-medium' + ' text-green-500');
    else if(newStatus == 'Terminated') setstatusClass('text-lg  font-medium' + ' text-red-800');
    else setstatusClass('text-lg  font-medium' + ' text-purple-500');
  }, [newStatus]);

  function menu(){
    if(menuclass) setmenuclass('');
    else setmenuclass('hidden')
  }

  async function save(){
    try{
      if(tempState != det.status){
        await axios.put('/updateStatus',{"id":det._id,"status":tempState});
      }

      setupdate(false); det.status = tempState;
      setnewStatus(tempState);
    }
    catch{alert("Service Unavailable");}
  }

  function confirmDelete(){
    if(cnfmName == user) {deleteComplaint();}
    else{
      alert('Complaint Cannot Be Deleted');
      setcnfmName('');
    }
  }

  async function deleteComplaint(){
    try{
      const res = await axios.post('/deleteComplaint',{"id":det._id,"regMail":det.registrarMail});
      if(!res.data.Success) alert("Something Wrong");
      else{
        setnewStatus('Terminated'); 
        det.status = 'Terminated';

        // const content = {
        //   "for" : det.registrarMail,
        //   "title" : 'Complaint Termination',
        //   "message" : `Your Complaint is Terminated due to some wrong or unreliable information.`
        // };

        // const mailres = await axios.post('/SendMail',content);
      }
      setmenuclass('hidden'); setdoAsk(false);
    }
    catch{alert("Unable To Process");}
  }

  return (
    <div className='Card relative m-8 ml-16 border w-[80%] border-gray-300 rounded-2xl shadow-neutral-400 shadow-lg cursor-pointer transition-all hover:shadow-zinc-500 hover:shadow-md'>

        <div className='flex flex-row gap-16 place-items-center w-[100%] h-96 relative
        p-1 '>

          <HiDotsVertical className=' text-2xl absolute top-8 right-7 active:scale-110 transition-all' onClick={menu}/>

          <div className={`absolute bg-zinc-200 top-[70px] right-6 w-32 text-md rounded-2xl transition-all z-20 shadow-md shadow-zinc-400 ${menuclass}`}>
        
            <div className='flex flex-col gap-2 mt-4 mb-4'>
                <div className='flex gap-3 justify-center place-items-center text-center p-1 hover:bg-slate-400 transition-colors' onClick={()=>{
                  setdoAsk(!doAsk); setmenuclass('hidden');
                }}>
                  <p>Delete</p>
                  <RiDeleteBinLine/>
                </div>

                <div className='flex gap-3 justify-center place-items-center text-center p-1 hover:bg-slate-400 transition-colors' onClick={()=>{
                  setupdate(!update); setmenuclass('hidden');
                }}>
                  <p>Update</p>
                  <RxUpdate/>
                </div>
            </div>

          </div>

          <div className='Image relative w-[25%] h-[80%] bg-gray-400 rounded-2xl ml-4 overflow-hidden'>
            <img src={`${url}/uploads/${det.photos[0]}`} className='relative rounded-2xl h-[100%] w-[100%] object-cover cursor-pointer' onClick={()=>{setbiggerImage(true)}} />

            {biggerImage && <AllPhotos photos={det.photos} setbiggerImage={setbiggerImage}/>}

            {det.photos.length-1>0 && (
              <div className='absolute h-10 w-36 bg-black bottom-0 right-0 text-white flex justify-center rounded-tl-2xl place-items-center font-medium opacity-50' onClick={()=>{setbiggerImage(true)}}>{det.photos.length - 1} More Pictures</div>
            )}

          </div>

          <div className='Details flex flex-col gap-4'>
            <div className='title flex flex-row gap-1'>
              <p className='text-lg font-bold'>Complaint&apos;s Title - </p>
              <p className='text-lg text-slate-600 font-medium'>{det.title}</p>
            </div>

            <div className='flex gap-10'>
                <div className='title flex flex-row gap-1'>
                <p className='text-lg font-bold'>Complainee Name - </p>
                <p className='text-lg text-slate-600 font-medium'>{det.name}</p>
                </div>

                <div className='title flex flex-row gap-1'>
                <p className='text-lg font-bold'>Age - </p>
                <p className='text-lg text-slate-600 font-medium'>{det.age}</p>
                </div>

                <div className='title flex flex-row gap-1'>
                <p className='text-lg font-bold'>Gender - </p>
                <p className='text-lg text-slate-600 font-medium'>{det.gender}</p>
                </div>
            </div>

            <div className='title flex flex-row place-items-center gap-1'>
              <p className='text-lg font-bold'>Description - </p>
              <textarea className='text-lg text-slate-600 font-medium bg-zinc-50 resize-none p-1' rows={1} cols={70} value={det.description} readOnly/>
            </div>

            <div className='title flex flex-row place-items-center gap-1'>
                <p className='text-lg font-bold'>Extra Info - </p>
                <textarea className='text-lg text-slate-600 font-medium bg-zinc-50 resize-none p-1' rows={1} cols={70} value={det.extraInfo} readOnly/>
            </div>

            <div className='title flex flex-row gap-1'>
              <p className='text-lg font-bold'>Location Of Incident - </p>
              <p className='text-lg text-slate-600 font-medium'>{det.address}</p>
            </div>

            <div className='flex gap-16'>
              <div className='title flex flex-row gap-1'>
                <p className='text-lg font-bold'>Complaint Date - </p>
                <p className='text-lg text-slate-600 font-medium'>{det.date.slice(0,10)}</p>
              </div>

              <div className='title flex flex-row gap-1'>
                <p className='text-lg font-bold'>Time Of Incident - </p>
                <p className='text-lg text-slate-600 font-medium'>{det.startTime} To {det.endTime}</p>
              </div>
            </div>

            <div className='flex gap-28'>
                <div className='title flex flex-row gap-1 justify-center'>
                  <p className='text-lg font-bold'>Current Status - </p>
                  {update ? 
                    (
                      <select className='bg-gray-200 p-1 px-2 text-center cursor-pointer' defaultValue={'Select'} onChange={(e)=>{
                        settempState(e.target.value);
                      }}>
                        <option disabled>Select</option>
                        <option value={'Active'}>Active</option>
                        <option value={'Pending'}>Pending</option>
                        <option value={'Closed'}>Closed</option>
                      </select>
                    )
                    :
                    <p className={statusClass}>{det.status}</p>
                  }
                  
                </div>

                <div className='title flex flex-row gap-1'>
                  <p className='text-lg font-bold'>Phone No. - </p>
                  <p className='text-blue-400 font-medium text-lg'>{det.phone}</p>
                </div>
            </div>
        
          </div>
        </div>
        

        {doAsk && (
          <div className='h-[100%] w-[100%] absolute top-0 left-0 rounded-2xl flex justify-center place-items-center backdrop-blur-sm transition-all'>
        
            <div className='flex flex-col gap-8 place-items-center bg-white p-8 px-10 rounded-3xl border border-gray-300 shadow-lg shadow-gray-400'>

              <div className='flex flex-col gap-4 place-items-center'>
                <p className='font-medium'>Are You Sure To Delete ?</p>
                <div className='flex flex-col gap-1 place-items-center'>
                  <input type='text' value={cnfmName} className='p-2 px-3 bg-gray-200' placeholder='Enter Name To Proceed' onChange={(e)=>{
                    setcnfmName(e.target.value);
                  }}/>
                  <p className=' text-xs text-red-400'>*Information is Case-Sensitive</p>
                </div>
              </div>

              <div className='flex gap-10'>
                <div className='bg-black text-white font-medium p-2 px-3 rounded-lg active:scale-105 transition-all' onClick={()=>{setdoAsk(false)}}>Cancel</div>

                <div className='bg-black text-white font-medium p-2 px-3 rounded-lg active:scale-105 transition-all' onClick={confirmDelete}>Proceed</div>
              </div>

            </div>

          </div>
        )}

        <div className={`pb-6 flex justify-center place-items-center gap-44 transition-all ${update ? '':'hidden'}`}>

          <div className='bg-black inline text-white text-xl font-medium p-2 px-10 rounded-xl active:scale-105 transition-all' onClick={()=>{setupdate(false)}}>Cancel</div>

          <div className='bg-black inline text-white text-xl font-medium p-2 px-12 rounded-xl active:scale-105 transition-all' onClick={save}>Save</div>
        </div>

    </div>
  )
}

export default AdminCard

// PropTypes for validation
AdminCard.propTypes = {
  det: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    extraInfo: PropTypes.string,
    address: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    registrarMail: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};