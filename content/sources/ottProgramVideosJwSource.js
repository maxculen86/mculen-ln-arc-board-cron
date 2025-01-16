import request from 'request-promise-native';
import { JWP_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import {
    filterMediaBySection,
    transform
} from './utils/ottJwVideoTransform/jwVideoTransform';

const sectionConfig = {
    '+ Nación': { pageLimit: 24, filter: true },
    'El noticiero': { pageLimit: 24, filter: true },
    '+ Noticias': { pageLimit: 12, filter: true },
    '+ Verdad': { pageLimit: 12, filter: true },
    '+ Info': { pageLimit: 24, filter: true }
};

// TODO: revisar query con custom_params: ( name: "abc" AND value: "123" ), mandar mail a soporte JW para buscar otra solución
const fetch = ({ sectionId, page = '1' }) => {
    const arcSite = 'la-nacion-ar';
    const config = sectionConfig[sectionId] || { pageLimit: 12, filter: false };

    const opt = {
        uri: `https://api.jwplayer.com/v2/sites/uafFIXv2/media?q=custom_param:"site:ott" AND custom_param:"section:${encodeURIComponent(
            sectionId
        )}"&&page_length=${
            config.pageLimit
        }&&sort=publish_start_date:dsc&&page=${page}`,
        json: true,
        method: 'GET',
        auth: {
            bearer: JWP_TOKEN
        }
    };

    return request(opt)
        .then(data => {
            if (config.filter) {
                return transform({
                    data: filterMediaBySection(data, sectionId)
                });
            }
            return transform({ data });
        })
        .catch(error => {
            logger.push(
                error,
                {
                    source: 'content/source/ottProgramVideosJwSource',
                    sectionId
                },
                arcSite
            );
        });
};

export default {
    fetch,
    params: { sectionId: 'text', pageLimit: 'text', page: 'text' },
    ttl: 60
};
