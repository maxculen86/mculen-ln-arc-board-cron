import { VIAFOURA_UUID, VIAFOURA_XREQUEST } from 'fusion:environment';
import request from 'request-promise-native';
import logger from '../../components/private/common/utils/logger';

const fetch = ({ arcSite, id }) => {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'X-REQUEST_SIGNATURE': VIAFOURA_XREQUEST
        }
    };
    const endpoint = {
        uri: `https://livecomments.viafoura.co/v4/livecomments/${VIAFOURA_UUID}/contentcontainer/id?container_id=${id}`,
        options,
        json: true
    };

    const getData = async () => {
        try {
            const response = await request(endpoint);
            return {
                comments: response
            };
        } catch (error) {
            logger.push(
                error,
                { source: 'content/sources/viafouraSource', url: endpoint.uri },
                arcSite
            );
        }
    };

    return Promise.resolve(getData());
};

export default {
    fetch,
    ttl: 120
};
