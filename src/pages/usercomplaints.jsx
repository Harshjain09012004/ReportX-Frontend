import { useEffect, useState } from 'react'
import Card from '../card';
import axios from 'axios'
import { NoDataFound } from '../noDataFound.jsx'

const UserComplaints = () => {
  const [allcomplaints, setallcomplaints] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios.get('/userComplaints', {withCredentials : true})
    .then((data)=>{
      let arr = data.data.complaints;
      setallcomplaints(arr); setloading(false);
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])

  return (
    <>
      {loading && (
        <p className='font-bold text-3xl text-center'>Fetching Data...</p>
      )}

      {!loading && (
        <div>
          {!allcomplaints ?
            <NoDataFound/>
          :
            <div>
              {allcomplaints.map((data,i)=>{
                return <Card key={i} det={data}/>
              })}
            </div>
          }
        </div>
      )}
    </>
  )
}

export default UserComplaints;