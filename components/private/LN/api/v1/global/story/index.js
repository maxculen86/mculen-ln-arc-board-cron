import get from '../../../../../common/utils/get';
import { storyCommon, storyHeadline } from '../../common/story/storyCommon';
import cuerpo from './cuerpo/index';
import { removeEmptyItems } from '../../common/utils/responseCleaner';
import {
    apertura,
    aperturaContenido,
    storyTitleAndResume
} from '../../common/story/apertura/aperturaArticle';
import image from './cuerpo/elements/image';
import video from './cuerpo/elements/video';

const indexNota = dataNota => {
    const comentariosId = get(dataNota, 'label.livefyre_entrada_id.text', null);
    const id = get(dataNota, '_id', null);
    const resp = {
        ...storyCommon(dataNota, cuerpo),
        ...storyHeadline(dataNota, 'global'),
        apertura: {
            ...storyTitleAndResume(dataNota),
            ...apertura(dataNota),
            ...aperturaContenido(dataNota, image, video)
        },
        comentariosId: comentariosId || id,
        abiertoComentarios: false
    };
    return removeEmptyItems(resp);
};
export default indexNota;
