import cuerpo from './cuerpo/index';
import { storyTitleAndResume } from '../../../common/elements/story/apertura/aperturaArticle';
import { removeEmptyItems } from '../../../common/utils/responseCleaner';

const indexNotaText = dataNota => {
    if (!dataNota) throw new Error(`La información de la nota esta vacia`);
    const { audio_status } = dataNota;
    if (
        (dataNota.Termicas &&
            dataNota.Termicas.hide_listening_articles === 'true') ||
        ![6, 7].includes(audio_status)
    ) {
        dataNota.audio_url = undefined;
    }

    const content = removeEmptyItems(cuerpo(dataNota));

    return content && content.length > 0
        ? {
              ...storyTitleAndResume(dataNota),
              contenido: content.concat('Fin de la nota').join('\n'),
              audio_url: dataNota.audio_url,
              categoria: dataNota.category
          }
        : {};
};

export default indexNotaText;
