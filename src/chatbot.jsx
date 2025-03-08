import { useContext, useState } from 'react';
import { IoMdSend } from "react-icons/io";
import { usercontext } from './UserContext';
import { MdAccountCircle } from "react-icons/md";
import { TypeAnimation } from 'react-type-animation';

const ChatBot = ()=>{
    let classA = 'opacity-0 right-4 bottom-24', classB = 'right-6 bottom-36';

    const {dp} = useContext(usercontext);
    const [helpMenuCss, sethelpMenuCss] = useState(classA);
    const [send, setsend] = useState(false);
    const [text, settext] = useState('');
    const [ques, setques] = useState('');
    const [ans, setans] = useState('');

    const patterns = {
        greeting: /^(hi|hello|hey|good|morning|afternoon|evening)$/i,
        reportComplaint: /(report|file|submit|complaint|issue)/i,
        track: /(track|status|check|update)/i,
        time:/(time|pending|no\supdate|taking\slong|long|resolved)/i,
        help: /(help|assist|support)/i,
    };

    function helpHandler(){
        if(helpMenuCss == classA) sethelpMenuCss(classB);
        else{
            sethelpMenuCss(classA); setques('');
        }
    }

    function AnswerDoubt(query){
        if(patterns.greeting.test(query)){
            setans('Hello, I am ChatMitra here to help you with all kind of issues you are facing. Please feel free to ask me anything related to this application or your complaint.');
        }
        else if(patterns.help.test(query)){
            setans('I am here to help you with all possible ways please feel free to ask, My only task is to provide you with all things that you need. So please share your concern with me!');
        }
        else if(patterns.track.test(query)){
            setans('To check the status of your applications you need to go to to the check complaint link on menu option or you can click on your image then you will get the option to check status or see any update.')
        }
        else if(patterns.time.test(query)){
            setans('The time it takes to resolve a complaint depends on several factors, including the type of incident, complexity, and availability of resources for investigation. Generally Simple cases (minor theft or lost items) may take a few days to a couple of weeks. Complex cases (fraud, cybercrime) may require several weeks for investigation.');
        }
        else{
            setans('I am here to assist with queries related to our Crime Portal. Let me know if you have any questions about using the app or related to complaint filling etc.!');
        }

        setTimeout(() => {
            setsend(false);
        },3000);
    }

    return (
        <div className='cursor-pointer'>
            <div id='Chatbot' className='fixed right-6 bottom-16 bg-blue-50 w-16 h-16 rounded-full flex place-items-center justify-center border border-blue-300 shadow-md shadow-blue-400 active:scale-110 hover:bg-blue-100 hover:scale-105 transition-all' onClick={helpHandler}>
                <img src='Chatbot.png'/>
            </div>

            <div className={`bg-indigo-50 rounded-2xl fixed transition-all flex flex-col gap-2 place-items-start border border-blue-300 p-4 shadow-md shadow-slate-400 ${helpMenuCss}`}>
                <div className='flex justify-evenly place-items-center gap-2'>
                    <div className='object-cover w-10'>
                        <img src='Chatbot.png'/>
                    </div>
                    <p className='font-medium'>ChatMitra</p>
                    <div className='w-2 h-2 rounded-full bg-green-500'></div>
                </div>

                <div className='QnA h-48 w-64 flex flex-col gap-4 justify-start'>
                    <div className={`Ques bg-white min-h-4 
                    max-h-16 border border-blue-300 shadow-sm shadow-blue-200 text-sm p-1 rounded-lg overflow-auto flex gap-2 ${ques ? '' : 'hidden' }`}>
                        <div className='w-5 object-cover'> 
                            {dp && <img src={`http://localhost:5000/uploads/${dp}`} className='h-[12px] w-[12px] rounded-full object-cover'/>}

                            {!dp && <MdAccountCircle className='text-[18px] text-blue-400'/>}
                        </div>
                        {ques}
                    </div>

                    <div className={`Ans bg-white min-h-4  max-h-32 border border-green-300 shadow-sm shadow-green-200 text-sm p-1 rounded-lg overflow-auto flex gap-2 ${ques ? '' : 'hidden'}`}>

                        <div className='w-5 object-cover'> 
                            <img src='Chatbot.png'/>
                        </div>

                        {send ?    
                        <TypeAnimation
                            splitter={(str) => str.split(/(?= )/)}
                            sequence={[
                            ans,
                            1000,
                            '',
                            ]}
                            speed={{ type: 'keyStrokeDelayInMs', value: 100 }}
                            omitDeletionAnimation={true}
                            style={{ fontSize: '14px', display: 'block', minHeight: '200px',maxWidth:'200px' }}
                            repeat={0}
                        />
                        : <div className='w-[95%]'>{ans}</div>}
                    </div>

                    {!ques && (
                        <div className='flex flex-col gap-3'>

                            <div className='p-2 border border-purple-300 rounded-xl shadow-md shadow-blue-200 bg-white text-sm'>How may i help you ?</div>

                            <div className='p-2 border border-green-400 rounded-xl shadow-md shadow-blue-200 bg-white cursor-pointer hover:scale-105  hover:border-blue-400 transition-all text-sm' onClick={()=>{
                                setques('Find Application Status ?'); 
                                AnswerDoubt('Find Application Status')
                            }}>1. Find Application Status ?</div>

                            <div className='p-2 border border-pink-300 rounded-xl shadow-md shadow-blue-200 bg-white cursor-pointer hover:scale-105  hover:border-blue-400 transition-all text-sm' onClick={()=>{
                                setques('When application will be resolved ?'); 
                                AnswerDoubt('When application will be resolved ?')
                            }}>2. When application will be resolved ?</div>

                            <div className='p-2 border border-violet-300 rounded-xl shadow-md shadow-blue-200 bg-white cursor-pointer hover:scale-105  hover:border-blue-400 transition-all text-sm' onClick={()=>{
                                setques('How can i contact officers ?'); 
                                AnswerDoubt('How can i contact officers ?')
                            }}>3. How can i contact officers ?</div>
                        </div>
                    )}

                </div>
                
                <div className='flex gap-3 place-items-center'>
                    <input type='ques' value={text} className='p-2 px-7 text-sm appearance-none outline-none' 
                    onChange={(e)=>{
                        settext(e.target.value);
                    }} onKeyDown={(e)=>{
                        if(e.key == 'Enter'){
                            setques(text); AnswerDoubt(text);
                            setsend(true); settext('');
                        }
                    }} placeholder='Enter your doubt here'/>

                    <IoMdSend className='text-2xl active:scale-110 transition-all' onClick={()=>{
                        setsend(true); setques(text);
                        AnswerDoubt(text); settext('');
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default ChatBot;