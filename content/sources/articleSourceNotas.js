import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4';
import { resizerSecret, resizerUrl } from 'fusion:environment';
import getProperties from 'fusion:properties';

const resolve = (key, a) => {
    const { sectionId, website, cantidadNotas = 10 } = key;
    const arcSite = key['arc-site'];
    const basePath = `/content/v4/search/published/?website=${website ||
        arcSite}`;

    if (sectionId) {
        const query = `body={
            "query":{
                "bool": {
                    "must": [
                        {
                            "term":
                            {
                                "type":"story"
                            }
                        },
                        {
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
                        }
                    ]}
                }
            }&size=${cantidadNotas}
            &sort=publish_date:desc`;
        const final = `${basePath}&${query}`;
        console.log('-------------------', final);
        return final;
    }

    throw new Error('Debe definir sectionId o website para obtener la nota');
};

const transform = (data, siteProps) => {
    console.log('---------------------', siteProps);
    const arcSite = siteProps['arc-site'];
    const properties = getProperties(arcSite);
    const presets =
        properties.imageConfig.resize.masNotas.byDestination[
            siteProps.destination
        ];
    const resp = addResizedUrls(data, {
        resizerSecret,
        resizerUrl,
        presets
    });

    resp.imageResizePresets = presets;

    return resp;
};

export default {
    resolve,
    // schemaName: source.schemaName,
    params: {
        sectionId: 'text',
        website: 'text',
        destination: 'text',
        cantidadNotas: 'number'
    },
    transform
};
