import Image from '../../../../common/story/image';

const image = (nodo, dataNota) => {
    if (!nodo) return null;

    return {
        _t: 'p',
        valor: Image(nodo)
    };
};
export default image;
