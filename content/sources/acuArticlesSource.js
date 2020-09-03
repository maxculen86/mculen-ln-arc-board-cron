import get from 'lodash.get';
import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import getProperties from 'fusion:properties';
import sourceSetting from './utils/sourceSetting';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import getBajadaOrFirstTextParagraph from '../../components/private/common/utils/getBajadaOrFirstTextParagraph';

const resolve = key => {
    const {
        sectionId,
        excludeSectionId,
        promoItemsOnly,
        authorId,
        tagId,
        size,
        page,
        website
    } = key;
    const arcSite = key['arc-site'];
    const cant = size || 30;
    const from = ((page || 1) - 1) * cant;
    const basePath = `/content/v4/search/published/?website=${website ||
        arcSite}`;

    const sectionFilter =
        sectionId &&
        `,{
            "nested":{
                "path":"taxonomy.sections",
                "query":{
                    "bool":{
                        "must":[
                            {
                                "term":{
                                    "taxonomy.sections._id":"${sectionId}"
                                }
                            }
                        ]
                    }
                }
            }
        }`;

    const authorFilter =
        authorId &&
        `,{
            "match":{
                "credits.by._id":"${authorId}"
            }
        }`;

    const tagFilter =
        tagId &&
        `,{
            "match":{
                "taxonomy.tags.slug":"${tagId}"
            }
        }`;

    const notSectionFiltered =
        excludeSectionId &&
        `,"must_not":[
            {
                "nested":{
                    "path":"taxonomy.sections",
                    "query":{
                        "bool":{
                            "must":[
                                {
                                    "term":{
                                        "taxonomy.sections._id":"/recetas"
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ]`;

    const suggestFilter =
        promoItemsOnly &&
        `
        ,{
            "constant_score": {
                "filter": {
                    "exists": {
                        "field": "promo_items.basic.url"
                    }
                }
            }
        }`;

    const query = `&body={
            "query":{
                "bool": {
                    "must": [
                        {
                            "term":
                            {
                                "type":"story"
                            }
                        },{
                            "term": {
                                "revision.published": true
                            }
                        }
                        ${suggestFilter || ''}
                        ${authorFilter || ''}
                        ${sectionFilter || ''}
                        ${tagFilter || ''}
                    ]
                    ${notSectionFiltered || ''}
                }
            }
    }`;
    const final = `${basePath}${query}&size=${cant}&from=${from}
            &sort=display_date:desc`;
    return final;
};

/* const getPresets = siteProps => {
    const arcSite = siteProps['arc-site'];
    const properties = getProperties(arcSite);

    const presets = get(
        properties,
        `imageConfig.resize.[${siteProps.imageConfig}]`,
        null
    );
    return presets;
};
 */
const transform = (data, siteProps) => {
    const respData = data;
    const properties = getProperties(siteProps['arc-site']);
    //console.log(JSON.stringify(data))
    const presetsDefault = get(properties, `imageConfig.resize.default`, null);
    const presetsM = get(properties, `imageConfig.resize.m`, null);

    respData.content_elements = data.content_elements.map(elem => {
        return addResizedUrls(elem, {
            resizerSecret: RESIZER_KEY,
            resizerUrl: RESIZER_URL,
            presets: {
                promoItems: presetsM.promo_items || presetsDefault,
                contentElements: presetsM.content_elements || presetsDefault,
                presetsDefault
            }
        });
    });
/*
    data.content_elements.forEach(elem => {
        elem.content_elements.forEach(subElem => {
            subElem.subheadText = getBajadaOrFirstTextParagraph(subElem);

        })
    });*/
    
    return respData;
};

export default {
    resolve,
    params: {
        sectionId: 'text',
        size: 'text',
        page: 'text',
        website: 'text',
        imageConfig: 'text'
    },
    transform,
    ttl: sourceSetting.acuArticlesSource.ttl
};
