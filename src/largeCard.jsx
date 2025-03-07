export const Largecard = () => {
  return (
    <>
      <div
        className="Card flex flex-row gap-2 min-w-[660px] max-w-[70%] h-44 place-items-center p-1 my-2 mx-10  border border-gray-300 rounded-2xl shadow-md cursor-pointer"
      >
        <div className="Image relative min-w-[180px] max-w-[17%] h-[95%] bg-gray-400 rounded-2xl m-1">
          <img
            src="https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg"
            className="relative rounded-2xl object-cover w-[100%] h-[100%]"
          />
        </div>

        <div className="Details flex flex-col gap-1 justify-between p-1 ">
          <p className=' font-bold'>Astute Apartment</p>
          <p className=' font-semibold'>Central Park, New York, USA</p>
          <p className=' '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui eos dicta, praesentium aspernatur error vero blanditiis similique deleniti voluptates vel! Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non inventore ipsam totam? Eum perferendis eaque labore minus harum in cum?</p>
        </div>
      </div>
    </>
  );
}
