import { videoJWNotaMobile } from '../../../../../common/elements/story/videoJW';

const videoJW = nodo => {
    if (!nodo) return null;

    return videoJWNotaMobile(nodo);
};
export default videoJW;
