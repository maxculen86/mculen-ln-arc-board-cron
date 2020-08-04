import React from 'react';
import Parrafo from '../../../components/private/LN/nota/cuerpo/parrafo';
import '../../../resources/dist/css/ln/modules/mod-paragraph.css';

const ModParagraph = props => {
    const { children, classesNames, data, classCondition } = props;
    return children ? (
        <blockquote
            className={`mod-paragraph ${classCondition ? classCondition : ``}`}
        >
            {children}
        </blockquote>
    ) : null;
};

export default ModParagraph;
