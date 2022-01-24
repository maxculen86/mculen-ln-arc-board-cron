import transform from './utils/transform';

const resolve = key => {
    const {
        sectionId,
        excludeSectionId,
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

    const query = `&body={
            "query":{
                "bool": {
                    "must": [
                        {
                            "term":
                            {
                                "type":"story"
                            }
                        }
                        ${authorFilter || ''}
                        ${sectionFilter || ''}
                        ${tagFilter || ''}
                    ]
                    ${notSectionFiltered || ''}
                }
            }
    }`;
    return `${basePath}${query}&size=${cant}&from=${from}
            &sort=display_date:desc`;
};

export default {
    resolve,
    params: {
        feedName: 'text',
        size: 'text',
        website: 'text'
    },
    transform,
    ttl: 900
};
