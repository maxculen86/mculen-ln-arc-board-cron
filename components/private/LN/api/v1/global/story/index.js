import get from '../../../../../common/utils/get';
import { storyCommon, storyHeadline } from '../../common/story/storyCommon';
import cuerpo from './cuerpo/index';
import { removeEmptyItems } from '../../common/utils/responseCleaner';
import aperturaArticle from './apertura/aperturaArticle';

const indexNota = dataNota => {
    const comentariosId = get(dataNota, 'label.livefyre_entrada_id.text', null);
    const id = get(dataNota, '_id', null);
    const resp = {
        ...storyCommon(dataNota, cuerpo),
        ...storyHeadline(dataNota, 'global'),
        apertura: aperturaArticle(dataNota),
        comentariosId: comentariosId || id,
        abiertoComentarios: false
    };
    return removeEmptyItems(resp);
};
export default indexNota;
