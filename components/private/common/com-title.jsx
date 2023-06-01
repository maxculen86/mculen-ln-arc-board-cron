import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';
import setClassName from './utils/setClassName';

// import '../../../resources/dist/css/ln/components/com-title.css';
// import '../../../resources/dist/css/ln/components/com-lead.css';

const ComTitle = ({
    lead,
    tag,
    size,
    font,
    weight,
    content,
    classCondition,
    link,
    preTitle,
    customTitle,
    style = undefined
}) => {
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
        style: style && style,
        className: classes,
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
    font: PropTypes.string,
    weight: PropTypes.string,
    content: PropTypes.string.isRequired,
    classCondition: PropTypes.string,
    link: PropTypes.string,
    preTitle: PropTypes.string,
    customTitle: PropTypes.string,
    style: PropTypes.shape({
        color: PropTypes.string
    })
};

ComTitle.defaultProps = {
    lead: undefined,
    tag: 'h4',
    size: undefined,
    font: '',
    weight: undefined,
    classCondition: undefined,
    link: undefined,
    preTitle: '',
    customTitle: '',
    style: undefined
};

export default ComTitle;
