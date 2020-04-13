const DEFAULT = {
    TYPE: 'website',
    TITLE: 'LA NACION',
    DESCRIPTION: '',
    IMAGE:
        'https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/pf/resources/images/bco.png?d=29',
    URL: process.env.SITE_LANACION,
    FB_APP_ID: ''
};

const getData = ({ siteProperties, metaValue, globalContent }) => {
    const data = {
        type:
            globalContent &&
            (globalContent.subtype === '1' || globalContent.subtype === '7')
                ? 'article'
                : DEFAULT.TYPE,
        title: metaValue('title') || siteProperties.title || DEFAULT.TITLE,
        description:
            metaValue('description') ||
            (globalContent && globalContent.subheadlines.basic) ||
            DEFAULT.DESCRIPTION,
        image:
            globalContent && globalContent.promo_items.basic.type === 'image'
                ? globalContent.promo_items.basic.url
                : DEFAULT.IMAGE,
        url:
            (globalContent && globalContent.canonical_url) ||
            siteProperties.host,
        fbAppId:
            (siteProperties && siteProperties.shareConfig.facebook.appID) ||
            DEFAULT.FB_APP_ID
    };
    return data;
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
        },
        {
            name: 'fb:app_id',
            content: data.fbAppId
        }
    ];
    return metas;
};

export default getMetasOG;
