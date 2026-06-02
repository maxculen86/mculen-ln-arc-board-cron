import get from '../../../../common/utils/get';
import { addForwardSlash } from '../../../common/utils/addForwardSlash';
import { extractDataFromPromoItems } from '../../../common/utils/extractDataFromPromoItems';
import { getImageProps } from '../../../../common/utils/getMetasOGHelper';
import replaceUrlResizerToWWW from '../../../../../../content/sources/utils/replaceUrlResizerToWWW';

export const buildPrimaryImageOfPage = ({
    basicImage = {},
    placeholder = '',
    acuOgImg = {}
}) => {
    if (get(basicImage, 'type') !== 'image') return null;

    const ogImageData = getImageProps(acuOgImg, basicImage, placeholder, '');
    const description = get(basicImage, 'caption', '');

    return {
        '@type': 'ImageObject',
        width: Number(get(ogImageData, 'width')),
        height: Number(get(ogImageData, 'height')),
        url: get(ogImageData, 'url', placeholder),
        ...(description && { description })
    };
};

export const getSchemaImages = ({
    promoItems = {},
    contentElements = [],
    placeholder = ''
}) => {
    const promoItemsWithWWW = {
        ...promoItems,
        ...(get(promoItems, 'basic.type') === 'image' && {
            basic: replaceUrlResizerToWWW(get(promoItems, 'basic', {}))
        })
    };
    const { image: mainImages } = extractDataFromPromoItems(
        promoItemsWithWWW,
        placeholder
    );
    const mainImageCaption = get(promoItemsWithWWW, 'basic.caption', '');
    const schemaMainImages = mainImages.map(imageItem => ({
        ...imageItem,
        ...(mainImageCaption && { caption: mainImageCaption })
    }));
    const bodySchemaImages = contentElements.flatMap(element => {
        if (get(element, 'type') !== 'image') return [];

        const normalizedImage = replaceUrlResizerToWWW(element);
        const { image } = extractDataFromPromoItems(
            { basic: normalizedImage },
            placeholder
        );
        const imageCaption = get(normalizedImage, 'caption', '');

        return image.map(imageItem => ({
            ...imageItem,
            ...(imageCaption && { caption: imageCaption })
        }));
    });

    return [...schemaMainImages, ...bodySchemaImages].filter(
        (imageItem, index, array) =>
            array.findIndex(item => item.url === imageItem.url) === index
    );
};

export const buildMainEntityFromTags = ({ tags = [], host = '' }) => {
    const itemListElement = tags.reduce((acc, tag, index) => {
        const name = get(tag, 'description', '') || get(tag, 'text', '');
        const slug = get(tag, 'slug', '');

        if (!name) return acc;

        return [
            ...acc,
            {
                '@type': 'ListItem',
                position: index,
                item: {
                    '@type': 'WebPage',
                    ...(slug && {
                        '@id': addForwardSlash(`${host}/tema/${slug}`)
                    }),
                    name
                }
            }
        ];
    }, []);

    return itemListElement.length
        ? {
              '@type': 'ItemList',
              itemListElement
          }
        : null;
};
