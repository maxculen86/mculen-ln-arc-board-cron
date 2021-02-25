import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-icon.css';
import ComText from './com-text';
import ComLink from './com-link';
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
            {iconName == 'bullet' ? (
                <>
                    <i
                        className={`com-icon bullet icon-${iconName} ${sizeIcon ||
                            ''} ${sizeBullet || ''} `}
                        style={style}
                    />
                    <ComTitle
                        tag="h3"
                        content={content}
                        link={link}
                        size={sizeText || ''}
                        classCondition={classCondition}
                    />
                </>
            ) : (
                <>
                    <ComTitle
                        tag="h3"
                        content={textname}
                        link={link}
                        size={sizeText || ''}
                        classCondition={classCondition}
                    />
                </>
            )}
        </>
    );
};

ComTag.propTypes = {
    iconName: PropTypes.string.isRequired,
    size: PropTypes.string
};

export default ComTag;
