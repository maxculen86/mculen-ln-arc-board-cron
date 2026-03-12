import React from 'react';
import { ARC_STATIC, SITE_FOODIT } from 'fusion:environment';
import {
    getAppId,
    getUrl
} from '../../../../private/common/utils/getMetasOGHelper';
import get from '../../../../private/common/utils/get';

export function MetaFoodit({
    globalContent,
    siteProperties,
    deployment,
    contextPath,
    metaValue
}) {
    const isArticle = !!(globalContent && globalContent.type === 'story');
    const imagePath = `${contextPath}/resources/foodit/assets/images/placeholderFoodit.jpg`;
    const image = `${ARC_STATIC}${deployment(imagePath)}`;

    const isRecetas = get(globalContent, '_id', '') === '/recetas';
    const title = metaValue('title') || 'Foodit';
    const titleRecetas = 'Las mejores recetas están en Foodit.';
    const descriptionRecetas =
        'Encontrá las mejores recetas para todo tipo de platos en Foodit.';
    const description = metaValue('description') || 'Foodit';

    const titleMeta = isRecetas ? titleRecetas : title;
    const descriptionMeta = isRecetas ? descriptionRecetas : description;
    const domain = SITE_FOODIT.replace(/\/$/, '') ?? '';
    const url =
        get(globalContent, 'canonical_url', '') ||
        get(globalContent, '_id', '');

    const urlMeta = getUrl(`${url.startsWith('/') ? '' : '/'}${url}`, domain);

    const metas = [
        {
            name: 'title',
            content: titleMeta
        },
        {
            name: 'description',
            content: descriptionMeta
        },
        {
            property: 'og:title',
            content: titleMeta
        },
        {
            property: 'og:description',
            content: descriptionMeta
        },
        {
            property: 'fb:app_id',
            content: getAppId(siteProperties) || ''
        },
        {
            property: 'og:type',
            content: isArticle ? 'article' : 'website'
        },
        {
            property: 'og:image',
            content: get(globalContent, 'promo_items.basic.url') || image
        },
        {
            property: 'og:image:width',
            content: '512'
        },
        {
            property: 'og:image:height',
            content: '768'
        },
        {
            property: 'og:url',
            content: urlMeta
        },
        {
            property: 'og:site_name',
            content: 'Foodit'
        },
        {
            exclude: !isArticle,
            property: 'article:published_time',
            content: get(globalContent, 'publish_date', '')
        }
    ];
    const metasElement = metas
        .filter(meta => meta && !meta.exclude)
        .map(meta => <meta {...meta} />);

    return (
        <>
            <title>{titleMeta}</title>
            {metasElement}
        </>
    );
}
export default MetaFoodit;
