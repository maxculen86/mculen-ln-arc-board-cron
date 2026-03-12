import React from 'react';
import '../../../resources/dist/css/ln/components/tag.css';
import '../../../resources/dist/css/ln/components/com-icon.css';
import '../../../resources/dist/css/ln/components/com-bullet.css';
import ComTitle from './com-title';

function ComTag({ iconName, content, sizeText, link, classCondition }) {
    if (!content) return null;
    return (
        <ComTitle
            tag="h3"
            content={content}
            link={link}
            preTitle="Noticias de "
            size={sizeText || ''}
            classCondition={`${classCondition} ${iconName || ''}`}
        />
    );
}

export default ComTag;
