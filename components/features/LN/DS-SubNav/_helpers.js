import { SITE_LANACION } from 'fusion:environment';
import capitalizeFirstLetter from '../../../private/common/utils/capitalizeFirstLetter';
import textSelector from '../../../private/common/utils/recetaDictionary';
import get from '../../../private/common/utils/get';
import replaceUrlResizerToWWW from '../../../../content/sources/utils/replaceUrlResizerToWWW';

export const setTitle = (
    replaceTitle,
    { Payload, node_type: nodeType, name, byline } = {}
) => {
    if (replaceTitle) return capitalizeFirstLetter(replaceTitle);
    if (Payload?.items?.[0]?.name) {
        return capitalizeFirstLetter(Payload.items[0].name);
    }
    if (nodeType === 'section') return capitalizeFirstLetter(name);
    if (byline) return capitalizeFirstLetter(byline);
    return '';
};

export const setUrl = ({
    _id: id,
    canonical_url: canonicalUrl,
    node_type: nodeType
} = {}) => {
    if (nodeType === 'tags') return `${SITE_LANACION}${canonicalUrl || ''}`;
    if (nodeType === 'section') return `${SITE_LANACION}${id}/`;
    return SITE_LANACION;
};

export const getPrefixText = (isPrimarySec, title, url, prefixTitle) => {
    if (!prefixTitle || !title) return '';
    if (isPrimarySec || !url?.includes('/recetas')) return '';
    return `${prefixTitle} `;
};

export const buildCategories = (navigationList, colorCategory) => {
    if (!navigationList?.length) return null;

    return navigationList.filter(Boolean).map(item => {
        const {
            _id: id,
            navigation,
            name = '',
            node_type: nodeType,
            url: categoryUrl,
            display_name: displayName,
            parent
        } = item;

        const navTitle = navigation?.nav_title;
        const isLink = nodeType === 'link';
        const displayText = navTitle || (isLink && displayName) || name;
        const acuName = parent?.default || '';

        return {
            key: id,
            link: (isLink && categoryUrl) || `${id}/`,
            textname: displayText,
            title: acuName.includes('/recetas')
                ? `Ir a notas de ${textSelector(name)}`
                : `Ir a ${displayText}`,
            ...(colorCategory && { style: { color: colorCategory } })
        };
    });
};

export const isPrimarySection = sectionId => {
    if (!sectionId) return false;
    return sectionId.split('/').filter(Boolean).length === 1;
};

export const buildSubNavContentData = ({
    customFields,
    globalContent,
    navigation,
    isPrimary,
    colorCategory,
    logoImage,
    idLogoImage
}) => {
    const replaceTitle = get(customFields, 'replaceTitle', null);
    const prefixTitle = get(customFields, 'prefixTitle', null);
    const sectionId = get(globalContent, '_id', '');

    const title = setTitle(replaceTitle, globalContent);
    const url = setUrl(globalContent);
    const prefixText = getPrefixText(isPrimary, title, url, prefixTitle);
    const titleText = `${prefixText}${title}`;
    const categories = buildCategories(navigation, colorCategory);

    const wwwImage = replaceUrlResizerToWWW(logoImage || {});
    const {
        width,
        height,
        url: imageUrl,
        resized_urls: [firstResizedUrl] = []
    } = wwwImage || {};

    const resizedUrl = get(firstResizedUrl, 'resizedUrl', '');
    const { width: resizedWidth, height: resizedHeight } = get(
        firstResizedUrl,
        'option',
        {}
    );

    return {
        sectionId,
        titleText,
        url,
        categories,
        hasLogo: Boolean(idLogoImage),
        isJuegosSection: sectionId === '/juegos',
        imageProps: {
            width: resizedWidth || width,
            height: resizedHeight || height,
            src: resizedUrl || imageUrl
        }
    };
};
