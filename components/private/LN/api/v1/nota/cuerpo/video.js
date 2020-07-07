import Video from '../video';

const video = videoData => {
    if (!videoData) return null;

    return {
        _t: 'p',
        valor: Video(videoData)
    };
};

video.type = 'video';

export default video;
