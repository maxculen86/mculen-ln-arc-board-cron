import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-icon.css';
import ComText from './text';

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
                        <ComText size={sizeText || ''}>{textname}</ComText>
                    ) : (
                        ''
                    )}
                </>
            )}
        </>
    );
};

ComIco.propTypes = {
    iconName: PropTypes.string,
    textname: PropTypes.string,
    style: PropTypes.string,
    sizeBullet: PropTypes.string,
    sizeText: PropTypes.string,
    sizeIcon: PropTypes.string
};

export default ComIco;
