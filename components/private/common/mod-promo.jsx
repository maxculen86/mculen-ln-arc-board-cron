import React from 'react';
import ComLogo from './com-logo';

import '../../../resources/dist/css/ln/modules/mod-promo.css';

function ModPromo({
    tag = null,
    link,
    logoName = null,
    logoSize = null,
    text = null,
    textButton = null,
    classCondition = null,
    isStatic = true
}) {
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
                    {text && <p className="com-text --threexs">{text}</p>}
                </div>
                <span className="com-button --secondary">
                    {textButton || 'IR A NOTAS'}
                </span>
            </a>
        </CustomTag>
    );
}

export default ModPromo;
