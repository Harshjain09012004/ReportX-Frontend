import { useEffect, useState } from 'react'
import Card from '../card';
import axios from 'axios'
import { NoDataFound } from '../noDataFound.jsx'

const UserComplaints = () => {
  const [allcomplaints, setallcomplaints] = useState([]);
  useEffect(() => {
    axios.get('/userComplaints')
    .then((data)=>{
      let arr = data.data.complaints;
      setallcomplaints(arr);
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])



  return (
    <div>
      {(!allcomplaints || allcomplaints.length == 0) && (
        <NoDataFound/>
      )}
      {allcomplaints.length > 0 && (
        <div>
          {allcomplaints.map((data,i)=>{
            return <Card key={i} det={data}/>
          })}
        </div>
      )}
    </div>
  )
}

export default UserComplaints;