import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/components/com-text.css';

const ComText = props => {
    const { children, textname, classCondition, tag, size } = props;

    if (tag === 'h1')
        return (
            <h1 className={`com-title ${size || ''} ${classCondition || ''}`}>
                {children}
            </h1>
        );
    if (tag === 'h2')
        return (
            <h2
                className={`com-title --section ${size ||
                    ''} ${classCondition || ''}`}
            >
                {children}
            </h2>
        );
    if (tag === 'h3')
        return (
            <h3
                className={`com-title --section ${size ||
                    ''} ${classCondition || ''}`}
            >
                {children}
            </h3>
        );
    if (tag === 'h4')
        return (
            <h4
                className={`com-subtitle --module ${size ||
                    ''} ${classCondition || ''}`}
            >
                {children}
            </h4>
        );

    return (
        <span className={`com-text ${size || ''} ${classCondition || ''}`}>
            {children || ``}
            {textname || ``}
        </span>
    );
};

ComText.propTypes = {
    children: PropTypes.string,
    textname: PropTypes.string,
    classCondition: PropTypes.string,
    tag: PropTypes.string,
    size: PropTypes.string
};

export default ComText;
