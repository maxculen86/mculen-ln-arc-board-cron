import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ TitleTag = 'h3', className, title }) => {
    return <TitleTag className={className}>{title}</TitleTag>;
};

Title.propTypes = {
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    TitleTag: PropTypes.string
};

export default Title;
