import get from 'lodash.get';
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4';
import { resizerSecret, resizerUrl } from 'fusion:environment';
import getProperties from 'fusion:properties';

const resolve = key => {
    const { sectionId, authorId, size, page, website } = key;
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
            "path":"credits.by",
            "query":{
                "term":{
                    "credits.by._id":"${authorId}"
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
                        }
                        ${authorFilter || ''}
                        ${sectionFilter || ''}
                        
                        
                    ]}
                }
            }`;
    const final = `${basePath}${query}&size=${size || 30}&from=${from}
            &sort=publish_date:desc`;
    console.log('FINAL::::', final);
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
            resizerSecret: resizerSecret,
            resizerUrl: resizerUrl,
            presets
        });
    });
    respData.imageResizePresets = presets;

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
