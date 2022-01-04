import React from 'react';
import PropTypes from 'prop-types';
import '../../../resources/dist/css/ln/components/com-icon.css';
import '../../../resources/dist/css/ln/components/com-bullet.css';
import ComTitle from './com-title';

const ComTag = props => {
    const { iconName, content, sizeText, link, classCondition } = props;

    if (!content) return null;
    return (
        <>
            <ComTitle
                tag="h3"
                content={content}
                link={link}
                preTitle="Noticias de "
                size={sizeText || ''}
                classCondition={`${classCondition} ${iconName || ''}`}
            />
        </>
    );
};

ComTag.propTypes = {
    iconName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    content: PropTypes.string,
    sizeText: PropTypes.string,
    link: PropTypes.string,
    classCondition: PropTypes.string
};

ComTag.defaultProps = {
    iconName: undefined,
    content: undefined,
    sizeText: undefined,
    link: undefined,
    classCondition: undefined
};

export default ComTag;
