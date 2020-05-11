import get from 'lodash.get';
import VideoCommon from '../common/video';

const videoNota = videoData => {
    const resp = VideoCommon(videoData);

    if (!resp) return null;
    const epigrafe = get(videoData, 'headlines.basic');
    resp._t = 'vid';

    if (epigrafe) {
        resp.epigrafe = epigrafe;
    }

    return resp;
};

videoNota.type = 'video';

export default videoNota;
