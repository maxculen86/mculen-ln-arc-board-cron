import { CONTENT_BASE } from 'fusion:environment';
import logger from '../../../../../components/private/common/utils/logger';
import get from '../../../../../components/private/common/utils/get';
import getRequest from '../../getRequest';

const addFollowAnotherNoteData = async (
    cachedCall,
    anotherNoteData,
    arcSite
) => {
    const { _id: id } = anotherNoteData;

    try {
        const fetchedRelated = await cachedCall('relatedSource', getRequest, {
            query: `${CONTENT_BASE}/content/v4/stories/?website=${arcSite}&_id=${id}&included_fields=headlines,label,website_url,type,additional_properties`, // TODO: validar si con included_fields se pueden traer los datos de las notas de seguir leyendo. Para no hacer un pedidos adicionales
            independent: true
        });
        const published = get(
            fetchedRelated,
            'additional_properties.has_published_copy',
            false
        );
        if (!published) return null;

        const {
            headlines,
            label,
            website_url: websiteUrl,
            type
        } = fetchedRelated;

        return {
            ...anotherNoteData,
            headlines,
            label,
            website_url: websiteUrl,
            type
        };
    } catch (error) {
        return logger.push(
            error,
            {
                source: 'content/source/articleSourceNota/addFollowAnotherNoteData',
                url: id
            },
            arcSite,
            true
        );
    }
};

export default addFollowAnotherNoteData;
