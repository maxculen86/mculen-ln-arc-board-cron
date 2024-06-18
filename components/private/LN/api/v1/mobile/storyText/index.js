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

    if (
        (dataNota.Termicas &&
            dataNota.Termicas.hide_listening_articles_summary === 'true') ||
        ![6, 7].includes(audio_status)
    ) {
        dataNota.audio_summary_url = undefined;
    }

    const content = removeEmptyItems(cuerpo(dataNota));

    const authors = [];
    if (dataNota.credits && dataNota.credits.by?.length > 0) {
        dataNota.credits.by.forEach(author => {
            authors.push(author.name);
        });
    }

    return content && content.length > 0
        ? {
              ...storyTitleAndResume(dataNota),
              contenido: content.concat('Fin de la nota').join('\n'),
              audio_url: dataNota.audio_url,
              audio_summary_url: dataNota.audio_summary_url,
              categoria: dataNota.category,
              authors
          }
        : {};
};

export default indexNotaText;
