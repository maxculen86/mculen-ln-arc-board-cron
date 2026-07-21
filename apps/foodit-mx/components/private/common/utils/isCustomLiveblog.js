import { isEmptyObject } from './isEmptyObject';

const isCustomLiveblog = element => {
    if (
        !element ||
        isEmptyObject(element) ||
        typeof element !== 'object' ||
        Array.isArray(element)
    )
        return false;

    const { type, subtype } = element;
    return type === 'custom_embed' && subtype === 'custom-liveblog';
};

export default isCustomLiveblog;
