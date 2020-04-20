import getProperties from 'fusion:properties';
import { RESIZER_KEY, RESIZER_URL, RANKING_URL } from 'fusion:environment';
import get from 'lodash.get';
import SourceSetSizes from '../../components/private/LN/home/common/config/sourceSets';
import sourceSetting from './utils/sourceSetting';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';

// TODO: ver filtro en API por "?website=${website || arcSite}"
// TODO: Faltaria el filtrar ára que traiga solo 6 resultados

const resolve = key => {
    const { sectionId, size, page, website } = key;
    const arcSite = key['arc-site'];
    const from = ((page || 1) - 1) * size;
    const basePath = RANKING_URL;
    return basePath;
};

const getPresets = siteProps => {
    const arcSite = siteProps['arc-site'];
    const properties = getProperties(arcSite);

    const presets = get(properties, `imageConfig.resize.notaM`, null);
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
        website: 'text'
    },
    transform,
    ttl: sourceSetting.rankingArticlesSource.ttl
};
