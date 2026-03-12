/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';

import '../../../resources/dist/css/ln/modules/mod-figure.css';

function ComFigure({ classCondition, children, handleClick }) {
    return children ? (
        <figure
            role="button"
            onClick={handleClick}
            onKeyDown={handleClick}
            tabIndex={handleClick ? 0 : undefined}
            className={`mod-figure ${classCondition || ''}`}
        >
            {children}
        </figure>
    ) : null;
}

export default ComFigure;
