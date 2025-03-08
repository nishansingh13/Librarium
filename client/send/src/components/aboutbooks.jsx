// Aboutbooks.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function Aboutbooks({ onRent }) {
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
    <motion.div
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: 10, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="about-book"
    >
      <img src={image_link} alt={title} />
      <h2>{title}</h2>
      <p>{desc}</p>
      <button onClick={Rent}>Rent</button>
    </motion.div>
  );
}

export default Aboutbooks;