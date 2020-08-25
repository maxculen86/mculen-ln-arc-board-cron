/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-link.css';
import '../../../resources/dist/css/ln/components/com-text.css';

const ComLink = props => {
    const {
        children,
        link,
        textname,
        target,
        title,
        classCondition,
        size
    } = props;

    return (
        <>
            {link ? (
                <a
                    href={link}
                    rel={target === '_blank' && 'nonoopener noreferrer'}
                    target={target}
                    title={title}
                    className={`com-link ${classCondition || ''}`}
                >
                    {children || textname}
                </a>
            ) : (
                <span className={`com-text ${classCondition || ''}`}>
                    {children || textname}
                </span>
            )}
        </>
    );
};

ComLink.propTypes = {
    children: PropTypes.oneOf([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.string
    ]).isRequired,
    link: PropTypes.string.isRequired,
    textname: PropTypes.string.isRequired,
    title: PropTypes.string,
    target: PropTypes.string,
    classCondition: PropTypes.string
};

export default ComLink;
