import get from 'lodash.get';

const acuAuthor = author => {
    const { _id: id, name, image, type } = author;

    const images = get(image, 'resized_urls');
    const resp = {
        id,
        nombre: name,
        tipo: type === 'author' ? 1 : 2
    };

    if (images) {
        resp.image = images[0].resizedUrl;
    }

    return resp;
};

export default acuAuthor;
