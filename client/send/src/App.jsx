import React, { useState, useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import Displayedbooks from './components/displayedbooks';
import Chart_fill from './assets/Chart_fill.png';
import User from './assets/User.png';
import Chat from './assets/Chat.png';
import Setting from './assets/Setting.png';
import Sidebar from './components/sidebar';
import Searchbar from './components/searchbar';
import Pagination from './components/pagination';
import About from './components/About'
import Register from './components/register';
import BookManagement from './components/admin';
import Aboutbooks  from './components/aboutbooks';
import Userinfo from './components/userinfo';
import Status from  './components/status';
import emailjs from 'emailjs-com'; 
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from 'react-router-dom'


function App() {
const navigate = useNavigate();
  const [backend, setBackend] = useState([]);
  const [open, setOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);  
  const booksPerPage = 8;  
  const [rentedBooks, setRentedBooks] = useState([]);
  const [status,setstatus] =useState('');


  useEffect(() => {
    fetch("/getbooks")
      .then(response => response.json())
      .then(data => setBackend(data))
      .catch(error => console.error("Error fetching books:", error));
  }, []);

  const menus = [
    { title: "Dashboard", src: Chart_fill },
    { title: "Inbox", src: Chat },
    { title: "Account", src: User },
    { title: "Setting", src: Setting },
  ];
  const displayedBooks =[
  
  ]
  const allBooks = [...displayedBooks, ...backend];

  const onSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };
  const [admin,setadmin]= useState(false);

  const filteredBooks = allBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredBooks.length / booksPerPage)) {
      setCurrentPage(prev =>prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  const handleRent = async (book, rentDays) => {
    console.log(book.stock);
  
    if (book.stock <= 0) {
      setstatus('Failed')
      navigate('/status' ,{state:{title:book.title}})

        return;
    }

    const currentDate = new Date();
    const dueDate = new Date(currentDate);
    dueDate.setDate(dueDate.getDate() + Number(rentDays));

    let curr_user = '';
    try {
        const userResponse = await fetch('http://localhost:3000/getcurr');
        if (!userResponse.ok) {
            throw new Error('Failed to fetch current user');
        }
        const currData = await userResponse.json();
        curr_user = currData[currData.length - 1]?.curr_user || 'Guest';

        const rentalData = {
            curr_user: curr_user,
            title: book.title,
            rentDate: currentDate.toLocaleDateString(),
            dueDate: dueDate.toLocaleDateString(),
        };

        const response = await fetch('http://localhost:3000/adduserdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rentalData),
        });

        if (!response.ok) {
            throw new Error('Failed to add rental data');
        }
        setstatus('Success')
        navigate('/status', { state: { title: book.title,rentDays ,status: 'Success'} });
      
    
        setRentedBooks(prev => [...prev, rentalData]);
        
    } catch (error) {
        alert("Error renting book: " + error.message);
    }
};


  return (
   
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex">
              <Sidebar menus={menus} open={open} setOpen={setOpen} />
              <div className={`flex flex-col flex-1 bg-gray-100 min-h-max transition-all duration-300 ${open ? 'ml-72' : 'ml-20'}`}>
                <div className="flex items-center mb-4">
                  <Searchbar onsearch={onSearch} />
                </div>
  
                <Displayedbooks displayedBooks={currentBooks} onRent={handleRent} backend = {backend}className={admin?'hidden':'' } />       
                        
                <Pagination
                  currentPage={currentPage}
                  prevPage={prevPage}
                  nextPage={nextPage}
                  filteredBooks={filteredBooks}
                  booksPerPage={booksPerPage}
                />

              </div>
            </div>
          }
        />
        <Route path='/about' element={
            <About backend={backend} setBackend={setBackend}/>
        }/>
        <Route path='/register' element ={
             <Register/>
        }/>
       <Route path='/admin' element ={
             <BookManagement setOpen={setOpen} admin={admin} open={open} />
        }/>
        <Route path='/aboutThisBook' element={
          <Aboutbooks onRent={handleRent} />
        }/>
      <Route path='aboutusers' element ={
        <Userinfo/>
      }/>
       <Route path='status' element ={
        <Status/>
      }/>
        
      </Routes>
  
  );
}

export default App;
