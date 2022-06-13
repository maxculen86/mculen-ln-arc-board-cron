import getProperties from 'fusion:properties';
import get from '../../../components/private/common/utils/get';
import getImageResized from '../../../components/private/common/utils/getImageResized';
import transformISODate from '../../../components/private/common/utils/transformISODate';

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

    const transformedImage = getImageResized(url, width, height, imageSizes);

    return {
        ...data,
        image: {
            ...image,
            resizedUrls: transformedImage !== [] ? transformedImage : []
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
