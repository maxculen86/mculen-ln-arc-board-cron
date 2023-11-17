import request from 'request-promise-native';
import { JWP_TOKE } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import { transform } from './utils/ottJwVideoTransform/jwVideoTransform';

const params = { sectionId: 'text' };
// `https://api.jwplayer.com/v2/sites/uafFIXv2/media?q=custom_param:"site:ott" AND custom_param:"section:El noticiero AM"&&page_length=12&&sort=created:dsc&&page=2`

const fetch = ({ website }) => {
    const arcSite = 'la-nacion-ar';

    const opt = {
        uri: `https://api.jwplayer.com/v2/sites/uafFIXv2/media?q=custom_param:"site:ott"&sort=publish_start_date:dsc`,
        json: true,
        method: 'GET',
        auth: {
            bearer: JWP_TOKE
        }
    };

    return request(opt)
        .then(data => transform({ data }))
        .catch(error => {
            logger.push(
                error,
                { source: 'content/source/ottProgramVideoJwSource', sectionId },
                arcSite,
                website
            );
        });
};

export default {
    fetch,
    params,
    ttl: 60
};
