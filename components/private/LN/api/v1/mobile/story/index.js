import get from 'lodash.get';
import indexNotaData from '../../common/story/indexNotaData';
import { openComments } from '../../common/story/comments';
import cuerpo from './cuerpo/index';
import { removeEmptyItems } from '../../common/utils/responseCleaner';

const indexNota = dataNota => {
    const allowComments = get(dataNota, 'comments.allow_comments', null);
    const resp = {
        ...indexNotaData(dataNota, cuerpo),
        comentarios: {
            abiertoComentarios: openComments(dataNota),
            permitirComentarios: allowComments
        }
    };
    return removeEmptyItems(resp);
};

export default indexNota;
