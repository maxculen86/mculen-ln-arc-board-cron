/* eslint-disable consistent-return */
import { API_ENV } from 'fusion:environment';
import request from 'request-promise-native';
import logger from '../../components/private/common/utils/logger';

export const resolve = (token, action, noteData) => {
    const baseUrl = `https://${
        API_ENV === 'sandbox' ? 'qa-' : ''
    }api-personalizacion.lanacion.com.ar/personalizacion/v1/zones/lanacion/`;

    const headers = {
        'Accept-Encoding': '*,q=0.8',
        'Content-Type': 'application/json',
        Authorization: token
    };
    const { id: noteId } = noteData || {};

    const REQUESTS = {
        list: {
            uri: `${baseUrl}/bookmarks?size=8`,
            method: 'GET',
            headers
        },
        check: {
            uri: `${baseUrl}bookmarks-type/story/${noteId}`,
            method: 'GET',
            headers
        },
        link: {
            uri: `${baseUrl}/bookmarks`,
            method: 'POST',
            headers,
            body: JSON.stringify({})
        },
        unlink: {
            uri: `${baseUrl}/bookmarks/${bookmarkId}`,
            method: 'DELETE',
            headers,
            body: JSON.stringify({})
        }
    };
    return REQUESTS[action];
};

const fetch = ({ arcSite, token, action, noteData }) => {
    const generatedEndpoint = resolve(token, action, noteData);
    const { uri, method, headers } = generatedEndpoint || {};

    if (!token || !action)
        throw new Error(
            'El token y action son necesarios para consultar bookmarks.'
        );

    const getData = async () => {
        try {
            const response = await request(
                {
                    uri,
                    method,
                    json: true,
                    ...headers
                },
                headers
            );
            return {
                data: response
            };
        } catch (error) {
            logger.push(
                error,
                {
                    source: 'content/sources/bookmarkSource',
                    url: uri
                },
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
