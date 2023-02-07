import get from '../../../../../common/utils/get';
import { storyCommon, storyHeadline } from '../../common/story/storyCommon';
import { validateIdsPromoItems } from '../../common/story/apertura/utils/helpers';
import cuerpo from './cuerpo/index';
import { removeEmptyItems } from '../../common/utils/responseCleaner';
import aperturaArticle from './apertura/aperturaArticle';

const indexNota = dataNotaParam => {
    if (!dataNotaParam) throw new Error(`La información de la nota esta vacia`);
    const dataNota = dataNotaParam;
    const comentariosId = get(dataNota, 'label.livefyre_entrada_id.text', null);
    const id = get(dataNota, '_id', null);
    // Validate Promo_Items by Nulls ids
    if (dataNota && dataNota.promo_items) {
        dataNota.promo_items = validateIdsPromoItems(dataNota.promo_items);
    }
    const elements = cuerpo(dataNota);
    const resp = {
        ...storyCommon(dataNota, elements.elements),
        ...storyHeadline(dataNota, 'global'),
        apertura: aperturaArticle(dataNota, 'global', elements.idsElements),
        comentariosId: comentariosId || id,
        abiertoComentarios: false
    };
    return removeEmptyItems(resp);
};
export default indexNota;
