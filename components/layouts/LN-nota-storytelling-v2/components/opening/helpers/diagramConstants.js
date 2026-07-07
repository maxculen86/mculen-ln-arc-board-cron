export const DEFAULT_DIAGRAM = 'image-100-title-below';

export const IMAGE_100_DIAGRAMS = [
    'image-100-title-left',
    'image-100-title-above',
    'image-100-title-below',
    'image-100-title-centered'
];

export const IMAGE_50_DIAGRAMS = ['image-50-right-title-left'];

export const PANORAMIC_DIAGRAMS = ['image-panoramic'];

export const WITHOUT_IMAGE = ['without-image'];

// Diagramaciones cuyos addons se renderizan sobre fondo claro (el texto no va
// sobre la imagen): el logo mantiene su color y el texto va en tono oscuro.
export const LIGHT_BACKGROUND_DIAGRAMS = [
    ...PANORAMIC_DIAGRAMS,
    ...WITHOUT_IMAGE
];
