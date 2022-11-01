import cuerpo from './cuerpo/index';
import { storyTitleAndResume } from '../../common/story/apertura/aperturaArticle';
import { removeEmptyItems } from '../../common/utils/responseCleaner';

const indexNotaText = dataNota => {
    if (!dataNota) throw new Error(`La información de la nota esta vacia`);
    // eslint-disable-next-line no-console
    console.log('LINEA 8', dataNota);
    const content = removeEmptyItems(cuerpo(dataNota));

    return content && content.length > 0
        ? {
              categoria: dataNota.category || 'LINEA 13',
              ...storyTitleAndResume(dataNota),
              contenido: content.concat('Fin de la nota').join('\n'),
              audio_url: dataNota.audio_url
          }
        : {};
};

export default indexNotaText;
