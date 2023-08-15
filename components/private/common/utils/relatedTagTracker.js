/* eslint-disable react/no-danger */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { checkUserRealoadAction } from './noteTracker/ctrTracker';

const addPositionTag = (tag, idexTag) => {
    const index = idexTag + 1;
    const position = index <= 9 ? `0${index}` : index;
    if (tag)
        return Object.assign(tag, {
            ctr_brand: `linkTemas_${position}`,
            ctr_position: `0600${position}`
        });
    return true;
};

// TODO: Si se quiere volver a usar esta lógica. Fijarse en el histórico

const intersectionObserverForRelatedTags = outputType => {
    return <></>;
};

export default intersectionObserverForRelatedTags;
