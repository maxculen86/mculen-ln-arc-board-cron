import React from 'react';

import ComFigcaption from './com-figcaption';
import ComText from './text';

import '../../../resources/dist/css/ln/modules/mod-figcaption.css';

function ModFigcaption({ title = '', credit = '', className = '' }) {
    if (!title && !credit) return null;

    return (
        <ComFigcaption className={className}>
            <ComText extraClass="--caption" size="2xs">
                {title}
            </ComText>
            <ComText extraClass="--credit" size="2xs">
                {credit}
            </ComText>
        </ComFigcaption>
    );
}

export default ModFigcaption;
