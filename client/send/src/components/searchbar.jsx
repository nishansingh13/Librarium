import React, { useState,useEffect } from 'react'
import profile  from '../assets/profile.webp';

function Searchbar({onsearch}) {
  const [curr_user,setCurrUser]= useState(null);

 
  useEffect(() => {
    const fetchCurrentUser = async () => {
        try {
            const response = await fetch('http://localhost:5000/getcurr');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.length > 0) {
                setCurrUser(data[data.length-1].curr_name.toUpperCase()); 
            } else {
                setCurrUser(null);
            }
        } catch (error) {
            console.log(error.message);
        } 
    };

    fetchCurrentUser(); 
}, []);

  
  return (
    <>
    <input type="text" className=' h-12 px-[3rem] outline-none w-[85%]  ' placeholder='Search any book.. ' onChange={onsearch} />
     <div className='bg-white h-12  w-[40%] lg:w-[30%] xl:w-[20%] grid grid-cols-2 '>
     <img src={profile} alt="" className='bg-white p-2 relative left-4 box-border w-[4rem] overflow-hidden' />
      <div className='py-2 relative right-9 top-[0.15rem] hidden md:block'>{(curr_user)}</div>
     
      </div>
  
    </>
  )
}

export default Searchbar