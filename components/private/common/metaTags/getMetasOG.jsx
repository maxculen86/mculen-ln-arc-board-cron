import addForwardSlash from '../../LN/common/utils/addForwardSlash';
import {
    setMetaDescription,
    setMetaTitle,
    getData
} from '../utils/getMetasOGHelper';
import { getSectionOfRequestUri } from '../utils/outputTypeHelper';
import { RECETA } from '../utils/subtypes/subtypeHelper';
import config from '../../../../properties/sites/la-nacion-ar';
import {
    getModifiedDate,
    getPublishDate
} from '../utils/schema/liveBlog/generatePostObject';

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

    const { layoutsName = {} } = config || {};
    const data = getData(props);
    const {
        displayDate,
        firstPublishDate,
        lastUpdatedDate,
        image,
        fbAppId,
        type,
        url,
        isArticle
    } = data;

    const isReceta = subtype === RECETA;
    const isRecetaOrMisNotas =
        getSectionOfRequestUri(requestUri) === 'mis-notas' || isReceta;

    const metaTitleFromPB = isReceta ? title : metaValue('title') || '';

    const pageBuilderTitle = isRecetaOrMisNotas
        ? metaTitleFromPB
        : metaTitleFromPB.replace(' - LA NACION', '');

    const ogMetas = [
        {
            property: 'og:type',
            content: type
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
            property: 'og:locale',
            content: 'es_AR'
        },
        {
            property: 'og:image',
            content: image.url
        },
        {
            property: 'og:image:type',
            content: image.type
        },
        ...(image.alt
            ? [{ property: 'og:image:alt', content: image.alt }]
            : []),
        {
            property: 'og:image:width',
            content: image.width
        },
        ...(image.height
            ? [{ property: 'og:image:height', content: image.height }]
            : []),
        {
            property: 'og:url',
            content: addForwardSlash(url)
        },
        ...(['home', 'nota', 'acumulado'].includes(section) ||
        (arcSite === 'ott' && layout === layoutsName.OttFicha)
            ? [{ property: 'og:site_name', content: siteProperties.title }]
            : [])
    ];

    const fbMetas = [
        {
            property: 'fb:app_id',
            content: fbAppId
        }
    ];

    const twitterMetas = [
        {
            name: 'twitter:image',
            content: image.url
        }
    ];

    const articleMetas = isArticle
        ? [
              {
                  property: 'article:published_time',
                  content: getPublishDate(firstPublishDate, displayDate)
              },
              {
                  property: 'article:modified_time',
                  content: getModifiedDate(lastUpdatedDate, displayDate)
              }
          ]
        : [];

    return [...fbMetas, ...ogMetas, ...articleMetas, ...twitterMetas];
};

export default getMetasOG;
