import React from 'react';
import ComParagraph from './com-paragraph';
import '../../../resources/dist/css/ln/modules/mod-paragraph.css';

const ModParagraph = props => {
    const { children, classesNames } = props;
    return children ? (
        <div className="mod-paragraph">
            <ComParagraph classesNames={classesNames}>{children}</ComParagraph>
        </div>
    ) : null;
};

export default ModParagraph;
