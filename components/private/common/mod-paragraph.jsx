import React from 'react';
import PropTypes from 'prop-types';
import '../../../resources/dist/css/ln/modules/mod-paragraph.css';

const ModParagraph = props => {
    const { children, classCondition } = props;
    return children ? (
        <blockquote className={`mod-paragraph ${classCondition || ''}`}>
            {children}
        </blockquote>
    ) : null;
};

ModParagraph.propTypes = {
    children: PropTypes.arrayOf(PropTypes.shape({})),
    classCondition: PropTypes.string
};

ModParagraph.defaultProps = {
    children: [],
    classCondition: ''
};

export default ModParagraph;
