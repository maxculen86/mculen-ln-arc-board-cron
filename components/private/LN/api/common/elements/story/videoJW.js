import get from '../../../../../common/utils/get';
import { videoJWCommon, videosJW } from '../videoJW';
import { videoJWThumbnail, videoJWThumbnailGlobal } from '../videoJW/thumbnail';

export const videoJWNota = videoData => {
    if (!videoData) return null;

    const id =
        videoData._id ||
        get(videoData, 'embed.config.videoJw.playlist.mediaid', null);

    const playList =
        get(videoData, 'playlist', null) ||
        get(videoData, 'embed.config.videoJw.playlist', null);
    const elementPlayList = Array.isArray(playList) ? playList[0] : playList;
    const { duration, title, sources, image, description } = elementPlayList;

    const duracion = (duration || 0) * 1000;

    const resp = {
        _t: 'vid',
        id,
        duracion,
        tituloHome: title
    };

    const video = videoJWCommon(sources);
    if (!video) return null;

    resp.multimedioFile = video;

    const videos = videosJW(sources);
    if (!videos) return null;

    resp.multimedioFiles = videos;

    const thumbail = videoJWThumbnailGlobal(image);
    if (thumbail) {
        resp.multimedioImagen = thumbail;
    }
    if (description) {
        resp.epigrafe = description;
    }
    resp.type = 'video';
    return resp;
};

export const videoJWNotaMobile = videoData => {
    if (!videoData) return null;
    const playList =
        get(videoData, 'playlist', null) ||
        get(videoData, 'embed.config.videoJw.playlist', null);
    const elementPlayList = Array.isArray(playList) ? playList[0] : playList;
    const { duration, title, sources, image } = elementPlayList;

    const durationCalculated = (duration || 0) * 1000;

    const resp = {
        _t: 'video',
        duration: durationCalculated,
        title
    };

    const video = videoJWCommon(sources);
    if (!video) return null;

    resp.multimediaFile = video;

    const videos = videosJW(sources);
    if (!videos) return null;

    resp.multimediaFiles = videos;

    const thumbail = videoJWThumbnail(image);
    if (thumbail) {
        resp.thumbnailImage = thumbail;
    }
    return resp;
};

export default videoJWNota;
