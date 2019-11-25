import get from 'lodash.get';
import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import getProperties from 'fusion:properties';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';

const resolve = key => {
    const { sectionId, authorId, tagId, size, page, website } = key;
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
                }
            }
    }`;
    const final = `${basePath}${query}&size=${cant}&from=${from}
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
