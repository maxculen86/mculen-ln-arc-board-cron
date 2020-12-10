import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-icon.css';
import ComText from './com-text';

const ComIco = props => {
    const { iconName, textname, style, sizeBullet, sizeText, sizeIcon } = props;

    if (!iconName) return null;
    return (
        <>
            {iconName == 'bullet' ? (
                <i
                    className={`com-icon bullet icon-${iconName} ${sizeIcon ||
                        ''} ${sizeBullet || ''} `}
                    style={style}
                />
            ) : (
                <>
                    <i
                        className={`com-icon icon-${iconName} ${sizeIcon ||
                            ''} ${sizeBullet || ''} `}
                        style={style}
                    />
                    {textname ? (
                        <ComText textname={textname} size={sizeText || ''} />
                    ) : (
                        ''
                    )}
                </>
            )}
        </>
    );
};

ComIco.propTypes = {
    iconName: PropTypes.string.isRequired,
    size: PropTypes.string
};

export default ComIco;
