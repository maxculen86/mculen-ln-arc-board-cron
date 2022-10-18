import get from '../../../../../common/utils/get';
import VideoCommon from '../video';
import VideoThumbnail from '../video/thumbnail';

const videoNota = videoData => {
    if (!videoData) return null;

    const {
        _id: id,
        duration: duracion,
        headlines: { basic: tituloHome },
        additional_properties: {
            advertising: { playAds: showAd }
        }
    } = videoData;

    const resp = {
        _t: 'vid',
        id,
        duracion,
        showAd: showAd ? '1' : '0',
        tituloHome
    };

    const video = VideoCommon(videoData.streams);
    if (!video) return null;

    resp.multimedioFile = video;

    const thumbail = VideoThumbnail(videoData.promo_items);
    if (thumbail) {
        resp.multimedioImagen = thumbail;
    }

    const epigrafe = get(videoData, 'subheadlines.basic');
    if (epigrafe) {
        resp.epigrafe = epigrafe;
    }

    return resp;
};

videoNota.type = 'video';

export const videoNotaMobile = videoData => {
    if (!videoData) return null;

    const showAd = get(
        videoData.additional_properties,
        'advertising.playAds',
        true
    );

    const {
        duration,
        headlines: { basic: title }
    } = videoData;

    const resp = {
        _t: 'video',
        duration,
        showAd: showAd ? '1' : '0',
        title
    };

    const video = VideoCommon(videoData.streams);
    if (!video) return null;

    resp.multimediaFile = video;

    const thumbail = VideoThumbnail(videoData.promo_items);
    if (thumbail) {
        resp.thumbnailImage = {
            // eslint-disable-next-line no-underscore-dangle
            _t: thumbail._t,
            order: thumbail.orden,
            src: thumbail.src
        };
    }
    return resp;
};

export default videoNota;
