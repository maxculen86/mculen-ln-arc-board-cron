import React from 'react';
import PropTypes from 'prop-types';
import '../../../resources/dist/css/ln/components/com-icon.css';
import ComText from './text';

const ComIco = props => {
    const { iconName, textname, style, sizeBullet, sizeText, sizeIcon } = props;

    if (!iconName) return null;
    const icon = (
        <i
            className={`com-icon ${
                iconName === 'bullet' ? iconName : ''
            } icon-${iconName} ${sizeIcon || ''} ${sizeBullet || ''}`}
            style={style}
        />
    );
    if (iconName === 'bullet') return icon;

    return (
        <>
            {icon}
            {textname ? (
                <ComText size={sizeText || ''}>{textname}</ComText>
            ) : (
                ''
            )}
        </>
    );
};

ComIco.propTypes = {
    iconName: PropTypes.string.isRequired,
    textname: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.any),
    sizeBullet: PropTypes.string,
    sizeText: PropTypes.string,
    sizeIcon: PropTypes.string
};

ComIco.defaultProps = {
    textname: '',
    style: undefined,
    sizeBullet: '',
    sizeText: '',
    sizeIcon: ''
};

export default ComIco;
