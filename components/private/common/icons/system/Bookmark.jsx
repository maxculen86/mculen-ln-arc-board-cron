/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';

const Bookmark = props => {
    const { className, ...r } = props;

    return (
        <svg
            width="12"
            height="15"
            viewBox="0 0 12 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...r}
        >
            <path
                d="M1.33335 0.333374H10.6667C10.8435 0.333374 11.0131 0.403612 11.1381 0.528636C11.2631 0.65366 11.3334 0.82323 11.3334 1.00004V13.762C11.3334 13.8216 11.3175 13.8802 11.2873 13.9315C11.2571 13.9829 11.2136 14.0252 11.1614 14.0541C11.1093 14.083 11.0504 14.0973 10.9908 14.0957C10.9312 14.094 10.8732 14.0764 10.8227 14.0447L6.00002 11.02L1.17735 14.044C1.12693 14.0757 1.06895 14.0933 1.00942 14.095C0.949898 14.0967 0.891011 14.0824 0.838884 14.0536C0.786756 14.0248 0.743292 13.9826 0.713009 13.9313C0.682726 13.88 0.666731 13.8216 0.666687 13.762V1.00004C0.666687 0.82323 0.736925 0.65366 0.861949 0.528636C0.986974 0.403612 1.15654 0.333374 1.33335 0.333374ZM10 1.66671H2.00002V11.9547L6.00002 9.44737L10 11.9547V1.66671Z"
                fill="#272727"
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
