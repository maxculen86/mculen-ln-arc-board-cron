import React from 'react';
import '../../../resources/dist/css/ln/components/com-icon.css';

const ComIco = props => {
    const { iconName, size } = props;

    if (!iconName) return null;
    return <i className={`com-icon icon-${iconName} ${size ? size : ``}`} />;
};

export default ComIco;
