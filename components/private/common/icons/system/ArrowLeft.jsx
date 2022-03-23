import React from 'react';

const ArrowLeft = props => {
    const { className, ...r } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={className}
            {...r}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.828 12.364L15.071 16.607C15.4615 16.9975 15.4615 17.6305 15.071 18.021C14.6805 18.4115 14.0475 18.4115 13.657 18.021L8.70711 13.0711
                C8.31658 12.6806 8.31658 12.0474 8.70711 11.6569L13.657 6.707C14.0475 6.31653 14.6805 6.31653 15.071 6.707C15.4615 7.09747 15.4615 7.73053 
                15.071 8.121L10.828 12.364Z"
                fill="#272727"
            />
        </svg>
    );
};

export default ArrowLeft;
