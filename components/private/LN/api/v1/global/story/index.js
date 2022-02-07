import get from 'lodash.get';
import { storyCommon, storyHeadline } from '../../common/story/storyCommon';
import cuerpo from './cuerpo/index';
import { removeEmptyItems } from '../../common/utils/responseCleaner';

const indexNota = dataNota => {
    const comentariosId = get(dataNota, 'label.livefyre_entrada_id.text', null);
    const id = get(dataNota, '_id', null);
    const resp = {
        ...storyCommon(dataNota, cuerpo),
        ...storyHeadline(dataNota, 'global'),
        comentariosId: comentariosId || id,
        abiertoComentarios: false
    };
    return removeEmptyItems(resp);
};
export default indexNota;
