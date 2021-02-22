import { IS_DEV, IS_SANDBOX } from 'fusion:environment';

const getPathForImage = url => {
    let pathImagen = url;
    if (IS_DEV !== 'true' && IS_SANDBOX !== 'true') {
        pathImagen = `${pathImagen}`;
    }
    return pathImagen;
};

export default getPathForImage;
