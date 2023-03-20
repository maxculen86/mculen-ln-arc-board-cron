import { imageMobile } from '../../../../../common/elements/image';

const image = (nodo, dataNota) => {
    if (!nodo) return null;
    return imageMobile(nodo);
};
export default image;
