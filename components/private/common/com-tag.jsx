import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-icon.css';
import '../../../resources/dist/css/ln/components/com-bullet.css';
import ComTitle from './com-title';

const ComTag = props => {
    const {
        iconName,
        content,
        style,
        sizeBullet,
        sizeText,
        sizeIcon,
        link,
        classCondition
    } = props;

    if (!content) return null;
    return (
        <>
            {iconName === 'bullet' && (
                <i
                    className={`com-icon bullet icon-${iconName} ${sizeIcon ||
                        ''} ${sizeBullet || ''} `}
                    style={style}
                />
            )}
            <ComTitle
                tag="h3"
                content={content}
                link={link}
                size={sizeText || ''}
                classCondition={classCondition}
            />
        </>
    );
};

ComTag.propTypes = {
    iconName: PropTypes.string,
    content: PropTypes.string,
    style: PropTypes.obj,
    sizeBullet: PropTypes.string,
    sizeText: PropTypes.string,
    sizeIcon: PropTypes.string,
    link: PropTypes.string,
    classCondition: PropTypes.string
};

ComTag.defaultProps = {
    iconName: undefined,
    content: undefined,
    style: undefined,
    sizeBullet: undefined,
    sizeText: undefined,
    sizeIcon: undefined,
    link: undefined,
    classCondition: undefined
};

export default ComTag;
