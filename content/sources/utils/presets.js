import getProperties from 'fusion:properties';
import get from '../../../components/private/common/utils/get';

const getPresets = siteProps => {
    const properties = getProperties(siteProps['arc-site']);
    const presetsSize = get(siteProps, 'imageConfig', null);
    const presetsDefault = get(properties, 'imageConfig.resize.default', null);

    return {
        presets: get(properties, `imageConfig.resize.${presetsSize}`, null),
        presetsDefault: { size: presetsDefault }
    };
};

export default getPresets;
