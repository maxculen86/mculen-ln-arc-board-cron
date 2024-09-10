import getProperties from 'fusion:properties';
import get from '../../../components/private/common/utils/get';

const getPresets = siteProps => {
    const properties = getProperties(siteProps['arc-site']);
    const presetsSize = get(siteProps, 'imageConfig', null);
    const presetsDefault = get(properties, 'imageConfig.resize.default', null);
    const presetsCredits = get(
        properties,
        'imageConfig.resize.l.credits',
        null
    );

    return {
        presets: get(properties, `imageConfig.resize.${presetsSize}`, null),
        presetsDefault: { size: presetsDefault },
        presetsCredits
    };
};

export default getPresets;
