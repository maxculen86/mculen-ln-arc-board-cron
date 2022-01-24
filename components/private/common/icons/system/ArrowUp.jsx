import React from 'react';

const ArrowUp = props => {
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
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 10.828L7.75699 15.071C7.36652 15.4615 6.73345 15.4615 6.34299 15.071C5.95252 14.6805 5.95252 14.0475 6.34299 13.657L11.2929 8.70711
                C11.6834 8.31658 12.3166 8.31658 12.7071 8.70711L17.657 13.657C18.0475 14.0475 18.0475 14.6805 17.657 15.071C17.2665 15.4615 16.6335 15.4615 
                16.243 15.071L12 10.828Z"
                fill="#272727"
            />
        </svg>
    );
};

export default ArrowUp;
