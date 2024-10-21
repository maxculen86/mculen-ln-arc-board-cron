import { isCustomVoice } from '../../../../../content/sources/utils/audioNews/helper';
import get from '../../../../private/common/utils/get';
import { getSectionOfRequestUri } from '../../../../private/common/utils/outputTypeHelper';
import { extractDataFromCredits } from '../../../../private/LN/nota/snippet/extractData/extractDataReceta';

const getAudioEvents = (globalContent, globalContentConfig, mode) => {
    const noteId = get(globalContent, '_id', '');
    // Cambiar audioId cuando back nos envíe estos datos
    const audioId = get(globalContent, 'promo_items.audio.audio_id', '');
    const section = getSectionOfRequestUri(globalContentConfig.query.uri);
    const creditsBy = get(globalContent, 'credits.by', '');
    const dataAuthor = get(creditsBy, '[0].additional_properties.original', {});
    const customVoice = isCustomVoice(dataAuthor);
    const adjustedMode = mode === 'article' ? 'full' : mode;
    const { autores } = extractDataFromCredits(creditsBy);

    return {
        autor_nombre: autores || 'N/A',
        method: 'MP3',
        origin: 'nota',
        mode: adjustedMode,
        seccion: section,
        nota_id: noteId,
        audio_id: audioId,
        custom_voice: customVoice
    };
};

export default getAudioEvents;
