import React from 'react'
import { useEffect } from 'react';
function Mail() {
    useEffect(() => {
        fetch("http://localhost:3000/getUsers") 
          .then(response => response.json())
          .then(users => {
            const filteredUsers = users
              .filter(user => user.rentDays <= 2)
              .map(user => ({
                ...user,
                flag: 0
              }));
            
            console.log(filteredUsers); 
          })
          .catch(error => console.error("Error fetching users:", error));
      }, []);
      
  return (
    <div>mail</div>
  )
}

export default Mail