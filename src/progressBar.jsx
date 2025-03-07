import PropTypes from "prop-types";

export const ProgressBar = ({ progress }) => {
  return (
    <div className='flex gap-3 justify-center place-items-center overflow-hidden '>
      <div className='h-2 w-64 rounded-3xl bg-gray-300 transition-all overflow-hidden'>
        <div 
          className='h-[100%] bg-black rounded-3xl transition-all' 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p>{progress}%</p>
    </div>
  );
};

// ✅ Add PropTypes validation
ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired, 
  setprogress: PropTypes.func.isRequired,
};
