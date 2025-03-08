import React, { useState, useEffect } from 'react';
import './about.css';
import Sidebar from './sidebar';
import App from '../App';
function About({ setBackend, backend },props) {
    const apiKey = 'AIzaSyCcM6CBdb3fPaL5hNuNNX0HX_Z_NicfZK0';
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setQuery(event.target.value);
        }
    };

    useEffect(() => {
        if (query) {
            const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=en&maxResults=10&key=${apiKey}`;
            
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const formattedBooks = data.items?.map((i) => ({
                        title: i.volumeInfo.title || 'Title not available',
                        authors: i.volumeInfo.authors ? i.volumeInfo.authors.join(', ') : 'Author not specified',
                        image_link: i.volumeInfo.imageLinks ? i.volumeInfo.imageLinks.thumbnail : 'Image not available',
                        desc: i.volumeInfo.description || 'No description available',
                        rented: 0 // Rented is set to 0 initially
                    })) || [];
                    
                    setSearchResults(formattedBooks);
                })
                .catch((err) => console.log(err));
        }
    }, [query]);

    const addToBackend = (book) => {
        const exists = backend.some(b => b.title === book.title && b.authors === book.authors);
        
        if (exists) {
            alert(`"${book.title}" is already in the backend.`);
            return;
        }

        const stock = prompt("Enter stock quantity:", "5");
        if (stock === null || isNaN(stock)) {
            alert("Invalid stock quantity.");
            return;
        }

        const bookWithStock = { ...book, stock: parseInt(stock) };

        fetch('http://localhost:3000/addBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookWithStock),
        })
        .then(response => {
            if (response.ok) {
                alert(`"${book.title}" added successfully with ${stock} in stock.`);
                setBackend([...backend, bookWithStock]); // Update frontend state if needed
            } else {
                alert(`Failed to add "${book.title}".`);
            }
        })
        .catch((err) => console.log("Error:", err));
    };

    return (
        < >
        
        <div className='p-5' >
            
            <h1 className='text-[2rem] font-semibold'>Add Books</h1>
            <input
                type="text"
                onKeyDown={handleKeyDown}
                placeholder="Search for books"
                className="p-2 border border-gray-400 rounded my-4"
            />
            <button className="ml-2 py-2 px-3 bg-blue-500 text-white rounded font-black"> + </button>
           
          
            <div className="search-results ">
                {searchResults.length > 0 ? (
                    searchResults.map((book, index) => (
                        <div key={index} className="book-item mx-64 my-4 p-4 border border-gray-200 rounded shadow-lg shadow-black-500/50">
                            <h3 className="text-lg font-bold">{book.title}</h3>
                            <p><strong>Author(s):</strong> {book.authors}</p>
                            <img src={book.image_link} alt={book.title} className="my-2" />
                            <p>{book.desc}</p>
                            <button
                                onClick={() => addToBackend(book)}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Add to Backend
                            </button>
                        </div>
                    ))
                ) : (
                    <div className='notfound'></div>
                    

                )} 
            </div>
            </div>
        </>
    );
}

export default About;
