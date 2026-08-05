import { SITE_LANACION } from 'fusion:environment';
import get from '../../../../common/utils/get';
import getAuthorByline from '../../../../common/utils/getAuthorByline';
import { addForwardSlash } from '../../../common/utils/addForwardSlash';
import { extractDataFromPromoItems } from '../../../common/utils/extractDataFromPromoItems';
import { getImageProps } from '../../../../common/utils/getMetasOGHelper';
import { replaceUrlResizerToWWW } from '../../../../common/utils/image/resizer/v2/resizerHelper';

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

const SOCIAL_PROFILES = [
    { site: 'twitter', baseUrl: 'https://twitter.com/' },
    { site: 'instagram', baseUrl: 'https://www.instagram.com/' },
    { site: 'facebook', baseUrl: 'https://www.facebook.com/' },
    { site: 'linkedin', baseUrl: 'https://www.linkedin.com/in/' },
    { site: 'youtube', baseUrl: 'https://www.youtube.com/' },
    { site: 'tiktok', baseUrl: 'https://www.tiktok.com/@' },
    { site: 'personal_website' }
];

const formatSocialUrl = (value, baseUrl) => {
    if (!value) return '';
    if (value.startsWith('http')) return value;
    if (!baseUrl) return value;

    return `${baseUrl}${value.replace(/^@/, '').replace(/^\/+|\/+$/g, '')}/`;
};

export const getAuthorUrl = author => {
    const authorId = get(author, '_id', '');
    const authorPath =
        (authorId && `/autor/${authorId}/`) ||
        get(author, 'additional_properties.original.bio_page', '') ||
        get(author, 'url', '');

    return authorPath.startsWith('http')
        ? authorPath
        : `${SITE_LANACION}${authorPath}`;
};

export const buildAuthorPersonSchema = (author = {}) => {
    const original = get(author, 'additional_properties.original', {});
    const socialLinks = get(author, 'social_links', []);
    const authorUrl = getAuthorUrl(author);
    const imageUrl =
        get(author, 'image.url', '') ||
        get(author, 'image.resized_urls[0].resizedUrl', '') ||
        original.image;
    const description = (original.longBio || original.bio || '').trim();
    const knowsAbout = original.expertise ? [original.expertise] : [];
    const alumniOf = Array.isArray(original.education)
        ? original.education
              .filter(({ name }) => name)
              .map(({ name }) => ({
                  '@type': 'EducationalOrganization',
                  name
              }))
        : [];
    const affiliation = original.affiliations
        ? [
              {
                  '@type': 'Organization',
                  name: original.affiliations
              }
          ]
        : [];
    const knowsLanguage = original.languages
        ? original.languages.split(',').map(language => language.trim())
        : [];
    const sameAs = SOCIAL_PROFILES.map(({ site, baseUrl }) => {
        const socialLink = Array.isArray(socialLinks)
            ? socialLinks.find(link => link.site === site)
            : null;

        return formatSocialUrl(original[site] || socialLink?.url, baseUrl);
    }).filter((url, index, urls) => url && urls.indexOf(url) === index);

    return {
        '@type': 'Person',
        name: getAuthorByline(author),
        url: authorUrl,
        ...(imageUrl && {
            image: {
                '@type': 'ImageObject',
                url: imageUrl
            }
        }),
        ...(description && { description }),
        ...(knowsAbout.length && { knowsAbout }),
        ...(alumniOf.length && { alumniOf }),
        ...(affiliation.length && { affiliation }),
        ...(knowsLanguage.length && { knowsLanguage }),
        ...(sameAs.length && { sameAs })
    };
};
