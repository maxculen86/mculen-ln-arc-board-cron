import { SITE_LANACION } from 'fusion:environment';
import { isNoteListenableForApps as isListenable } from '../../../../../../content/sources/utils/audioNews/helper';
import get from '../../../../common/utils/get';
import { CardRegular } from '../../v1/mobile/home/article/cardRegular';

const addListenableFlagForArticles = articles =>
    articles.map(x => ({
        ...x,
        isListenable: isListenable(x)
    }));

export const getCollectionNotes = data =>
    data.content_elements.map(note => ({
        url: `${SITE_LANACION}${note.website_url}`,
        titulo: get(note, 'headlines.basic', null),
        bajada: get(note, 'subheadlines.basic', null),
        imagen: get(note, 'promo_items.basic.url', null)
    }));

export const getChainCollectionFormated = data =>
    addListenableFlagForArticles(data.content_elements).map(note =>
        CardRegular(note)
    );
