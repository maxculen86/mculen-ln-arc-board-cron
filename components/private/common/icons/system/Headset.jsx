/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';

const Headset = ({ className = '', ...r }) => {
    return (
        <svg
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...r}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 10.001H5C6.10457 10.001 7 10.8964 7 12.001V17.001C7 18.1056 6.10457 19.001 5 19.001H2C0.89543 19.001 0 18.1056 0 17.001V10.001C0 
                4.47801 4.477 0.00100708 10 0.00100708C15.523 0.00100708 20 4.47801 20 10.001V17.001C20 18.1056 19.1046 19.001 18 19.001H15C13.8954 
                19.001 13 18.1056 13 17.001V12.001C13 10.8964 13.8954 10.001 15 10.001H18C18 5.58273 14.4183 2.00101 10 2.00101C5.58172 2.00101 2 5.58273 2 10.001Z"
                fill="#FEFEFE"
            />
        </svg>
    );
};
Headset.propTypes = {
    className: PropTypes.string
};

export default Headset;
