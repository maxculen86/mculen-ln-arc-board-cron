import addForwardSlash from '../../LN/common/utils/addForwardSlash';
import { setMetaDescription, getData } from '../utils/getMetasOGHelper';

const getMetasOG = props => {
    const data = getData(props);
    const metaTitleFromPB = props.metaValue('title') || '';
    const pageBuilderTitle = metaTitleFromPB.replace(' - LA NACION', '');
    const { section, siteProperties } = props;
    const metas = [
        {
            property: 'fb_app_id',
            content: data.fbAppId
        },
        {
            property: 'og:type',
            content: data.type
        },
        {
            property: 'og:title',
            content: pageBuilderTitle
        },
        {
            property: 'og:description',
            content: setMetaDescription(data, section)
        },
        {
            property: 'og:image',
            content: data.image
        },
        {
            property: 'og:url',
            content: addForwardSlash(data.url)
        }
    ];
    if (data.isArticle) {
        metas.push({
            property: 'article:published_time',
            content: data.publishDate
        });
    }
    if (['home', 'nota', 'acumulado'].includes(section)) {
        metas.push({
            property: 'og:site_name',
            content: siteProperties.title
        });
    }
    return metas;
};

export default getMetasOG;
