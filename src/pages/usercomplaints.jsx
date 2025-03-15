import { useEffect, useState } from 'react'
import Card from '../card';
import axios from 'axios'
import { NoDataFound } from '../noDataFound.jsx'

const UserComplaints = () => {
  const [allcomplaints, setallcomplaints] = useState([]);

  useEffect(() => {
    axios.get('/userComplaints', {withCredentials : true})
    .then((data)=>{
      console.log(data);
      let arr = data.data.complaints;
      console.log(arr);
      setallcomplaints(arr);
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])

  return (
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
  )
}

export default UserComplaints;