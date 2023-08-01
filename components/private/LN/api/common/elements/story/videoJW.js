import get from '../../../../../common/utils/get';
import { videoJWCommon, videosJW } from '../videoJW';
import { videoJWThumbnail, videoJWThumbnailGlobal } from '../videoJW/thumbnail';

export const videoJWNota = videoData => {
    if (!videoData) return null;

    const id = videoData._id;

    const { duration, title, sources, image, description } = get(
        videoData,
        'embed.config.videoJw.playlist',
        {}
    );
    const showAd = true;
    const duracion = (duration || 0) * 1000;

    const resp = {
        _t: 'vid',
        id,
        duracion,
        showAd: showAd ? '1' : '0',
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
    const { duration, title, sources, image } = get(
        videoData,
        'embed.config.videoJw.playlist',
        {}
    );
    const showAd = true;
    const durationCalculated = (duration || 0) * 1000;

    const resp = {
        _t: 'video',
        duration: durationCalculated,
        showAd: showAd ? '1' : '0',
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
