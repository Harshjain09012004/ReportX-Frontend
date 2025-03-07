import { useState } from 'react'
import axios from 'axios'
import { ProgressBar } from './progressBar';

export const Downloader = () => {
  const [jsonUrl, setjsonUrl] = useState('');
  const [csvUrl, setcsvUrl] = useState('');
  const [progress, setprogress] = useState(0);
  const [progress2, setprogress2] = useState(0);
  const [loading, setloading] = useState(false);
  const [loading2, setloading2] = useState(false);

  function downloadJSON(){
    setloading(true); setprogress(0);
    axios.get('/allComplaints',
      {onDownloadProgress:(progressEvent)=>{
        const progressCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total);
        setprogress(progressCompleted);
      }
    })
    .then(({data})=>{
      const jsonData = JSON.stringify(data);
      const blob = new Blob([jsonData],{type:'application/json'});

      setjsonUrl(window.URL.createObjectURL(blob));
      setTimeout(()=>{
        document.getElementById('jsonLink').click();
        setloading(false);
      },500);
    })
    .catch(()=>{
      alert("Data Cannot Be Fetched"); setloading(false);
    })
  }

  function downloadCSV(){
    setloading2(true); setprogress2(0);
    axios({
      method: 'get', url: '/DownloadCSV', responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const progressCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setprogress2(progressCompleted);
        }
      },
    })
    .then((response)=>{
      const blob = response.data;
      setcsvUrl(window.URL.createObjectURL(blob));

      setTimeout(()=>{
        document.getElementById('csvLink').click();
        setloading2(false);
      },500)
    })
    .catch(()=>{
      alert("Data Cannot Be Fetched"); setloading2(false);
    })
  }

  return (
    <div className='flex justify-evenly place-items-center m-24 mb-28 h-40'>
      <div className='JSONDownloader flex flex-col gap-8 justify-center place-items-center p-10 border shadow-gray-400 shadow-lg rounded-3xl hover:scale-105 transition-all'>
        <a href={jsonUrl} id='jsonLink' download={'Complaints_Data.json'} className='hidden'></a>

        {!loading && <p className='font-medium text-lg'>Download JSON File Of  All Complaints</p>}

        {loading && <ProgressBar progress={progress} setprogress={setprogress}/>}
      
        <div className='Button bg-black rounded-3xl px-8 py-5 hover:scale-105 w-60 transition-transform cursor-pointer text-white font-semibold text-lg' onClick={downloadJSON}>Download JSON File</div>
      </div>

      <div className='CSVDownloader flex flex-col place-items-center gap-8 p-10 border shadow-gray-400 shadow-lg rounded-3xl hover:scale-105 transition-all'>
        <a href={csvUrl} id='csvLink' download={'Complaints_Data.csv'} className='hidden'></a>

        {!loading2 && <p className='font-medium text-lg'>Download CSV File Of All Complaints</p>}

        {loading2 && <ProgressBar progress={progress2} setprogress={setprogress2}/>}
      
        <div className='Button bg-black rounded-3xl px-8 py-5 hover:scale-105 transition-transform cursor-pointer text-white font-semibold text-lg' onClick={downloadCSV}>Download CSV File</div>
      </div>
    </div>
  )
}
