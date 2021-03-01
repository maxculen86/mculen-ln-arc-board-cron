import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';

import '../../../resources/dist/css/ln/components/com-title.css';
import '../../../resources/dist/css/ln/components/com-lead.css';

const ComTitle = ({ lead, tag, size, content, classCondition, link }) => {
    if (!content) return null;

    const ALLOWED_TAGS = ['h1', 'h2', 'h3', 'h4'];
    const SIZE_CLASS = size ? ` ${size}` : '';
    const EXTRA_CLASS = classCondition ? ` ${classCondition}` : '';

    const linkComponent = link && (
        <ComLink link={link} classCondition={classCondition}>
            {lead && <em className="com-lead">{`${lead} `}</em>}
            {content}
        </ComLink>
    );

    const _props = {
        className: `com-title${SIZE_CLASS}${EXTRA_CLASS}`,
        ...(!linkComponent && { dangerouslySetInnerHTML: { __html: content } }),
        ...(linkComponent && { children: linkComponent })
    };

    return React.createElement(
        (ALLOWED_TAGS.includes(tag.toLowerCase()) && tag) || 'h2',
        { ..._props }
    );
};

ComTitle.propTypes = {
    lead: PropTypes.string,
    tag: PropTypes.string,
    size: PropTypes.string,
    content: PropTypes.string.isRequired,
    classCondition: PropTypes.string,
    link: PropTypes.string
};

ComTitle.defaultProps = {
    lead: undefined,
    tag: 'h2',
    size: undefined,
    classCondition: undefined,
    link: undefined
};

export default ComTitle;
