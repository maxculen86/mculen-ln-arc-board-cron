import React from 'react';

const Rss = props => {
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
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 3C12.941 3 21 11.059 21 21H18C18 12.716 11.284 6 3 6V3ZM3 10C9.075 10 14 14.925 14 21H11C11 16.5817 7.41828 13 3 13V10ZM3 17C5.20914 17 7 18.7909 7 21H3V17Z"
                fill="#272727"
            />
        </svg>
    );
};

export default Rss;
