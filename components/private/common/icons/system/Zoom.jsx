import React from 'react';

const Zoom = props => {
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
                d="M16 5C16 4.44772 16.4477 4 17 4H22V8C22 8.55228 21.5523 9 21 9C20.4477 9 20 8.55228 20 8V6H17C16.4477 6 16 5.55228 16 5ZM7 4C7.55228 4 8 
                4.44772 8 5C8 5.55228 7.55228 6 7 6H4V8C4 8.55228 3.55228 9 3 9C2.44772 9 2 8.55228 2 8V4H7ZM17 21C16.4477 21 16 20.5523 16 20C16 19.4477 
                16.4477 19 17 19H20V17C20 16.4477 20.4477 16 21 16C21.5523 16 22 16.4477 22 17V21H17ZM8 20C8 20.5523 7.55228 21 7 21H2V17C2 16.4477 2.44772 
                16 3 16C3.55228 16 4 16.4477 4 17V19H7C7.55228 19 8 19.4477 8 20Z"
                fill="#272727"
            />
        </svg>
    );
};

export default Zoom;
