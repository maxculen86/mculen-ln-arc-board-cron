import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';
import '../../../resources/dist/css/ln/components/com-title.css';

const ComTitle = ({
    tag = 'h4',
    classCondition = '',
    size = '',
    link,
    content
}) =>
    React.createElement(
        tag,
        { className: `com-title ${size} ${classCondition}` },
        [
            link ? (
                <ComLink link={link} classCondition={classCondition}>
                    {content}
                </ComLink>
            ) : (
                <>{content}</>
            )
        ]
    );

ComTitle.propTypes = {
    tag: PropTypes.string.tag({ defaultValue: 'h4' }).isRequired,
    classCondition: PropTypes.string.tag({ defaultValue: '' }).isRequired,
    size: PropTypes.string.tag({ defaultValue: '' }).isRequired,
    link: PropTypes.string.tag({ defaultValue: undefined }).isRequired,
    content: PropTypes.string.tag({ defaultValue: '' }).isRequired
};

export default ComTitle;
