import React from 'react';
import '../../../src/statics/LN/css/components/_com-title.scss';

const ComTitle = props => {
    const { children, tag, classCondition, size } = props;
    if (tag === 'h1')
        return (
            <h1
                className={`com-title --${size} ${
                    classCondition ? classCondition : ''
                }`}
            >
                {children}
            </h1>
        );
    else if (tag === 'h2')
        return (
            <h2
                className={`com-title --${size} ${
                    classCondition ? classCondition : ''
                }`}
            >
                {children}
            </h2>
        );
    else if (tag === 'h3')
        return (
            <h3
                className={`com-title --${size} ${
                    classCondition ? classCondition : ''
                }`}
            >
                {children}
            </h3>
        );
    else tag === 'h4';
    return (
        <h4
            className={`com-title --${size} ${
                classCondition ? classCondition : ''
            }`}
        >
            {children}
        </h4>
    );
};

export default ComTitle;
