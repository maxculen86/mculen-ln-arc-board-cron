import getAssetsPath from '../utils/getAssetsPath';

const isNote = globalContent =>
    !!(
        globalContent &&
        (globalContent.subtype === '1' || globalContent.subtype === '7')
    );

const getData = ({
    siteProperties,
    metaValue,
    globalContent,
    contextPath,
    deployment
}) => {
    const isArticle = isNote(globalContent);

    const PLACEHOLDER = getAssetsPath(contextPath)(deployment)(
        'placeholderLN.jpg'
    );

    const DEFAULT = {
        TITLE: 'LA NACION',
        DESCRIPTION: '',
        IMAGE: PLACEHOLDER,
        URL: process.env.SITE_LANACION,
        FB_APP_ID: ''
    };

    return {
        type: isArticle ? 'article' : 'website',
        title: isArticle
            ? (globalContent && globalContent.headlines.basic) || DEFAULT.TITLE
            : metaValue('title') || siteProperties.title || DEFAULT.TITLE,
        description: isArticle
            ? (globalContent && globalContent.subheadlines.basic) ||
              DEFAULT.DESCRIPTION
            : metaValue('description') || DEFAULT.DESCRIPTION,
        image:
            globalContent &&
            globalContent.promo_items.basic.type === 'image' &&
            globalContent.promo_items.basic.url
                ? globalContent.promo_items.basic.url
                : DEFAULT.IMAGE,
        url:
            (globalContent && globalContent.canonical_url) ||
            siteProperties.host
        // TODO: considerar agregar el fbAppId para evitar los warning del depurador de FB
        // fbAppId:
        //     (siteProperties && siteProperties.shareConfig.facebook.appID) ||
        //     DEFAULT.FB_APP_ID;
    };
};

const getMetasOG = props => {
    const data = getData(props);

    const metas = [
        {
            property: 'og:type',
            content: data.type
        },
        {
            property: 'og:title',
            content: data.title
        },
        {
            property: 'og:description',
            content: data.description
        },
        {
            property: 'og:image',
            content: data.image
        },
        {
            property: 'og:url',
            content: data.url
        }
        // TODO: considerar agregar el fbAppId para evitar los warning del depurador de FB
        //     name: 'fb:app_id',
        //     content: data.fbAppId
    ];
    return metas;
};

export default getMetasOG;
