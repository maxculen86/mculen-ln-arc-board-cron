import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import { createResizer } from '../../components/private/common/utils/image/resizer';

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
    const final = `${basePath}${query}&size=${cant}&from=${from}
            &sort=display_date:desc`;
    return final;
};

const transform = data => {
    const dataResp = {
        ...data,
        image: { url: data.image || '' }
    };

    if (dataResp.image.url.length === 0) return dataResp;

    return {
        ...dataResp,
        image: {
            url: createResizer(RESIZER_KEY, RESIZER_URL).resizeUrl(
                data.image,
                80,
                80,
                {
                    width: 80,
                    height: 80,
                    media: '(min-width: 320px)',
                    class: '',
                    type: 'image'
                }
            )
        }
    };
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
