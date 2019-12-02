import imageAcu from '../common/image';

const acuAuthor = author => {
    const { _id: id, name, image, type } = author;

    const resp = {
        id,
        nombre: name,
        tipo: type === 'author' ? 1 : 2
    };

    if (image && image.url) {
        resp.image = imageAcu(image);
    }

    return resp;
};

export default acuAuthor;
