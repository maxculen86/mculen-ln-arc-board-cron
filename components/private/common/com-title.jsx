import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/components/com-title.css';

const ComTitle = props => {
    const { children, tag, classCondition, size } = props;
    if (tag === 'h1')
        return (
            <h1 className={`com-title --${size} ${classCondition || ''}`}>
                {children}
            </h1>
        );
    if (tag === 'h2')
        return (
            <h2 className={`com-title --${size} ${classCondition || ''}`}>
                {children}
            </h2>
        );
    if (tag === 'h3')
        return (
            <h3 className={`com-title --${size} ${classCondition || ''}`}>
                {children}
            </h3>
        );
    if (tag === 'h4')
        return (
            <h4 className={`com-title --${size} ${classCondition || ''}`}>
                {children}
            </h4>
        );
    return <></>;
};

ComTitle.propTypes = {
    children: PropTypes.elementType.isRequired,
    tag: PropTypes.string,
    size: PropTypes.string,
    classCondition: PropTypes.string
};

export default ComTitle;
