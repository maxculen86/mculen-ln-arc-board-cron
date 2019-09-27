import get from 'lodash.get';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import getProperties from 'fusion:properties';

const resolve = key => {
    const { sectionId, authorId, size, page, website, canonicalUrl } = key;
    const arcSite = key['arc-site'];
    const from = ((page || 1) - 1) * size;
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
                    ],
                    "must_not": [
                        {
                            "terms": { 
                                "canonical_url": ["${canonicalUrl}"]
                            }
                        }
                    ]
                }
            }
    }`;
    const final = `${basePath}${query}&size=${size || 30}&from=${from}
            &sort=publish_date:desc`;
    return final;
};

const getPresets = siteProps => {
    const arcSite = siteProps['arc-site'];
    const properties = getProperties(arcSite);

    const presets = get(
        properties,
        `imageConfig.resize.[${siteProps.imageConfig}]`,
        null
    );
    return presets;
};

const transform = (data, siteProps) => {
    const respData = data;
    const presets = getPresets(siteProps);
    respData.content_elements = data.content_elements.map(v => {
        return addResizedUrls(v, {
            resizerSecret: RESIZER_KEY,
            resizerUrl: RESIZER_URL,
            presets
        });
    });
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
    transform
};
