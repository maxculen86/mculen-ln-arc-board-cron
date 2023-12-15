import getSourcesJw from '../../../../components/private/LN/common/utils/getSourcesJw';

export const getMediaJwData = (data, url) => {
    const parsedData = JSON.parse(data);
    const { title = '', description = '', playlist = [] } = parsedData;
    const [_playlist] = playlist;

    const publishDate = new Date(_playlist.pubdate * 1000);

    const minStreamUrl = getSourcesJw(_playlist.sources).file;

    return {
        _id: _playlist.mediaid,
        canonical_url: url,
        headlines: {
            basic: title,
            meta_title: title
        },
        description: {
            basic: description
        },
        duration: _playlist.duration,
        first_publish_date: publishDate,
        created_date: publishDate,
        publish_date: publishDate,
        min_stream: {
            url: minStreamUrl
        },
        streams: _playlist.sources,
        promo_items: {
            basic: {
                embed: { config: { videoJw: { ...parsedData } } },
                url: _playlist.image,
                type: 'image'
            }
        },
        type: 'video'
    };
};
