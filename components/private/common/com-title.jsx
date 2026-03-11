import React from 'react';
import ComLink from './com-link';
import setClassName from './utils/setClassName';
import '../../../resources/dist/css/ln/components/com-title.css';

function ComTitle({
    lead,
    tag = 'h4',
    size,
    font = '',
    weight,
    content,
    classCondition,
    link,
    preTitle = '',
    customTitle = '',
    style
}) {
    if (!content) return null;

    const ALLOWED_TAGS = ['h1', 'h2', 'h3', 'h4'];

    const classes = setClassName({
        baseClass: 'com-title',
        fontFamily: font || '--font-primary',
        size: size || '--l',
        weight: weight || '--font-medium',
        classCondition
    });

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
        style,
        className: classes,
        ...(!linkComponent && { dangerouslySetInnerHTML: { __html: content } }),
        ...(linkComponent && { children: linkComponent })
    };

    return React.createElement(
        (ALLOWED_TAGS.includes(tag.toLowerCase()) && tag) || 'h4',
        { ..._props }
    );
}

export default ComTitle;
