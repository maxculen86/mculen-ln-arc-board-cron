import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import {
    FOTOAL100,
    STORYTELLING
} from '../../components/private/common/utils/subtypes/subtypeHelper';
import get from '../../components/private/common/utils/get';
import getPresets from './utils/presets';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import {
    addHoursAndFormat,
    hasFutureDisplayDate,
    isOlderThan24HourAgo
} from '../../components/private/common/utils/dateAndTimeUtil';

const resolve = key => {
    const {
        sectionId,
        excludeSectionId,
        promoItemsOnly,
        authorId,
        tagId,
        size,
        page,
        website,
        distributorId,
        sectionsIds,
        sourceOrigin
    } = key;

    const arcSite = key['arc-site'];
    const cant = size || 30;
    const from = ((page || 1) - 1) * cant;
    const basePath = `/content/v4/search/published/?website=${website ||
        arcSite}`;

    if (distributorId)
        return `${basePath}&q=type:story&include_distributor_name=${distributorId}&size=${cant}&from=${from}
            &sort=display_date:desc`;

    console.log(sectionsIds);
    if (sectionsIds) {
        const includeField =
            '_id,subtype,promo_items,taxonomy.tags,taxonomy.primary_section,credits,headlines.basic,headlines.mobile,subheadlines,content_elements,display_date,publish_date,website_url,display_date,website_url,marquesina,label.recomendar.text,related_content';
        return `${basePath}&q=type:story+AND+source.system:${sourceOrigin}+AND+taxonomy.sites._id:${sectionsIds}
            &sort=display_date:desc&size=${size}&from=${from}&_sourceInclude=${includeField}`;
    }

    const sourceOriginFilter =
        sourceOrigin &&
        `},{
            "term": {
                "source.system":"${sourceOrigin}"
        }`;

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
                        ${sourceOriginFilter || ''}
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

const transform = (data, siteProps) => {
    // console.log('Source', data)
    const respData = data;
    const { content_elements: contentElements } = data || {};
    const { presets, presetsDefault } = getPresets(siteProps);
    const { sectionsIds } = siteProps;

    const presetsPromoItems = get(presets, 'promo_items', null);

    respData.content_elements =
        contentElements &&
        contentElements.map(elem => {
            const promoItems = get(elem, `promo_items`, null);
            const subtype = get(elem, `subtype`, null);
            const isFotoAl100orStorytelling =
                subtype === FOTOAL100 || subtype === STORYTELLING;
            return {
                ...elem,
                ...addResizedUrls(
                    { ...(promoItems && { promo_items: promoItems }) },
                    {
                        resizerSecret: RESIZER_KEY,
                        resizerUrl: RESIZER_URL,
                        presets: {
                            promoItems: presetsPromoItems,
                            presetsDefault
                        },
                        // Se pasa el subtype para que las notas de foto al 100
                        // y storytelling no sean excluidas de las validaciones del resizer
                        // y pueda aplicarse 3:2, focal point o smartcrop
                        subtype: isFotoAl100orStorytelling ? '-1' : subtype
                    }
                )
            };
        });

    // De todos los Content Elements, solo traigo el primero que sea parrafo
    // (para no mandar mas info innecesaria)
    respData.content_elements = respData.content_elements.map(story => {
        return {
            ...story,
            content_elements: [
                (story.content_elements &&
                    story.content_elements.find(e => e.type === 'text')) ||
                    {}
            ]
        };
    });

    // Si es ultimas noticias, tengo que formatear la fecha y sacar aquellos articulos anteriores a 24 hs
    if (sectionsIds) {
        respData.content_elements = respData.content_elements
            .filter(story => !isOlderThan24HourAgo(story.first_publish_date))
            .filter(story => !hasFutureDisplayDate(story.display_date))
            .map(story => {
                return {
                    ...story,
                    display_date: addHoursAndFormat(-3, story.display_date)
                };
            });
        if (respData.content_elements.length === 0) {
            respData.next = 0;
        }
    }

    return respData;
};

export default {
    resolve,
    params: {
        sectionId: 'text',
        authorId: 'text',
        tagId: 'text',
        size: 'text',
        page: 'text',
        website: 'text',
        imageConfig: 'text',
        sectionsIds: 'text',
        sourceOrigin: 'text'
    },
    transform,
    ttl: 120
};
