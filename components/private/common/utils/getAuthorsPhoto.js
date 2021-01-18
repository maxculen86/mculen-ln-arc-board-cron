/* eslint-disable no-nested-ternary */
import get from './get';

const getAuthorsPhoto = article => {
    const authors = get(article, 'credits.by', []);
    const authorFiltered = authors.filter(auth => auth.type === 'author');
    const authorWithPhoto = authorFiltered.find(
        auth => get(auth, 'image.resized_urls', null) !== null
    );
    const urlsResizes = get(authorWithPhoto, 'image.resized_urls', []);
    return {
        height: 80,
        resized_urls: get(authorWithPhoto, 'image.resized_urls', []),
        type: 'image',
        url: urlsResizes.length > 0 ? urlsResizes[0].resizedUrl : null,
        width: 80
    };
};

export default getAuthorsPhoto;
