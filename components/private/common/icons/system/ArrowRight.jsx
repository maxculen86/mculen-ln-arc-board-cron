import React from 'react';

const ArrowRight = props => {
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
                d="M13.172 12L8.92899 7.75699C8.53852 7.36652 8.53852 6.73345 8.92898 6.34299V6.34299C9.31945 5.95252 9.95252 5.95252 10.343 6.34299L15.2929 
                11.2929C15.6834 11.6834 15.6834 12.3166 15.2929 12.7071L10.343 17.657C9.95252 18.0475 9.31945 18.0475 8.92899 17.657V17.657C8.53852 17.2665 
                8.53852 16.6335 8.92899 16.243L13.172 12Z"
                fill="#272727"
            />
        </svg>
    );
};

export default ArrowRight;
