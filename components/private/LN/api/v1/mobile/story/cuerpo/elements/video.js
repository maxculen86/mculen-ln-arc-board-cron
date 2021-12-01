import Video from '../../../../common/story/video';

const video = nodo => {
    if (!nodo) return null;

    return Video(nodo);
};
export default video;
