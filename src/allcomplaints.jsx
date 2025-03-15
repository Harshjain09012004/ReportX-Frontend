import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AdminCard from './adminCard';
import { NoDataFound } from './noDataFound';

export const AllComplaints = ({ det, setdet }) => {
  
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios.get('/allComplaints')
      .then((data) => {
        setdet(data.data); setloading(false);
      })
      .catch((err) => console.error('Error fetching complaints:', err));
  }, []);

  return (
    <div className='flex flex-col m-7'>
      {loading && (
        <p className='font-bold text-3xl text-center'>Fetching Data...</p>
      )}

      {det.length > 0 && (
        <div className='ml-16 bg-white w-44 text-center p-2 rounded-lg border border-gray-200 shadow-md shadow-gray-300'>
          {det.length} Complaints Fetched
        </div>
      )}

      {det.map((data, i) => (
        <AdminCard key={i} det={data} />
      ))}

      {!loading && det.length === 0 && <NoDataFound />}
    </div>
  );
};

// PropTypes for type validation
AllComplaints.propTypes = {
  det: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      registrationDate: PropTypes.string.isRequired,
      lastUpdateDate: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      photos: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  setdet: PropTypes.func.isRequired,
};

export default AllComplaints;
