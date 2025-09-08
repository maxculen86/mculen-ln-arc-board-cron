import request from 'request-promise-native';
import { JWP_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import {
    filterMediaBySection,
    transform
} from './utils/ottJwVideoTransform/jwVideoTransform';
import { isValidString } from '../../components/private/common/utils/dataValidation';
import NotFoundError from './utils/notFoundError';
import badRequestHandler from './utils/badRequestHandler';
import { isEmptyObject } from '../../components/private/common/utils/isEmptyObject';

// TODO: limpieza OTT - Borrar en iteración 3 de 5 (antes, validar que no se use en algun lugar activo en PB)
const sectionConfig = {
    '+ Nación': { pageLimit: 24, filter: true },
    'El noticiero': { pageLimit: 24, filter: true },
    '+ Noticias': { pageLimit: 12, filter: true },
    '+ Verdad': { pageLimit: 12, filter: true },
    '+ Info': { pageLimit: 24, filter: true },
    '+ Mañana': { pageLimit: 24, filter: true }
};

// TODO: revisar query con custom_params: ( name: "abc" AND value: "123" ), mandar mail a soporte JW para buscar otra solución
const fetch = async query => {
    const { sectionId, page = '1', 'arc-site': arcSite } = query;
    const updatedSectionId = sectionId?.replace(':', '');

    if (!JWP_TOKEN) {
        return badRequestHandler('Bad Request - JWP_TOKEN is not defined');
    }

    const config = sectionConfig[updatedSectionId] || {
        pageLimit: 12,
        filter: false
    };
    const params = [`custom_param:"site:ott"`];

    if (isValidString(updatedSectionId) && updatedSectionId?.trim() !== '') {
        params.push(
            `custom_param:"section:${encodeURIComponent(updatedSectionId)}"`
        );
    }

    const uri = `https://api.jwplayer.com/v2/sites/uafFIXv2/media?q=${params.join(' AND ')}&&page_length=${config.pageLimit}&&sort=publish_start_date:dsc&&page=${page}`;

    const opt = {
        uri,
        json: true,
        method: 'GET',
        auth: {
            bearer: JWP_TOKEN
        }
    };

    return request(opt)
        .then(data => {
            if (isEmptyObject(data) || data?.media?.length === 0) {
                throw new NotFoundError('No content found');
            }

            if (config.filter) {
                return transform({
                    data: filterMediaBySection(data, updatedSectionId)
                });
            }
            return transform({ data });
        })
        .catch(error => {
            logger.push(
                error,
                {
                    source: 'content/source/ottProgramVideosJwSource',
                    sectionId: updatedSectionId
                },
                arcSite
            );
        });
};

export default {
    fetch,
    params: {
        sectionId: 'text',
        page: 'text'
    },
    ttl: 60
};
