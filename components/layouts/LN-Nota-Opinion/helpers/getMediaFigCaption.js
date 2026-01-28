const EMPTY = { text: '', attribution: '' };

const getMediaFigCaption = mediaData => {
    if (!mediaData) return EMPTY;

    const { caption, credits, distributor, type, subtype, embed } = mediaData;

    if (type === 'image') {
        const author = credits?.by?.[0]?.name;
        const source = distributor?.name;

        return {
            text: caption ?? '',
            attribution: [author, source].filter(Boolean).join(' - ')
        };
    }

    if (subtype === 'video_jw') {
        return {
            text: embed?.config?.videoJw?.epigraphTitle ?? '',
            attribution: ''
        };
    }

    return EMPTY;
};

export default getMediaFigCaption;
