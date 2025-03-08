import React, { useEffect, useState } from 'react';
import './Userinfo.css';

function Userinfo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/getUsersWithRentedBooks')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data); 
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
    
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="user-info">
      <h1>User Information</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Rented Books</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => 
            user.rentedBooks.map((book, index) => (
              <tr key={book._id}>
                {index === 0 && (
                  <>
                    <td rowSpan={user.rentedBooks.length}>{user._id}</td>
                    <td rowSpan={user.rentedBooks.length}>{user.curr_user}</td>
                  </>
                )}
                <td>{book.title}</td>
                <td>{book.dueDate}</td>
              </tr>
             



















             
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Userinfo;
