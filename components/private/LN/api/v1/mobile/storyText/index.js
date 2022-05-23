import cuerpo from './cuerpo/index';
import { storyTitleAndResume } from '../../common/story/apertura/aperturaArticle';

import { removeEmptyItems } from '../../common/utils/responseCleaner';

const indexNotaText = dataNota => {
    if (!dataNota) throw new Error(`La información de la nota esta vacia`);

    const content = removeEmptyItems(cuerpo(dataNota));

    return content && content.length > 0
        ? {
              ...storyTitleAndResume(dataNota),
              contenido: content.concat('Fin de la nota').join('\n')
          }
        : {};
};

export default indexNotaText;
