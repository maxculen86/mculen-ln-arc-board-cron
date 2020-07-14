import React from 'react';
import ComLink from '../common/com-link';
import '../../../src/statics/LN/css/components/_com-title.scss';

const ComTitle = props => {
    const {
        children,
        tag,
        classCondition,
        size,
        prefix,
        label,
        link,
        basic,
        data,
        content
    } = props;
    switch (tag) {
        case 'h1': {
            return (
                <h1
                    className={`com-title --${size} ${
                        classCondition ? classCondition : ''
                    }`}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            );
        }
        case 'h2': {
            return (
                <>
                    {link ? (
                        <ComLink link={link} classCondition={classCondition}>
                            <h2
                                className={`com-title --${size} ${
                                    classCondition ? classCondition : ''
                                }`}
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </ComLink>
                    ) : (
                        <h2
                            className={`com-title --${size} ${
                                classCondition ? classCondition : ''
                            }`}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    )}
                </>
            );
        }
        case 'h3': {
            return (
                <h3
                    className={`com-title --${size} ${
                        classCondition ? classCondition : ''
                    }`}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            );
        }
        case 'h4': {
            return (
                <h4
                    className={`com-title --${size} ${
                        classCondition ? classCondition : ''
                    }`}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            );
        }
        default:
            return (
                <h4
                    className={`com-title --${size} ${
                        classCondition ? classCondition : ''
                    }`}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            );
    }
};

export default ComTitle;
