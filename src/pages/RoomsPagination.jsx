import React from "react";

const RoomsPagination = ({ roomsPerPage, totalRooms, currentPage, paginate }) => {
  const pageNumbers = [];
  
  // Calculate total pages
  const totalPages = Math.ceil(totalRooms / roomsPerPage);
  
  // Logic for displaying page numbers
  const displayPageNumbers = () => {
    // Always show first page, last page, current page, and 1 page before and after current
    const range = [];
    
    // Start with page 1
    range.push(1);
    
    // Calculate start and end of current range
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis after page 1 if needed
    if (start > 2) {
      range.push('...');
    }
    
    // Add pages in current range
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      range.push('...');
    }
    
    // Add last page if there is more than one page
    if (totalPages > 1) {
      range.push(totalPages);
    }
    
    return range;
  };
  
  // Get visible page numbers
  const visiblePageNumbers = displayPageNumbers();
  
  return (
    <nav className="flex justify-center my-8" aria-label="Pagination">
      <ul className="flex items-center space-x-1">
        {/* Previous button */}
        <li>
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-label="Previous page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
        </li>
        
        {/* Page numbers */}
        {visiblePageNumbers.map((number, index) => (
          <li key={index}>
            {number === '...' ? (
              <span className="px-4 py-2">...</span>
            ) : (
              <button
                onClick={() => paginate(number)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === number
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-label={`Page ${number}`}
                aria-current={currentPage === number ? 'page' : undefined}
              >
                {number}
              </button>
            )}
          </li>
        ))}
        
        {/* Next button */}
        <li>
          <button
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-label="Next page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default RoomsPagination;