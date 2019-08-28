import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4';
import { RESIZER_SECRET, RESIZER_URL } from 'fusion:environment';
import getProperties from 'fusion:properties';
import SourceSetSizes from '../../components/private/LN/home/common/config/sourceSets';

const resolve = key => {
    const { sectionId, size, page, website } = key;
    const arcSite = key['arc-site'];
    const from = ((page || 1) - 1) * size;
    const basePath = `/content/v4/search/published/?website=${website ||
        arcSite}`;

    const sectionFilter =
        sectionId &&
        `{
    ,"nested":{
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
                        ${sectionFilter || ''}
                    ]}
                }
            }`;
    const final = `${basePath}${query}&size=${size || 30}&from=${from}
            &sort=publish_date:desc`;
    return final;
};

const getPresets = () => {
    const presets = {};
    SourceSetSizes.forEach(ss => {
        ss.values.forEach(v => {
            presets[`${ss.name}_${v.name}`] = {
                height: v.value
            };
        });
    });
    return presets;
};

const transform = data => {
    const presets = getPresets();
    return addResizedUrls(data, {
        resizerSecret: RESIZER_SECRET,
        resizerUrl: RESIZER_URL,
        presets
    });
};

export default {
    resolve,
    params: {
        sectionId: 'text',
        size: 'text',
        page: 'text',
        website: 'text'
    },
    transform
};
