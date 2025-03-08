import React, { useEffect, useState } from 'react';

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User Information</h1>
      <table style={{ width: '90%', borderCollapse: 'collapse' }} className='mx-auto'>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>User  ID</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Username</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Rented Books</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return user.rentedBooks.map((book, index) => (
              <tr key={book._id}>
                {index === 0 && (
                  <>
                    <td style={{ border: '1px solid black', padding: '8px' }} rowSpan={user.rentedBooks.length}>
                      {user._id}
                    </td>
                    <td style={{ border: '1px solid black', padding: '8px' }} rowSpan={user.rentedBooks.length}>
                      {user.curr_user}
                    </td>
                  </>
                )}
                <td style={{ border: '1px solid black', padding: '8px' }}>{book.title}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{book.dueDate}</td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Userinfo;