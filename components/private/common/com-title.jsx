import React from 'react';
import '../../../src/statics/LN/css/components/_com-title.scss';

const ComTitle = props => {
    const {
        children,
        tag,
        classCondition,
        size,
        prefix,
        label,
        basic,
        data,
        content
    } = props;
    if (tag === 'h1')
        return (
            <h1
                className={`com-title --${size} ${
                    classCondition ? classCondition : ''
                }`}
            >
                {prefix}
                {label}
                {basic}
            </h1>
        );
    else if (tag === 'h2')
        return (
            <h2
                className={`com-title --${size} ${
                    classCondition ? classCondition : ''
                }`}
                dangerouslySetInnerHTML={{ __html: data.content }}
            />
        );
    else if (tag === 'h3')
        return (
            <h3
                className={`com-title --${size} ${
                    classCondition ? classCondition : ''
                }`}
                dangerouslySetInnerHTML={{ __html: data.content }}
            />
        );
    else tag === 'h4';
    return (
        <h4
            className={`com-title --${size} ${
                classCondition ? classCondition : ''
            }`}
            dangerouslySetInnerHTML={{ __html: data.content }}
        />
    );
};

export default ComTitle;
