import React from 'react';
import PropTypes from 'prop-types';
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
            {/* {iconName === '--bullet' && (
                <i
                    className={`com-icon bullet icon-${iconName} ${sizeIcon ||
                        ''} ${sizeBullet || ''} `}
                    style={style}
                />
            )} */}
            <ComTitle
                tag="h3"
                content={content}
                link={link}
                preTitle="Noticias de "
                size={sizeText || ''}
                //classCondition={classCondition}
                classCondition={`${classCondition} ${iconName || ''}`}
            />
        </>
    );
};

ComTag.propTypes = {
    iconName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    content: PropTypes.string,
    style: PropTypes.node,
    sizeBullet: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
