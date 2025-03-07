import {Link} from 'react-router-dom';

const Subfooter = () => {
  return (
    <>
    <div className='Subfooter px-[5%] py-[3%] bg-zinc-100 flex flex-col gap-10'>

      <p className=' text-center text-2xl font-semibold'>Raise Your Voice</p>

      <div className='Links flex gap-48 text-sm'>
        <div className='flex flex-col gap-3 text-gray-600'>
          <p className='text-zinc-800 font-semibold text-lg'>Support</p>
          <Link to={""}>Help Centre</Link>
          <Link to={""}>Women&apos;s Cell</Link>
          <Link to={""}>Children&apos;s Cell</Link>
        </div>

        <div className='flex flex-col gap-3 text-gray-600'>
          <p className='text-zinc-800 font-semibold text-lg'>Initiatives</p>
            <Link to={""}>Child Education</Link>
            <Link to={""}>Chal Charkha Employment Scheme</Link>
        </div>

        <div className='flex flex-col gap-3 text-gray-600'>
          <p className='text-zinc-800 font-semibold text-lg'>Contribute</p>
            <Link to={""}>Organise Workshop</Link>
            <Link to={""}>Life Changing Seminars</Link>
            <Link to={""}>Support Child Education</Link>
        </div>
        
      </div>
      
    </div>
    </>
  )
}

export default Subfooter;