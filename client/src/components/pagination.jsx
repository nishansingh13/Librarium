import React from 'react'

function Pagination({currentPage,prevPage,filteredBooks,nextPage,booksPerPage}) {
  return (
    <>
      <div className="pagination-controls flex justify-center items-center mt-4 pb-8">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 1} 
            className="px-4 py-2 mx-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
          >
            Previous
          </button>
          <span>Page {currentPage} of {Math.ceil(filteredBooks.length / booksPerPage)}</span>
          <button 
            onClick={nextPage} 
            disabled={currentPage === Math.ceil(filteredBooks.length / booksPerPage)} 
            className="px-4 py-2 mx-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
          >
          Next
          </button>
        </div></>
  )
}

export default Pagination