/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';

const Bookmark = props => {
    const { className, ...r } = props;

    return (
        <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...r}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.66662 6.11475L10.3233 0.457456C10.5836 0.197101 11.0057 0.197016 11.2661 0.457263C11.5267 0.717632 11.5268 1.13994 11.2663 1.4004L5.37372 7.29298C4.9832 7.6835 4.35003 7.6835 3.95951 7.29298L0.895284 4.22875C0.634974 3.96844 0.634973 3.54639 0.895283 3.28608C1.15559 3.02577 1.57764 3.02577 1.83795 3.28608L4.66662 6.11475Z"
                fill="#0D880C"
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
