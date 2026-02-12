import get from '../../../../components/private/common/utils/get';
import config from './config';

const { disableSubtypes, disableSubtypesForApps } = config;

const AUDIO_STATUS = {
    CREATED_AUDIO: 6,
    UPDATED_AUDIO: 7
};

const RELEASE_DATE_FOR_AUDIO_STATUS = 20250401;

const getCommonProperties = data => ({
    sourceOrigin: get(data, 'source.system', ''),
    subtype: get(data, 'subtype', ''),
    labelAudioNews: get(data, 'label.republicar_audio', null),
    textAudioNews: get(data, 'label.republicar_audio.text', ''),
    date: get(data, 'first_publish_date', get(data, 'display_date', '')),
    contentElements: get(data, 'content_elements', []),
    primarySectionId: get(data, 'taxonomy.primary_section._id', ''),
    wordCount: get(data, 'planning.story_length.word_count_actual', null),
    audioStatus: get(
        data,
        'promo_items.audio_nota.embed.config.audio_status',
        null
    )
});

const normalizeDate = date => date.replace(/-|[a-z][^/]+/gi, '');

export const isValidDate = (date = '', releaseDate = 20231123) =>
    Number(normalizeDate(date)) >= releaseDate;

export const isAudioGenerated = audioStatus =>
    audioStatus === AUDIO_STATUS.CREATED_AUDIO ||
    audioStatus === AUDIO_STATUS.UPDATED_AUDIO;

const hasParagraphs = contentElements =>
    contentElements.some(({ type = '' } = {}) => type === 'text');

const isSectionNoListenable = primarySectionId =>
    /^\/(juegos|newsletters|estados-unidos)/i.test(primarySectionId);

const validSourceOrigins = ['composer', ''];

const passesCommonRules = (
    { sourceOrigin, subtype, primarySectionId, date, contentElements },
    isForWeb
) => {
    const baseRules =
        validSourceOrigins.includes(sourceOrigin) &&
        !disableSubtypes.includes(subtype) &&
        !isSectionNoListenable(primarySectionId) &&
        isValidDate(date);

    const webSpecificRule = isForWeb ? hasParagraphs(contentElements) : true;

    return baseRules && webSpecificRule;
};

const passesWebLabelRules = (labelAudioNews, textAudioNews) =>
    !labelAudioNews || textAudioNews !== 'No mostrar audio';

const handleAudioStatusCase = (audioStatus, textAudioNews, isForWeb) => {
    const generated = isAudioGenerated(audioStatus);
    if (!isForWeb) return generated;
    return generated && textAudioNews !== 'No mostrar audio';
};

const handleWebFutureAudioCase = (publishedDate, audioStatus) => {
    if (audioStatus !== null) return true;
    return !isValidDate(publishedDate, RELEASE_DATE_FOR_AUDIO_STATUS);
};

const isListenable = (data, isForWeb = true) => {
    const props = getCommonProperties(data);
    const { audioStatus, labelAudioNews, textAudioNews, date } = props;

    if (audioStatus !== null) {
        return handleAudioStatusCase(audioStatus, textAudioNews, isForWeb);
    }

    if (isForWeb && !handleWebFutureAudioCase(date, audioStatus)) {
        return false;
    }

    return (
        passesCommonRules(props, true) &&
        passesWebLabelRules(labelAudioNews, textAudioNews)
    );
};

export const isNoteListenableForApps = data => {
    const { audioStatus, subtype, wordCount } = getCommonProperties(data);

    return (
        (audioStatus !== null && isAudioGenerated(audioStatus)) ||
        (Number(wordCount) >= 100 &&
            !disableSubtypesForApps.includes(subtype))
    );
};



export const isCustomVoice = data =>
    data?.voice !== undefined && data?.voice != null;

export default data => isListenable(data, true);
