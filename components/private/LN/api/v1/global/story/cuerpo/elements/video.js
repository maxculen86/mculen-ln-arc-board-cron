import Video from '../../../../common/story/video';

const video = nodo => {
    if (!nodo) return null;

    return {
        _t: 'p',
        valor: Video(nodo)
    };
};
export default video;
