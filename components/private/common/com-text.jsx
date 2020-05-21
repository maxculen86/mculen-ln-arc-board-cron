import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/components/com-text.css';

const ComText = props => {
    const { children, textname, classCondition, tag, size } = props;
    //if (!textname) return null;

    if (tag === 'h1')
        return (
            <h1
                className={`com-title ${size} ${
                    classCondition ? classCondition : ''
                }`}
            >
                {children}
            </h1>
        );
    else if (tag === 'h2')
        return (
            <h2
                className={`com-title --section ${size} ${
                    classCondition ? classCondition : ''
                }`}
            >
                {children}
            </h2>
        );
    else if (tag === 'h3')
        return (
            <h3
                className={`com-title --section ${size} ${
                    classCondition ? classCondition : ''
                }`}
            >
                {children}
            </h3>
        );
    else if (tag === 'h4')
        return (
            <h4
                className={`com-subtitle --module ${size} ${
                    classCondition ? classCondition : ''
                }`}
            >
                {children}
            </h4>
        );

    return (
        <span className={`com-text ${classCondition ? classCondition : ''}`}>
            {children || textname}
        </span>
    );
};

ComText.propTypes = {
    textname: PropTypes.string,
    classCondition: PropTypes.string,
    tag: PropTypes.string,
    size: PropTypes.string
};

export default ComText;
