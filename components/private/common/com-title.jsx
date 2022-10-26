import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';

import '../../../resources/dist/css/ln/components/com-title.css';
import '../../../resources/dist/css/ln/components/com-lead.css';

const ComTitle = ({
    lead,
    tag,
    size,
    content,
    classCondition,
    link,
    preTitle,
    customTitle
}) => {
    if (!content) return null;

    const ALLOWED_TAGS = ['h1', 'h2', 'h3', 'h4'];
    const SIZE_CLASS = size ? ` ${size}` : '';
    const EXTRA_CLASS = classCondition ? ` ${classCondition}` : '';

    const _content = lead ? `${lead} ${content}` : `${content}`;

    const _preTitle = preTitle ? `${preTitle} ${_content}` : `${_content}`;

    const _customTitle = customTitle ? `${customTitle}` : `${_preTitle}`;

    const linkComponent = link && (
        <ComLink
            link={link}
            classCondition={classCondition}
            title={_customTitle}
        >
            {lead && <span className="com-lead">{`${lead} `}</span>}
            {content}
        </ComLink>
    );

    const _props = {
        className: `com-title${SIZE_CLASS}${EXTRA_CLASS}`,
        ...(!linkComponent && { dangerouslySetInnerHTML: { __html: content } }),
        ...(linkComponent && { children: linkComponent })
    };

    return React.createElement(
        (ALLOWED_TAGS.includes(tag.toLowerCase()) && tag) || 'h4',
        { ..._props }
    );
};

ComTitle.propTypes = {
    lead: PropTypes.string,
    tag: PropTypes.string,
    size: PropTypes.string,
    content: PropTypes.string.isRequired,
    classCondition: PropTypes.string,
    link: PropTypes.string,
    preTitle: PropTypes.string,
    customTitle: PropTypes.string
};

ComTitle.defaultProps = {
    lead: undefined,
    tag: 'h4',
    size: undefined,
    classCondition: undefined,
    link: undefined,
    preTitle: '',
    customTitle: ''
};

export default ComTitle;
