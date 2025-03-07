import { Faq } from './faq'

export const AllFaqs = () => {
  return (
    <div className='flex flex-col place-items-center gap-10 mb-24'>
        <p className='text-4xl font-medium'>FAQ&apos;s</p>
        <Faq Ques={'How to register a complaint ?'} Ans={'You can register your complaint by clicking on the menuBar on the header or By clicking on the button register complaint.'}/>

        <Faq Ques={'How to track complaint status ?'} Ans={'You can check complaint status By clicking on the menuBar on the header or by clicking the check status button'}/>

        <Faq Ques={'What happen if i mistakenly submitted some wrong information ?'} Ans={'Untill the complaint is pending you can update it as many times after that you won\'nt be allowed to do so. Then either you have to write mail to us or physically verify to the office.'}/>

        <Faq Ques={'How much it takes for a complaint to get resolved ?'} Ans={'It depends on the type of complaint, normal complaint have average resolution time of 1-2 weeks while complex complaints can take 1-2 months or more, Although we try our best to resolve complaints as early as possible'}/>

        <Faq Ques={'Can i register complaint for someone else ?'} Ans={'Yes, you can register complaint for anyone but you have to make sure complaint is genuine otherwise you will also be responsible is some discrepancies are found later.'}/>

        <Faq Ques={'Do i have to visit office after filing complaint ?'} Ans={'No, You don\'t need to visit regularly but you would be called whenever our team requires your physical presense otherwise you have enough details on the portal then you don\'t have to face much difficulty. '}/>

        <Faq Ques={'What happen if i am not able to be available when you have called ?'} Ans={'So we are here to help you and if you have any difficulty then talk to our officer, otherwise if you are not available for 3 continuos appointment then your complaint would be terminated with some imposed fine for wasting time.'}/>

        <Faq Ques={'What are different helpline numbers ?'} Ans={`Child : 110 | Women : 108 | General :  100 | Whatsapp : 1234567890`}/>
    </div>
  )
}
