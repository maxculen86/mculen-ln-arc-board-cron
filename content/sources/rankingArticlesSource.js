import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4';
import { RESIZER_SECRET, RESIZER_URL } from 'fusion:environment';
import getProperties from 'fusion:properties';
import SourceSetSizes from '../../components/private/LN/home/common/config/sourceSets';
import { resizerSecret, resizerUrl } from 'fusion:environment';
import get from 'lodash.get';

// TODO: ver filtro en API por "?website=${website || arcSite}"
// TODO: Faltaria el filtrar ára que traiga solo 6 resultados

const resolve = key => {
    const { sectionId, size, page, website } = key;
    const arcSite = key['arc-site'];
    const from = ((page || 1) - 1) * size;
    const basePath = `https://api.demo.arcpublishing.com/feeds/most-read/`;
    return basePath;
};

const getPresets = siteProps => {
    const arcSite = siteProps['arc-site'];
    const properties = getProperties(arcSite);

    const presets = get(properties, `imageConfig.resize.masNotas`, null);
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
        website: 'text'
    },
    transform
};
