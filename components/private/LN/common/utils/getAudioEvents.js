import { useContent } from 'fusion:content';
import { isCustomVoice } from '../../../../../content/sources/utils/audioNews/helper';
import get from '../../../common/utils/get';
import { getSectionOfRequestUri } from '../../../common/utils/outputTypeHelper';
import filter from '../../../../../content/filters/LN/nota/audio';

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
    const authorName = get(globalContent, 'credits.by[0].name', '');
    const customVoice = isCustomVoice(dataAudio);
    const adjustedMode = mode === 'article' ? 'full' : mode;

    return {
        autor_nombre: authorName,
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
