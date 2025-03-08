import React from 'react';
// import Aboutbooks from './aboutbooks';
import { useNavigate } from 'react-router-dom';

function Displayedbooks(props) {
  const navigate = useNavigate();
  const reftoAbout = (title,authors,desc, image_link, rented,stock) => {
    navigate('/aboutThisBook', { state: { title, authors, desc, image_link, rented, stock} });

  };
  const handleRent = (book) => {
 
    const rentDays = prompt("Enter how many days you want to rent the book (2-10):");
    if (rentDays >= 2 && rentDays <= 10) {
      props.onRent(book, rentDays); 
    } else {
      alert("Please choose between 2 and 10 days.");
    }
  };
 let hop = props.backend;
 console.log(hop)

  return (
    <div className="w-full p-4 flex">
      <div className='w-full xl:w-[75%] mr-8'> 
        <h2 className='pl-4 text-[1.4rem] font-bold'>Discover</h2>
        <ul className='  grid grid-cols-1 md:grid-cols-2' >
          {props.displayedBooks.map((book, index) => (
            <li key={index} className='flex h-[15rem] p-5 bg-white m-4 shadow-sm '>
              <img src={book.image_link} alt={book.title} className='w-[10rem] pr-4 cursor-pointer' onClick={()=>reftoAbout(book.title,book.authors,book.desc,book.image_link,book.rented,book.stock)} />
              <div>
                <span className='font-bold'>{book.title}</span>
                <p className='text-[80%] py-4 font-semibold'>{book.authors}</p>
                <h5 className='h-[3.8rem] overflow-hidden text-[80%]'>{book.desc}</h5>
                <button
                  className='text-[#282E48] bg-white border border-[#282E48] px-4 my-8 rounded-sm hover:border  hover:bg-[#282E48] hover:text-white'
                  onClick={() => handleRent(book)} 
                >
                  Rent
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
     
      <div className='hidden xl:block h-[25rem] w-[17rem] text-center text-[1.4rem] mr-10 pt-2 font-bold mt-3 '>
                <div className='relative bottom-3'>New on the shelf</div>
      <div  className=' bg-white text-[1rem] font-normal w-[19rem]'>
        
        {hop.slice(-5).map((item, index )  => {
            
            return (
              <div key={index} className='px-4 cursor-pointer  hover:bg-gray-200 ' onClick={()=>reftoAbout(item.title,item.authors,item.desc,item.image_link,item.rented,item.stock)}>
                <div className='text-[1rem] font-semibold'>{item.title}</div>
                <div className='overflow-hidden h-[3rem] text-[90%]'>{item.desc}</div>
                <hr className='my-3' />
              </div>
             
            );
          })}
      </div>
      </div>
     

    </div>
    
  );
}

export default Displayedbooks;
