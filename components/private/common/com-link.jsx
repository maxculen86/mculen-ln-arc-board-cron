import React from 'react';
// import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-link.css';
import ComIco from './com-icon';
import ComText from './com-text';

const ComLink = props => {
    const {
        children,
        link,
        textname,
        target,
        title,
        classCondition,
        iconName,
        size
    } = props;

    if (!link)
        return <ComText classCondition={classCondition}>{children}</ComText>;
    if (iconName)
        return (
            <a
                href={link}
                rel={target === '_blank' && 'nonoopener noreferrer'}
                target={target}
                title={title}
                className={`com-link ${classCondition ? classCondition : ''}`}
            >
                <ComIco iconName={iconName} />
                {children ? children : ``}
            </a>
        );
    return (
        <a
            href={link}
            rel={target === '_blank' && 'nonoopener noreferrer'}
            target={target}
            title={title}
            className={`com-link ${classCondition ? classCondition : ''}`}
        >
            {children}
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
