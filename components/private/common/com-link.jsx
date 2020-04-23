import React from 'react';
// import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-link.css';

const ComLink = props => {
    const { children, link, textname, target, title, classCondition } = props;

    if (!link)
        return (
            <span className={`com-text ${classCondition || ''}`}>
                {textname}
            </span>
        );
    return (
        <a
            href={link}
            rel={target === '_blank' && 'nonoopener noreferrer'}
            target={target}
            title={title}
            className={`com-link ${classCondition || ''}`}
        >
            {children || textname}
        </a>
    );
};

// ComLink.propTypes = {
//     children: PropTypes.oneOf([
//         PropTypes.arrayOf(PropTypes.node),
//         PropTypes.string
//     ]).isRequired,
//     link: PropTypes.string.isRequired,
//     textname: PropTypes.string.isRequired,
//     blank: PropTypes.string.isRequired,
//     classCondition: PropTypes.string
// };

export default ComLink;
