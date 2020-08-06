import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-icon.css';

const ComIco = props => {
    const { iconName, size } = props;

    if (!iconName) return null;
    return <i className={`com-icon icon-${iconName} ${size ? size : ``}`} />;
};

ComIco.propTypes = {
    iconName: PropTypes.string.isRequired,
    size: PropTypes.string
};

export default ComIco;
