import React from 'react';

const Twitter = props => {
    const { className, ...r } = props;

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.04545 3H3L10.1344 12.8483L3.38859 20.8823H5.67726L11.1944 14.3115L15.9545 20.8824H22L14.5656 10.6199L20.9637 3H18.6751L13.5055 9.1567L9.04545 3ZM16.8182 19.0941L6.45455 4.78824H8.18182L18.5455 19.0941H16.8182Z"
                fill="#333333"
            />
        </svg>
    );
};

export default Twitter;
