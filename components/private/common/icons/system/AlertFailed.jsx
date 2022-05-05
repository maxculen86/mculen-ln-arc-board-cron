/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';

const AlertFailed = props => {
    const { className, ...r } = props;

    return (
        <svg
            width="15"
            height="13"
            viewBox="0 0 15 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...r}
        >
            <path
                d="M8.26131 0.333304L14.612 11.3333C14.6705 11.4346 14.7013 11.5496 14.7013 11.6666C14.7013 11.7837 14.6705 11.8986 14.612 12C14.5535 12.1013 14.4693 12.1855 14.368 12.244C14.2666 12.3025 14.1517 12.3333 14.0346 12.3333H1.33331C1.21628 12.3333 1.10132 12.3025 0.999979 12.244C0.898635 12.1855 0.814479 12.1013 0.755969 12C0.697458 11.8986 0.666656 11.7837 0.666656 11.6666C0.666657 11.5496 0.697461 11.4346 0.755973 11.3333L7.10664 0.333304C7.16515 0.231966 7.24931 0.147815 7.35065 0.0893078C7.452 0.030801 7.56695 0 7.68397 0C7.80099 0 7.91595 0.030801 8.01729 0.0893078C8.11863 0.147815 8.20279 0.231966 8.26131 0.333304ZM7.01731 8.99997V10.3333H8.35064V8.99997H7.01731ZM7.01731 4.3333V7.66664H8.35064V4.3333H7.01731Z"
                fill="#C6480C"
            />
        </svg>
    );
};

AlertFailed.propTypes = {
    className: PropTypes.string
};
AlertFailed.defaultProps = {
    className: ''
};

export default AlertFailed;
