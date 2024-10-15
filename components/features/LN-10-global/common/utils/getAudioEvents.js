import { useContent } from 'fusion:content';
import { isCustomVoice } from '../../../../../content/sources/utils/audioNews/helper';
import filter from '../../../../../content/filters/LN/nota/audio';
import get from '../../../../private/common/utils/get';
import { getSectionOfRequestUri } from '../../../../private/common/utils/outputTypeHelper';
import { extractDataFromCredits } from '../../../../private/LN/nota/snippet/extractData/extractDataReceta';

const getAudioEvents = (globalContent, globalContentConfig, mode) => {
    const noteId = get(globalContent, '_id', '');
    const searchData = {
        source: 'audionewsSource',
        query: { id: noteId },
        filter,
        staticMode: false
    };

    const dataAudio = useContent(searchData);
    const audioId = get(dataAudio, 'audio_id', '');
    const section = getSectionOfRequestUri(globalContentConfig.query.uri);
    const creditsBy = get(globalContent, 'credits.by', '');
    const customVoice = isCustomVoice(dataAudio);
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
