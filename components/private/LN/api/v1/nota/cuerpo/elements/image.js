import Image from '../../image';

const image = (nodo, dataNota) => {
    if (!nodo) return null;

    return {
        _t: 'p',
        valor: Image(nodo)
    };
};

image.type = 'image';

export default image;
