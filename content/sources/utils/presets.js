import getProperties from 'fusion:properties';
import get from '../../../components/private/common/utils/get';

const getPresets = siteProps => {
    const properties = getProperties(siteProps['arc-site']);
    const presetsSize = get(siteProps, 'imageConfig', 'default');
    const presetsDefault = get(properties, 'imageConfig.resize.default', null);

    return {
        presets: get(
            properties,
            `imageConfig.resize.${presetsSize}`,
            presetsDefault
        ),
        presetsDefault
    };
};

export default getPresets;
