import getProperties from 'fusion:properties';
import getSourcesJw from '../../../../components/private/LN/common/utils/getSourcesJw';
import get from '../../../../components/private/common/utils/get';
import { signingServiceCachedCall } from '../signingServiceSource/getImagesAuth';
import { addResizedUrls } from '../../../../components/private/common/utils/image/resizer/addResizerUrls';

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
        variant: url.includes('-h/') ? 'horizontal' : 'vertical',
        type: 'video'
    };
};

export const transformResultWithResizer = async ({
    result,
    arcSite,
    query,
    cachedCall
}) => {
    const imageVideoJw = get(
        result,
        'promo_items.basic.embed.config.videoJw.playlist[0].image',
        null
    );

    const { hash: videoJwHash = '' } = await signingServiceCachedCall(
        imageVideoJw,
        cachedCall
    );

    Object.assign(result.promo_items.basic, {
        auth: { 1: videoJwHash }
    });

    const properties = getProperties('la-nacion-ar');
    const promoItems = get(result, 'promo_items', null);

    const presetsPromoItems = get(
        properties,
        'imageConfig.resize.videoJwImage.promo_items',
        null
    );
    const presetsDefault = get(properties, 'imageConfig.resize.default', null);

    return {
        ...result,
        ...addResizedUrls(
            {
                ...(promoItems && { promo_items: promoItems })
            },
            {
                presets: {
                    promoItems: presetsPromoItems,
                    presetsDefault
                },
                isAdmin: get(query, 'isAdmin', false),
                arcSite
            }
        )
    };
};
