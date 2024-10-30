import cuerpo from './cuerpo/index';
import { storyTitleAndResume } from '../../../common/elements/story/apertura/aperturaArticle';
import { removeEmptyItems } from '../../../common/utils/responseCleaner';
import { authorCommon as Author } from '../../../common/elements/author/index';

const indexNotaText = dataNota => {
    if (!dataNota) throw new Error(`La información de la nota esta vacia`);
    const nota = { ...dataNota };
    const { audio_status: audioStatus } = nota;
    if (
        (nota.Termicas && nota.Termicas.hide_listening_articles === 'true') ||
        ![6, 7].includes(audioStatus)
    ) {
        nota.audio_id = undefined;
        nota.audio_url = undefined;
    }

    if (
        (nota.Termicas &&
            nota.Termicas.hide_listening_articles_summary === 'true') ||
        ![6, 7].includes(audioStatus)
    ) {
        nota.audio_summary_url = undefined;
    }

    const content = removeEmptyItems(cuerpo(nota));

    const authors = [];
    const autores = [];
    if (nota.credits && nota.credits.by?.length > 0) {
        nota.credits.by.forEach(author => {
            autores.push(Author(author));
            authors.push(author.name);
        });
    }

    return content && content.length > 0
        ? {
              ...storyTitleAndResume(nota),
              contenido: content.concat('Fin de la nota').join('\n'),
              audio_url: nota.audio_url,
              audio_summary_url: nota.audio_summary_url,
              audio_custom_voice: nota.audio_custom_voice,
              audio_id: nota.audio_id,
              categoria: nota.category,
              authors,
              autores
          }
        : {};
};

export default indexNotaText;
