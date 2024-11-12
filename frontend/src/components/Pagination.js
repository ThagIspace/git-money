import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null; // Không hiển thị nếu chỉ có 1 trang hoặc ít hơn

    return (
        <div className="mt-3 d-flex justify-content-center">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    className={`btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
