import { videoNotaMobile } from '../../../../../common/elements/story/video';

const video = nodo => {
    if (!nodo) return null;

    return videoNotaMobile(nodo);
};
export default video;
