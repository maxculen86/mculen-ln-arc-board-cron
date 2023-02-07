import get from '../../../../../common/utils/get';
import { storyCommon, storyHeadline } from '../../common/story/storyCommon';
import { validateIdsPromoItems } from '../../common/story/apertura/utils/helpers';
import apertura from './apertura/aperturaArticle';
import cuerpo from './cuerpo/index';
import { removeEmptyItems } from '../../common/utils/responseCleaner';

const indexNota = dataNotaParam => {
    if (!dataNotaParam) throw new Error(`La información de la nota esta vacia`);
    const dataNota = dataNotaParam;
    // Validate Promo_Items by Nulls ids
    if (dataNota && dataNota.promo_items) {
        dataNota.promo_items = validateIdsPromoItems(dataNota.promo_items);
    }
    const elements = cuerpo(dataNota);
    const resp = {
        ...storyCommon(dataNota, elements.elements),
        ...storyHeadline(dataNota, 'mobile'),
        apertura: apertura(dataNota, elements.idsElements)
    };

    let elmentsAdd = 0;
    const boxElements = [0, 3, 6, 8, 10];
    if (resp.contenido) {
        const { length } = resp.contenido;
        boxElements.forEach((boxElement, index) => {
            let boxElementValidate = boxElement + elmentsAdd;
            resp.contenido.every((element, i) => {
                const banner = { _t: 'banner' };
                const type = get(element, '_t', null);

                if (type && type === 'header' && i === boxElementValidate) {
                    boxElementValidate += 1;
                }
                if (i === boxElementValidate && length >= boxElement) {
                    resp.contenido.splice(i + 1, 0, banner);
                    elmentsAdd += 1;
                    return false;
                }
                return true;
            });
        });
    }
    return removeEmptyItems(resp);
};

export default indexNota;
