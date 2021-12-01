import { videoNotaMobile } from '../../../../common/story/video';

const video = nodo => {
    if (!nodo) return null;

    return videoNotaMobile(nodo);
};
export default video;
