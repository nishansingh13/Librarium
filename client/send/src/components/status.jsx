import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import tick from '../assets/tick.jpg';
import cross from '../assets/cross.avif';

function Status() {
    const navigate = useNavigate();
    const location = useLocation();
    const { title, rentDays, status } = location.state ;

    const isSuccess = status === 'Success';
    const imageSrc = isSuccess ? tick : cross;
    const message = isSuccess 
        ? `Successfully Rented "${title}" for ${rentDays} days` 
        : ` "${title}" Currently out of stock`;

    return (
        <div className="bg-[#282E48] h-screen flex items-center justify-center">
            <div className="mx-auto h-[25rem] w-[25rem] shadow relative bg-white">  
                <img src={imageSrc} alt='' className="w-[5rem] mx-auto pt-[3rem]"/>
                <br/>
                <div className={`text-center font-semibold text-[2rem] ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
                    {isSuccess ? 'SUCCESS' : 'FAILED'}
                </div>
                <div className={`text-center text-[1.2rem]`}>
                    {message}
                </div>
                <br/><br/>
                <div 
                    className="text-center text-[1.2rem] cursor-pointer border border-black w-[7rem] mx-auto text-white bg-[#282E48] rounded-sm hover:scale-[110%] transition-all" 
                    onClick={() => navigate(-1)}
                >
                    Go Home
                </div>
            </div>
        </div>
    );
}

export default Status;