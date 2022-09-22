/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';

const Pause = ({ className = '', ...r }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...r}
        >
            <path
                d="M6 6C6 5.44772 6.44772 5 7 5C7.55228 5 8 5.44772 8 6V18C8 18.5523 7.55228 19 7 19C6.44772 19 6 18.5523 6 18V6ZM16 6C16 5.44772 16.4477 5 17 5C17.5523 5 18 5.44772 18 6V18C18 18.5523 17.5523 19 17 19C16.4477 19 16 18.5523 16 18V6Z"
                fill="#272727"
            />
        </svg>
    );
};
Pause.propTypes = {
    className: PropTypes.string
};
export default Pause;
