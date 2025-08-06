import nodeFetch from 'node-fetch';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import logger from '../../components/private/common/utils/logger';

const isEncoded = str => {
    try {
        return decodeURIComponent(str) !== str;
    } catch {
        return true;
    }
};

const fetch = query => {
    const { noteId = '' } = query;

    if (!noteId || !noteId.trim()) {
        throw new Error('noteId is required and cannot be empty');
    }

    const safeNoteId = isEncoded(noteId) ? noteId : encodeURIComponent(noteId);
    const url = `${CONTENT_BASE}/content/v4/stories/?website=foodit&_id=${safeNoteId}&published=true`;

    const opt = {
        method: 'GET'
    };

    if (ARC_ACCESS_TOKEN) {
        opt.headers = { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` };
    }

    const resolveData = async () => {
        try {
            const response = await nodeFetch(url, opt);
            handleHttpError(response);
            const data = await response.json();

            if (!data || !data.headlines?.basic) {
                return {
                    error: true,
                    message: `No data found for noteId: ${noteId}`,
                    noteId
                };
            }

            return data;
        } catch (error) {
            logger.push(error, {
                source: 'content/sources/embedCardSource.js',
                url,
                noteId
            });

            return {
                error: true,
                message: error.message,
                noteId
            };
        }
    };

    return resolveData();
};

export default {
    fetch,
    params: { noteId: 'text' },
    ttl: 120
};
