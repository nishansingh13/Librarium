// Aboutbooks.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import "./aboutbooks.css";

function Aboutbooks({ onRent }) {
  
const navigate = useNavigate();
  const location = useLocation();
  const { title, authors, desc, image_link, rented, stock } = location.state || {};

  const Rent = () => {
    const rentDays = prompt("Enter how many days you want to rent the book (2-10):");

    if (rentDays === null) {
      return; 
    }
    const rentDaysNum = parseInt(rentDays, 10); 
    if (rentDaysNum >= 2 && rentDaysNum <= 10) {
      onRent({ title, authors, desc, image_link, rented, stock }, rentDaysNum); 
    } else {
      alert("Please choose between 2 and 10 days.");
    }
  };

  if (!location.state) {
    return <div>No book information available.</div>;
  }

  return (
    <div
      className="about-book"
      onClick={() => navigate(-1)}
    >
      <div className="info">
      <img src={image_link} alt={title} />
      <h2>{title}</h2>
      <p>{desc}</p>
     
      <button
                  className='text-[#282E48] bg-white border border-[#282E48] px-4 my-8 rounded-sm hover:border  hover:bg-[#282E48] hover:text-white'
                  onClick={Rent}
                >
                  Rent
                </button>

      </div>
    </div>
  );
}

export default Aboutbooks;