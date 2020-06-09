import Image from '../image';

const image = imageData => {
    return {
        _t: 'p',
        valor: Image(imageData)
    };
};

image.type = 'image';

export default image;
