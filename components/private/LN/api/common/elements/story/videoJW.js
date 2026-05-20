import get from '../../../../../common/utils/get';
import { videoJWCommon, videosJW, videoJWM3u8 } from '../videoJW';
import { videoJWThumbnail, videoJWThumbnailGlobal } from '../videoJW/thumbnail';
import { enumTypeError } from '../../enums/enumTypeError';

export const videoJWNota = (videoData, notaId = '') => {
    if (!videoData) return null;

    try {
        const id =
            get(videoData, '_id', null) ||
            get(videoData, 'embed.config.videoJw.playlist.mediaid', null);

        if (!id) {
            console.warn(
                `Error Version Global Video JW - Missing Id in content: ${JSON.stringify(
                    videoData || {}
                )}`
            );
            return null;
        }

        const playList =
            get(videoData, 'playlist', null) ||
            get(videoData, 'embed.config.videoJw.playlist', null);

        const elementPlayList = Array.isArray(playList)
            ? playList[0]
            : playList;

        if (!elementPlayList) {
            console.warn(
                `Error Version Global Video JW - Missing playList in content: ${JSON.stringify(
                    videoData || {}
                )}`
            );
            return null;
        }

        const duration = get(elementPlayList, 'duration', 0);
        const title = get(elementPlayList, 'title', '');
        const sources = get(elementPlayList, 'sources', []);
        const image = get(elementPlayList, 'image', null);
        const description = get(elementPlayList, 'description', '');

        const duracion =
            typeof duration === 'number'
                ? (duration || 0) * 1000
                : duration * 1;

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

        return resp;
    } catch (error) {
        console.warn(
            JSON.stringify(
                {
                    name: 'BackendLnWarn',
                    customErrorType: 'BackendLnWarn',
                    customType: enumTypeError.storyContentError,
                    log_details: {
                        message: `videoJWNota - msj: ${error.message} - content: ${JSON.stringify(videoData || {})}`,
                        reference_id: notaId
                    }
                },
                null,
                2
            )
        );

        return null;
    }
};

export const videoJWNotaMobile = (videoData, notaId = '') => {
    if (!videoData) return null;

    try {
        const playList =
            get(videoData, 'playlist', null) ||
            get(videoData, 'embed.config.videoJw.playlist', null);

        const elementPlayList = Array.isArray(playList)
            ? playList[0]
            : playList;

        if (!elementPlayList) {
            console.warn(
                `Error Version Mobile Video JW - Missing playList in content: ${JSON.stringify(
                    videoData || {}
                )}`
            );
            return null;
        }

        const duration = get(elementPlayList, 'duration', 0);
        const sources = get(elementPlayList, 'sources', []);
        const image = get(elementPlayList, 'image', null);

        const durationCalculated =
            typeof duration === 'number'
                ? (duration || 0) * 1000
                : duration * 1;

        const resp = {
            _t: 'video',
            duration: durationCalculated
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

        const videoHls = videoJWM3u8(sources);
        if (videoHls) {
            resp.multimediaHls = videoHls;
        }

        const title =
            get(videoData, 'epigraphTitle', null) ||
            get(videoData, 'embed.config.videoJw.epigraphTitle', null);

        if (title?.length > 0) {
            resp.title = title;
        }

        return resp;
    } catch (error) {
        console.warn(
            JSON.stringify(
                {
                    name: 'BackendLnWarn',
                    customErrorType: 'BackendLnWarn',
                    customType: enumTypeError.storyContentError,
                    log_details: {
                        message: `videoJWNotaMobile - msj: ${error.message} - content: ${JSON.stringify(videoData || {})}`,
                        reference_id: notaId
                    }
                },
                null,
                2
            )
        );
        return null;
    }
};

export default videoJWNota;
