import React from 'react';
import PropTypes from 'prop-types';
import ComLogo from './com-logo';

import '../../../resources/dist/css/ln/modules/mod-promo.css';

const ModPromo = ({
    tag,
    link,
    logoName,
    logoSize,
    text,
    textButton,
    classCondition,
    isStatic
}) => {
    const CustomTag = tag || 'section';

    return (
        <CustomTag className={`mod-promo ${classCondition || ''}`}>
            <a href={link} title={text} className="link">
                <div>
                    <ComLogo
                        logoName={logoName}
                        size={logoSize || '--md'}
                        color
                        isStatic={isStatic}
                    />
                    {text && <p className="com-text --twoxs">{text}</p>}
                </div>
                <span className="com-button --secondary">
                    {textButton || 'INGRESAR'}
                </span>
            </a>
        </CustomTag>
    );
};

ModPromo.propTypes = {
    tag: PropTypes.string,
    link: PropTypes.string.isRequired,
    logoName: PropTypes.string,
    logoSize: PropTypes.string,
    text: PropTypes.string,
    textButton: PropTypes.string,
    classCondition: PropTypes.string,
    isStatic: PropTypes.bool
};

ModPromo.defaultProps = {
    tag: null,
    logoName: null,
    logoSize: null,
    text: null,
    textButton: null,
    classCondition: null,
    isStatic: true
};

export default ModPromo;
