import cuerpo from './cuerpo/index';
import { storyTitleAndResume } from '../../../common/elements/story/apertura/aperturaArticle';
import { removeEmptyItems } from '../../../common/utils/responseCleaner';
import { authorCommon as Author } from '../../../common/elements/author/index';
import get from '../../../../../common/utils/get';
import { isCustomVoice } from '../../../../../../../content/sources/utils/audioNews/helper';

const getDataAudio = (termicas, dataAudio) => {
    const isAudioActive = [6, 7].includes(dataAudio?.audio_status);
    if (!isAudioActive || termicas?.hide_listening_articles === 'true')
        return undefined;
    return removeEmptyItems({
        audio_url: dataAudio?.audio_url,
        audio_summary_url:
            termicas?.hide_listening_articles_summary === 'true'
                ? undefined
                : dataAudio?.audio_summary_url,
        audio_custom_voice: isCustomVoice(dataAudio),
        audio_id: dataAudio?.audio_id
    });
};
const indexNotaText = dataNota => {
    if (!dataNota) throw new Error(`La información de la nota esta vacía`);
    const nota = { ...dataNota };
    const dataAudio = get(nota, 'dataAudio', null);

    const content = removeEmptyItems(cuerpo(nota));
    if (!content?.length) return {};

    return {
        ...storyTitleAndResume(nota),
        contenido: content.concat('Fin de la nota').join('\n'),
        ...getDataAudio(nota.Termicas, dataAudio),
        categoria: nota.category,
        authors: nota.credits?.by?.map(a => a.name) ?? [],
        autores: nota.credits?.by?.map(Author) ?? []
    };
};

export default indexNotaText;
