import React from 'react';
import OpeningImage100 from '../components/OpeningImage100';
import OpeningImage50 from '../components/OpeningImage50';
import OpeningImagePanoramic from '../components/OpeningImagePanoramic';

export const DEFAULT_DIAGRAM = 'image-100-title-below';

const diagrams = {
    'image-100-title-left': OpeningImage100,
    'image-100-title-above': OpeningImage100,
    'image-100-title-below': OpeningImage100,
    'image-100-title-centered': OpeningImage100,
    'image-50-right-title-left': OpeningImage50,
    'image-panoramic': OpeningImagePanoramic
};

export const getOpeningComponent = props => {
    const { diagram } = props;

    const DiagramComponent = diagrams[diagram];

    if (DiagramComponent) return <DiagramComponent {...props} />;

    return <OpeningImage100 {...props} diagram={DEFAULT_DIAGRAM} />;
};
