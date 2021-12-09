import { imageMobile } from '../../../../common/image';

const image = (nodo, dataNota) => {
    if (!nodo) return null;
    return imageMobile(nodo);
};
export default image;
