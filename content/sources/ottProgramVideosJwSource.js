import request from 'request-promise-native';
import { JWTOK } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import { transform } from './utils/ottJwVideoTransform/jwVideoTransform';

const params = { sectionId: 'text', pageLimit: 'text', page: 'text' };
// TODO: Encryptar Token
const fetch = ({ sectionId, pageLimit = '12', page = '1' }) => {
    const arcSite = 'la-nacion-ar';
    const opt = {
        uri: `https://api.jwplayer.com/v2/sites/uafFIXv2/media?q=custom_param:"site:ott" AND custom_param:"section:${sectionId}"&&page_length=${pageLimit}&&sort=publish_start_date:dsc&&page=${page}`,
        json: true,
        method: 'GET',
        auth: {
            bearer: JWTOK
        }
    };

    return request(opt)
        .then(data => {
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
    params,
    ttl: 60
};
