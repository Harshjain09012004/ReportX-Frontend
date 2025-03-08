import { useContext, useEffect} from 'react';
import Explore from '../explorebutton.jsx'
import Slider from '../imageSlider.jsx';
import Subfooter from '../subfooter.jsx';
import Footer from '../footer.jsx'
import ChatBot from '../chatbot.jsx';
import { Triangle } from 'react-loader-spinner';

import { usercontext } from '../UserContext.jsx';
import { AllFaqs } from '../allFaqs.jsx';

function Landing() {
  const {count,setcount} = useContext(usercontext);
  useEffect(()=>{
    setTimeout(()=>{
      setcount(count + 1);
    },1000)
  },[]);
  
  return (

    <div className='h-[100%] w-[100%] bg-zinc-50'>

      {count==0 && (
        <div className='h-[690px] w-[1500px] flex justify-center place-items-center'>
          <Triangle
          visible={true}
          height="180"
          width="180"
          color="#000000"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
        </div>
      )}

      {count>0 && (
        <>
          <div className='Great-Person-Thoughts flex flex-col place-items-center'>

            <div className='Thought relative bg-neutral-100 h-[500px] w-[1100px] mt-14 rounded-3xl shadow-xl flex place-items-center justify-around border-2 border-gray-200 hover:bg-neutral-200 hover:scale-95 transition-all'>
                <div className='Image bg-gray-300 h-82 w-72  rounded-tr-[100px] rounded-br-[100px] overflow-hidden hover:scale-105 transition-transform'>
                  <img src='MkGandhi.jpg' className='object-cover h-[100%] w-[100%]'/>
                </div>
                
                <div className='Statement w-[700px] h-96 flex place-items-center'>
                  <p className="text-6xl text-center leading-[65px] font-">
                    &quot;There would be no one to frighten you, if you refused to be afraid.&quot;
                  </p>
                </div>

              <div className='absolute bottom-14 right-20'>
                ~ Mahatma Gandhi
              </div>  
            </div>

            <div className='Thought relative bg-neutral-100 h-[500px] w-[1100px] mt-14 rounded-3xl shadow-xl flex place-items-center justify-around border-gray-200 hover:bg-neutral-200 hover:scale-95 transition-all'>
              
                <div className='Statement w-[700px] h-96 flex place-items-center'>
                  <p className='text-6xl text-center leading-[65px]'>
                    &quot;The greatest sin is to think yourself weak.&quot;
                  </p>
                </div>

                <div className='Image bg-gray-300 h-82 w-72 rounded-3xl overflow-hidden hover:scale-105 transition-transform'>
                  <img src='Swami.jpg' className='object-cover h-[100%] w-[100%]'/>
                </div>

                <div className='absolute bottom-14 left-28'>
                ~ Swami Vivekanand
                </div>  
            </div>

            <div className='Thought relative bg-neutral-100 h-[500px] w-[1100px] mt-14 shadow-xl flex rounded-3xl place-items-center justify-around border-gray-200 hover:bg-neutral-200 hover:scale-95 transition-all'>
                <div className='Image bg-gray-300 h-82 w-72 rounded-tl-[100px] rounded-br-[100px] overflow-hidden hover:scale-105 transition-transform'>
                  <img src='BhagatSingh.jpg' className='object-cover h-[100%] w-[100%]'/>
                </div>
                
                <div className='Statement w-[700px] h-96 flex place-items-center'>
                  <p className='text-6xl text-center leading-[65px]'>
                    &quot;If the deaf are to hear, the sound has to be very loud.&quot;
                  </p>
                </div>

                <div className='absolute bottom-14 right-24'>
                ~ Bhagat Singh
                </div>  
            </div>
            
          </div>
          
          <ChatBot/>
          <Explore/>
          <AllFaqs/>
          <Slider/>
          <Subfooter/>
          <Footer/>
        </>
      )}

    </div>

  )
}

export default Landing