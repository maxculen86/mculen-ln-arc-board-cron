import { useContent } from 'fusion:content';
import filter from '../../../../../content/filters/LN/nota/audio';
import get from '../../utils/get';

function useAudioIdData(globalContent = {}) {
    const noteId = get(globalContent, '_id', '');
    const audioIdPromoItems = get(
        globalContent,
        'promo_items.audio_nota.embed.config.audio_id',
        ''
    );

    const dataAudio = audioIdPromoItems
        ? false
        : {
              source: 'audionewsSource',
              query: { id: noteId },
              filter,
              staticMode: false
          };

    return useContent(dataAudio) || {};
}

export default useAudioIdData;
