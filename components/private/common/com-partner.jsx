import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-partner.css';

const ComPartner = props => {
    const { children, classCondition, size } = props;

    return (
        <span className={`com-partner ${classCondition || ''} ${size || ''}`}>
            {children}
        </span>
    );
};

ComPartner.propTypes = {
    children: PropTypes.node.isRequired,
    classCondition: PropTypes.string,
    size: PropTypes.string
};

ComPartner.defaultProps = {
    classCondition: '',
    size: ''
};

export default ComPartner;
