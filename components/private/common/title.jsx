import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ className, title }) => {
    return <h3 className={className}>{title}</h3>;
};

Title.propTypes = {
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default Title;
