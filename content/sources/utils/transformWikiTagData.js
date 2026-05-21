import getProperties from 'fusion:properties';
import { API_ENV } from 'fusion:environment';
import get from '../../../components/private/common/utils/get';
import transformISODate from '../../../components/private/common/utils/transformISODate';
import { resizeUrlCollection } from '../../../components/private/common/utils/image/resizer/v2/resizerHelper';

const SITE_LANACION_PROD = 'https://www.lanacion.com.ar';

export const replaceUrlOrigin = (_url = '') => {
    if (!_url) return '';

    try {
        const parsedUrl = new URL(_url);
        const targetSiteUrl = new URL(SITE_LANACION_PROD);

        parsedUrl.protocol = targetSiteUrl.protocol;
        parsedUrl.host = targetSiteUrl.host;

        return parsedUrl.toString();
    } catch {
        return _url;
    }
};

export const normalizeResizedImageUrls = (resizedUrlsArray = []) =>
    resizedUrlsArray.map(item => ({
        ...item,
        resizedUrl: replaceUrlOrigin(item.resizedUrl)
    }));

const transformWikiTagData = (data, siteProps) => {
    const { imageConfig = 'wikiTag', arcSite = 'la-nacion-ar' } = siteProps;
    const { image = {}, schemas_info: schemasInfo = {} } = data;
    const { width = '', height = '', url = '' } = image;

    const properties = getProperties(arcSite);
    const imageSizesDefault = get(properties, `imageConfig.resize.default`, []);

    const imageSizes = get(
        properties,
        `imageConfig.resize.${imageConfig}.promo_items.sizes`,
        imageSizesDefault
    );

    const transformedImage = resizeUrlCollection({
        originalUrl: url,
        originalWidth: width,
        originalHeight: height,
        defaultResizeWithSmart: imageSizes,
        arcImage: image,
        arcSite
    });

    const resizedUrls =
        API_ENV === 'prod'
            ? transformedImage || []
            : normalizeResizedImageUrls(transformedImage);

    return {
        ...data,
        image: {
            ...image,
            resizedUrls
        },
        schemas_info: {
            ...data.schemas_info,
            ...(schemasInfo.birth_date && {
                birth_date: transformISODate(
                    schemasInfo.birth_date,
                    'yyyy/mm/dd'
                )
            }),
            ...(schemasInfo.founding_date && {
                founding_date: transformISODate(
                    schemasInfo.founding_date,
                    'yyyy/mm/dd'
                )
            })
        }
    };
};

export default transformWikiTagData;
