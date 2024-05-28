import { videoJWNotaMobile } from '../../../../../common/elements/story/videoJW';

const videoJW = (nodo, notaId = '') => {
    if (!nodo) return null;

    return videoJWNotaMobile(nodo, notaId);
};
export default videoJW;
