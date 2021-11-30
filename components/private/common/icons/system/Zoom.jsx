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
                d="M14 1C14 0.447715 14.4477 0 15 0H20V4C20 4.55228 19.5523 5 19 5C18.4477 5 18 4.55228 18 4V2H15C14.4477 2 14 1.55228 14 1ZM5 0C5.55228 0 6 0.447715 6 1C6 1.55228 5.55228 2 5 2H2V4C2 4.55228 1.55228 5 1 5C0.447715 5 0 4.55228 0 4V0H5ZM15 17C14.4477 17 14 16.5523 14 16C14 15.4477 14.4477 15 15 15H18V13C18 12.4477 18.4477 12 19 12C19.5523 12 20 12.4477 20 13V17H15ZM6 16C6 16.5523 5.55228 17 5 17H0V13C0 12.4477 0.447715 12 1 12C1.55228 12 2 12.4477 2 13V15H5C5.55228 15 6 15.4477 6 16Z"
                fill="#272727"
            />
        </svg>
    );
};

export default Zoom;
