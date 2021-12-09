import get from 'lodash.get';
import { dateAndTimeForAppsUtil } from '../../../../../../../common/utils/dateAndTimeUtil';
import { imageMobile } from '../../../../common/image';

const gallery = (nodo, dataNota) => {
    if (!nodo) return null;

    const {
        headlines: { basic: title }
    } = nodo;

    const resp = {
        _t: 'gallery',
        title,
        date: dateAndTimeForAppsUtil(nodo.publish_date),
        images: []
    };

    const images = get(nodo, 'content_elements');

    if (!images || images.length === 0) return null;

    images.forEach(element => {
        resp.images.push(imageMobile(element));
    });

    return resp;
};
export default gallery;
