/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';

const Bookmark = props => {
    const { className, ...r } = props;

    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...r}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.333374 6.99992C0.333374 10.6819 3.31804 13.6666 7.00004 13.6666C10.682 13.6666 13.6667 10.6819 13.6667 6.99992C13.6667 3.31792 10.682 0.333252 7.00004 0.333252C3.31804 0.333252 0.333374 3.31792 0.333374 6.99992ZM7.00004 4.99992C6.63185 4.99992 6.33337 4.70144 6.33337 4.33325C6.33337 3.96506 6.63185 3.66659 7.00004 3.66659C7.36823 3.66659 7.66671 3.96506 7.66671 4.33325C7.66671 4.70144 7.36823 4.99992 7.00004 4.99992ZM7.66671 6.99992V9.66659C7.66671 10.0348 7.36823 10.3333 7.00004 10.3333C6.63185 10.3333 6.33337 10.0348 6.33337 9.66659V6.99992C6.33337 6.63173 6.63185 6.33325 7.00004 6.33325C7.36823 6.33325 7.66671 6.63173 7.66671 6.99992Z"
                fill="#0250C9"
            />
        </svg>
    );
};
Bookmark.propTypes = {
    className: PropTypes.string
};
Bookmark.defaultProps = {
    className: ''
};
export default Bookmark;
