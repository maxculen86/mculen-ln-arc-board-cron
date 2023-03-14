import addForwardSlash from '../../LN/common/utils/addForwardSlash';
import {
    setMetaDescription,
    setMetaTitle,
    getData
} from '../utils/getMetasOGHelper';
import { getSectionOfRequestUri } from '../utils/outputTypeHelper';
import { RECETA } from '../utils/subtypes/subtypeHelper';
import config from '../../../../properties/sites/la-nacion-ar';

const { layoutsName = {} } = config || {};

const getMetasOG = props => {
    const {
        title = '',
        section,
        siteProperties,
        arcSite,
        ottMetaTitle,
        ottMetaDescription,
        requestUri,
        metaValue,
        subtype,
        layout
    } = props;

    const data = getData(props);
    const metaTitleFromPB =
        subtype === RECETA ? title : metaValue('title') || '';

    const pageBuilderTitle =
        getSectionOfRequestUri(requestUri) === 'mis-notas' || subtype === RECETA
            ? metaTitleFromPB
            : metaTitleFromPB.replace(' - LA NACION', '');

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
            content: setMetaTitle({
                arcSite,
                pageBuilderTitle,
                section,
                siteProperties,
                ottMetaTitle
            })
        },
        {
            property: 'og:description',
            content: setMetaDescription({
                data,
                section,
                siteProperties,
                arcSite,
                ottMetaDescription,
                requestUri,
                metaValue
            })
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
    if (
        ['home', 'nota', 'acumulado'].includes(section) ||
        (arcSite === 'ott' && layout === layoutsName.OttFicha)
    ) {
        metas.push({
            property: 'og:site_name',
            content: siteProperties.title
        });
    }
    return metas;
};

export default getMetasOG;
