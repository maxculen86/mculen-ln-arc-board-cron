import get from 'lodash.get';
import VideoCommon from '../../common/video';
import VideoThumbnail from '../../common/video/thumbnail';

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

export default videoNota;
