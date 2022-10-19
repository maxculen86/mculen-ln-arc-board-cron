import get from '../../../../components/private/common/utils/get';
import config from './config';

const isNoteListenable = data => {
    const sourceOrigin = get(data, 'source.system', '');
    const subtype = get(data, 'subtype', '');
    const labelAudioNews = get(data, 'label.republicar_audio', null);

    if (sourceOrigin === 'composer' && labelAudioNews) {
        const { disableSubtypes } = config;
        return !disableSubtypes.includes(subtype);
    }

    return false;
};

export default isNoteListenable;
