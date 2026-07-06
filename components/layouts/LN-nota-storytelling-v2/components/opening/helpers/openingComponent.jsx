import React from 'react';
import OpeningImage100 from '../components/OpeningImage100';
import OpeningImage50 from '../components/OpeningImage50';
import OpeningImagePanoramic from '../components/OpeningImagePanoramic';
import {
    DEFAULT_DIAGRAM,
    IMAGE_100_DIAGRAMS,
    IMAGE_50_DIAGRAMS,
    PANORAMIC_DIAGRAMS
} from './diagramConstants';

export { DEFAULT_DIAGRAM };

const mapDiagrams = (diagramKeys, Component) =>
    diagramKeys.reduce((acc, key) => ({ ...acc, [key]: Component }), {});

const diagrams = {
    ...mapDiagrams(IMAGE_100_DIAGRAMS, OpeningImage100),
    ...mapDiagrams(IMAGE_50_DIAGRAMS, OpeningImage50),
    ...mapDiagrams(PANORAMIC_DIAGRAMS, OpeningImagePanoramic)
};

export const getOpeningComponent = props => {
    const { diagram } = props;

    const DiagramComponent = diagrams[diagram];

    if (DiagramComponent) return <DiagramComponent {...props} />;

    return <OpeningImage100 {...props} diagram={DEFAULT_DIAGRAM} />;
};
