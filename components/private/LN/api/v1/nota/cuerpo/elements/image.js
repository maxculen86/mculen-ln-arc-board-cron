import Image from '../../image';

const image = imageData => {
    if (!imageData) return null;

    return {
        _t: 'p',
        valor: Image(imageData)
    };
};

image.type = 'image';

export default image;
