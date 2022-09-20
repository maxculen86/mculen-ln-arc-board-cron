import transform from './utils/acuArticlesSource/transform';

const resolve = key => {
    const {
        sectionId,
        excludeSectionId,
        promoItemsOnly,
        authorId,
        tagId,
        subtype,
        size,
        page,
        website,
        distributorId,
        sectionsIds,
        sourceOrigin,
        excludeSourceOrigin
    } = key;

    const arcSite = key['arc-site'];
    const cant = size || 30;
    const from = ((page || 1) - 1) * cant;
    const basePath = `/content/v4/search/published/?website=${website ||
        arcSite}`;

    if (distributorId)
        return `${basePath}&q=type:story&include_distributor_name=${distributorId}&size=${cant}&from=${from}
            &sort=display_date:desc`;

    if (sectionsIds) {
        const includeField =
            '_id,subtype,promo_items,taxonomy.tags,taxonomy.primary_section,credits,headlines.basic,headlines.mobile,subheadlines,content_elements,' +
            'display_date,publish_date,first_publish_date,website_url,display_date,canonical_url,marquesina,label.recomendar.text,related_content,content_restrictions.content_code';

        return `${basePath}&q=type:story+AND+source.system:${sourceOrigin}+AND+taxonomy.sites._id:${sectionsIds}
            &sort=display_date:desc&size=${cant}&from=${from}&_sourceInclude=${includeField}`;
    }

    const sourceOriginFilter =
        sourceOrigin &&
        `},{
            "term": {
                "source.system":"${sourceOrigin}"
        }`;
    const subtypeFilter =
        subtype &&
        `},{
            "term": {
                "subtype":"${subtype}"
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

    let excludeSection = `"/newsletters"`;
    if (excludeSectionId) excludeSection += `,"/recetas"`;

    const notSectionFiltered = `,"must_not":[
            {
                "nested":{
                    "path":"taxonomy.sections",
                    "query":{
                        "bool":{
                            "must":[
                                {
                                    "terms":{
                                        "taxonomy.sections._id":[${excludeSection}]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ]`;

    const notSourceSystemFiltered =
        excludeSourceOrigin &&
        `,"must_not": [
        {
          "match": { "source.system": { "query": "${excludeSourceOrigin}" } }
        }
      ]`;

    const suggestFilter =
        promoItemsOnly &&
        `
        ,{
            "constant_score": {
                "filter": {
                "bool" : {
                     "should": [
                                 { "exists": { "field": "promo_items.basic.url" } },
                                   { "term": { "related_content.basic.referent.type": "image" }  }
                        ]
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
                        ${subtypeFilter || ''}
                        }
                        ${suggestFilter || ''}
                        ${authorFilter || ''}
                        ${sectionFilter || ''}
                        ${tagFilter || ''}
                    ]
                    ${notSectionFiltered || ''}
                    ${notSourceSystemFiltered || ''}
                }
            }
    }`;

    const partialRequest = `${query}&size=${cant}&from=${from}
    &sort=display_date:desc`;
    const request = `${basePath}${query}&size=${cant}&from=${from}
    &sort=display_date:desc`;

    // eslint-disable-next-line no-console
    console.info(`QUERY REQUEST: ${JSON.stringify(partialRequest)}`);

    return request;
};

export default {
    resolve,
    transform,
    params: {
        sectionId: 'text',
        authorId: 'text',
        tagId: 'text',
        subtype: 'text',
        size: 'text',
        page: 'text',
        website: 'text',
        imageConfig: 'text',
        sectionsIds: 'text',
        sourceOrigin: 'text',
        excludeSourceOrigin: 'text',
        excludeSectionId: 'text',
        api: 'bool'
    },
    ttl: 120
};
