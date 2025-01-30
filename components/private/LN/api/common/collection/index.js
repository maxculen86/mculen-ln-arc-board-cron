import { SITE_LANACION } from 'fusion:environment';
import get from '../../../../common/utils/get';

export const getCollectionNotes = data =>
    data.content_elements.map(note => ({
        url: `${SITE_LANACION}${note.website_url}`,
        titulo: get(note, 'headlines.basic', null),
        bajada: get(note, 'subheadlines.basic', null),
        imagen: get(note, 'promo_items.basic.url', null)
    }));
