import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4';
import { resizerSecret, resizerUrl } from 'fusion:environment';
import getProperties from 'fusion:properties';

const resolve = (key, a) => {
    const { sectionId, website } = key;
    const arcSite = key['arc-site'];
    const basePath = `/content/v4/stories/?website=${website || arcSite}`;

    if (sectionId) return `${basePath}&_id=${sectionId}`;

    throw new Error('Debe definir sectionId o website para obtener la nota');
};

/* const transform = (data, siteProps) => {
    const arcSite = siteProps['arc-site'];
    const properties = getProperties(arcSite);
    const presets = properties.imageConfig.resize.nota.bySubtype[data.subtype];
    const resp = addResizedUrls(data, {
        resizerSecret,
        resizerUrl,
        presets
    });

    resp.imageResizePresets = presets;

    return resp;
}; */

export default {
    resolve,
    // schemaName: source.schemaName,
    params: {
        sectionId: 'text',
        website: 'text'
    }
};
