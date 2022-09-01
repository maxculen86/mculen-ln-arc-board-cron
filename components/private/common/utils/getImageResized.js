import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import { createResizer } from './image/resizer';

// TODO: Pasar a properties por site y tomar desde allí

const defaultSizes = [
    {
        width: 1033,
        height: 768,
        media: '(min-width: 768px)',
        class: 'img-desktop'
    }
];

const getImageResized = ({
    url,
    originalWidth = 1033,
    originalHeight = 768,
    options = defaultSizes,
    focalPoint,
    isInApertura = false,
    isAdmin = false
}) => {
    return (
        url &&
        createResizer(
            RESIZER_KEY,
            RESIZER_URL,
            isInApertura,
            isAdmin
        ).resizeUrls(url, originalWidth, originalHeight, options, focalPoint)
    );
};
export default getImageResized;
