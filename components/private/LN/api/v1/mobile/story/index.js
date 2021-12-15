import get from 'lodash.get';
import indexNotaData from '../../common/story/indexNotaData';
import { openComments } from '../../common/story/comments';
import cuerpo from './cuerpo/index';
import { removeEmptyItems } from '../../common/utils/responseCleaner';

const indexNota = dataNota => {
    const comentariosId = get(dataNota, 'label.livefyre_entrada_id.text', null);
    const allowComments = get(dataNota, 'comments.allow_comments', null);
    const id = get(dataNota, '_id', null);
    const resp = {
        ...indexNotaData(dataNota, cuerpo),
        comentarios: {
            abiertoComentarios: openComments(dataNota),
            permitirComentarios: allowComments
        },
        comentariosId: comentariosId || id
    };
    return removeEmptyItems(resp);
};

export default indexNota;
