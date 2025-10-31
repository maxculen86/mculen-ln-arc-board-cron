import {
    isCustomVoice,
    isNoteListenableForApps
} from '../../../../../../../content/sources/utils/audioNews/helper';
import get from '../../../../../common/utils/get';
import { validateIdsPromoItems } from '../../../common/elements/story/apertura/utils/helpers';
import {
    storyCommon,
    storyHeadline
} from '../../../common/elements/story/storyCommon';
import { removeEmptyItems } from '../../../common/utils/responseCleaner';
import apertura from './apertura/aperturaArticle';
import cuerpo from './cuerpo/index';
import buildFooter from './footer';

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
        apertura: apertura(dataNota, elements.idsElements),
        footer: buildFooter(dataNota),
        isListenable: isNoteListenableForApps(dataNota),
        audio_custom_voice: isCustomVoice(get(dataNota, 'dataAudio', null))
    };

    let elmentsAdd = 0;
    const boxElements = [0, 2, 5, 8, 10];
    if (resp.contenido) {
        const { length } = resp.contenido;
        boxElements.forEach(boxElement => {
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

    const story = { ...resp, url: `${resp.url}?utm_source=appln` };

    return removeEmptyItems(story);
};

export default indexNota;
