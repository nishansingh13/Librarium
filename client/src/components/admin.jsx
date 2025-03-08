import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import home from '../assets/home.png';
import User  from '../assets/User.png';
import './admin.css';
import App from  '../App';

const BookManagement = (props) => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalRented, setTotalRented] = useState(0);
    const [totalStock, setTotalStock] = useState(0);
    const menus = [
        
        { title: "Home", src: home },
        { title: "Users",  src: User  },
        { title: "Account",  src: home  },
        { title: "Setting",  src: home  },
      ];

    useEffect(() => {
        fetchBooks();
        updateUserCount();
    }, );

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:3000/getBooks');
            if (!response.ok) throw new Error('Network error');
            const data = await response.json();
            setBooks(data);
            updateCounts(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const updateUserCount = async () => {
        try {
            const response = await fetch('http://localhost:3000/getthis'); 
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setTotalUsers(data.length);
        } catch (error) {
            console.error('Error fetching user count:', error);
        }
    };
    const updateCounts = (data) => {
        const rentCount = data.reduce((total, book) => total + book.rented, 0);
        setTotalRented(rentCount);

        const stockCount = data.reduce((total, book) => total + book.stock, 0);
        setTotalStock(stockCount);
    };

    const handleEditStock = async (book, action) => {
        const stockChange = Number(prompt("Enter stock amount"));
        if (isNaN(stockChange) || stockChange < 0) {
            alert("Invalid stock amount. Please enter a valid number.");
            return;
        }

        let newStock = book.stock;
        if (action === 1) {
            newStock += stockChange; 
        } else if (action === 0) {
            if (newStock < stockChange) {
                alert("Cannot decrease stock below zero.");
                return;
            }
            newStock -= stockChange; 
        }

        await updateBookStock(book._id, newStock);
        fetchBooks(); 
    };

    const updateBookStock = async (id, newStock) => {
        const update = { stock: newStock };
        try {
            const response = await fetch(`http://localhost:3000/upBook/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(update),
            });
            if (!response.ok) throw new Error(`Error updating stock: ${response.statusText}`);
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const deleteBook = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/deleteBook/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert(`Book deleted successfully`);
                fetchBooks(); // Refresh the book list
            } else {
                alert(`Error deleting book: ${response.statusText}`);
            }
        } catch (error) {
            alert(`Error: ${error}`);
        }
    };
    

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm));

    const addBook = () => {
        navigate('/about')
    };

    return (
        
        <>
             <Sidebar menus={menus} open={props.open} setOpen={props.setOpen}/>
           
            <div  className={  props.open?'ml-80 p-4' : 'ml-28 p-4' } >
            <h1 className='text-[2rem] font-sans'>ADMIN PAGE</h1>
            <div className='details'> 
                <div className='details-div p20'>
                <div className='img-vala-div'></div>
                    <div>Total Users: {totalUsers}</div>
                   
                    </div>
                {console.log(totalUsers)}
                <div className='details-div'>Total Rented: {totalRented}</div>
                <div className='details-div'>Total Stock: {totalStock}</div>
            </div>

            <div className='admin-search-book'>
                <input
                    type="text"
                    placeholder="Search for books..."
                    value={searchTerm}
                    className=' border border-gray-500 outline-gray-200 px-4 py-2 rounded-md focus:outline-none'
                    onChange={handleSearch}
                />
                <button onClick={addBook} className='border m-2 px-4 py-2 bg-[#282E48] text-white rounded-sm mr-[5rem]'>Add Book</button>
            </div>
            
            <table className='border border-gray-300 bg-gray-100 mytable'>
                <thead>
                    <tr  className=' border-green-300'>
                        <th className='pl-4'>Sr No</th>
                        <th>Title</th>
                        <th className='p-4'>Stock</th>
                        <th>Rented</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody >
                    {filteredBooks.map((book, index) => (
                        <tr key={book._id}  className=' text-center border border-gray-300'>

                            <td className=' border-gray-300'>{index + 1}</td>
                            <td>{book.title}</td>
                            <td>{book.stock}</td>
                            <td>{book.rented}</td>
                            <td className='p-4'>
                                <button className='border  m-2 px-3 bg-[#282E48] text-white rounded-sm' onClick={() => handleEditStock(book, 1)}>Increase Stock</button>
                                <button className='border  m-2 px-3 bg-[#282E48] text-white rounded-sm' onClick={() => handleEditStock(book, 0)}>Decrease Stock</button>
                                <button className='border  m-2 px-3 bg-[#282E48] text-white rounded-sm'onClick={() => {
                                    const verify = prompt(`To delete "${book.title}", enter 'YES'`);
                                    if (verify === 'YES') {
                                        deleteBook(book._id);
                                    }
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </>
    );
};

export default BookManagement;
