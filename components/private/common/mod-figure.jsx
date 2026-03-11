import React from 'react';
import ComFigure from './com-figure';
import ModPicture from './mod-picture';
import ModFigcaption from './mod-figcaption';
import '../../../resources/dist/css/ln/modules/mod-figure.css';

function ModFigure(props) {
    const { src, title, credit, classCondition } = props;
    if (!src) return null;

    return (
        <ComFigure classCondition={classCondition}>
            <ModPicture src={src} alt={title} />
            <ModFigcaption title={title} credit={credit} />
        </ComFigure>
    );
}

export default ModFigure;
