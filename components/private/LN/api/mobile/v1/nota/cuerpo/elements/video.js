import Video from '../../../../../common/nota/video';

const video = nodo => {
    if (!nodo) return null;

    return {
        _t: 'p',
        valor: Video(nodo)
    };
};

video.type = 'video';

export default video;
