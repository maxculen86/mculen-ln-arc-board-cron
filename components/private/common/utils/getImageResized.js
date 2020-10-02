import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import { createResizer } from './image/resizer';

// TODO: Pasar a properties por site y tomar desde allí
const defaultSizes = {
    width: 1033,
    height: 768,
    media: '(min-width: 768px)',
    class: 'img-desktop'
};

const getImageResized = (url, options = defaultSizes) => {
    const { width = 1033, height = 768 } = options;
    return (
        url &&
        createResizer(RESIZER_KEY, RESIZER_URL).resizeUrl(
            url,
            width,
            height,
            options
        )
    );
};

export default getImageResized;
