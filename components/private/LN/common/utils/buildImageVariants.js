import { updateResizedUrl } from './updateResizedUrl';

export const SCHEMA_IMAGE_VARIANTS = [
    { width: 1200, height: 675 }, // 16:9
    { width: 1200, height: 900 }, // 4:3
    { width: 1200, height: 1200 } // 1:1
];

const buildImageVariants = baseUrl =>
    SCHEMA_IMAGE_VARIANTS.map(({ width, height }) => ({
        '@type': 'ImageObject',
        url: updateResizedUrl(baseUrl, width, height),
        width,
        height
    }));

export default buildImageVariants;
