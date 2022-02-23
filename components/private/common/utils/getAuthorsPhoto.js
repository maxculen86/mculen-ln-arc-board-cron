/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import get from './get';

const getAuthorsPhoto = article => {
    const authors = get(article, 'credits.by', []);
    const authorFiltered = authors.filter(auth => auth.type === 'author');
    const imageResizedUrl = 'image.resized_urls';
    const authorWithPhoto = authorFiltered.find(
        auth => get(auth, `${imageResizedUrl}`, null) !== null
    );
    const urlsResizes = get(authorWithPhoto, `${imageResizedUrl}`, []);
    const altText = get(authorWithPhoto, 'alt_text', '');
    if (urlsResizes.length === 0) return null;
    return {
        height: 80,
        resized_urls: get(authorWithPhoto, `${imageResizedUrl}`, []),
        type: 'image',
        altText,
        url: urlsResizes.length > 0 ? urlsResizes[0].resizedUrl : null,
        width: 80
    };
};

export default getAuthorsPhoto;
