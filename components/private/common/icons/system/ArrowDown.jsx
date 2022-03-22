import React from 'react';

const ArrowDown = props => {
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
                d="M12.364 12.95L16.607 8.707C16.9975 8.31654 17.6305 8.31653 18.021 8.707C18.4115 9.09747 18.4115 9.73053 18.021 10.121L13.0711 15.0709C12.6806 
                15.4614 12.0474 15.4614 11.6569 15.0709L6.707 10.121C6.31653 9.73053 6.31653 9.09747 6.707 8.707C7.09747 8.31653 7.73053 8.31653 8.121 8.707
                L12.364 12.95Z"
                fill="#272727"
            />
        </svg>
    );
};

export default ArrowDown;
