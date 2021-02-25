import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-icon.css';
import ComText from './com-text';
import ComLink from './com-link';

const ComTag = props => {
    const {
        iconName,
        textname,
        style,
        sizeBullet,
        sizeText,
        sizeIcon,
        link,
        classCondition
    } = props;

    if (!textname) return null;
    return (
        <ComLink classCondition={classCondition} link={link}>
            {iconName == 'bullet' ? (
                <>
                    <i
                        className={`com-icon bullet icon-${iconName} ${sizeIcon ||
                            ''} ${sizeBullet || ''} `}
                        style={style}
                    />
                    {textname ? (
                        <ComText textname={textname} size={sizeText || ''} />
                    ) : (
                        ''
                    )}
                </>
            ) : (
                <>
                    {textname ? (
                        <ComText textname={textname} size={sizeText || ''} />
                    ) : (
                        ''
                    )}
                </>
            )}
        </ComLink>
    );
};

ComTag.propTypes = {
    iconName: PropTypes.string.isRequired,
    size: PropTypes.string
};

export default ComTag;
