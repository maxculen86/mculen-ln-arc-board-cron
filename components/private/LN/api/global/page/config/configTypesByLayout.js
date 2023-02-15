import configTypesbyChainOrFeature from './configTypesbyChainOrFeature';
import { configTypesbyChainOrFeature as configV1 } from '../../../v1/mobile/home/config/configTypesbyChainOrFeature';
import { configTypesbyChainOrFeature as configV2 } from '../../../v2/mobile/home/config/configTypesbyChainOrFeature';

const configsTypesByLayout = layoutPage => {
    const boxTypeContainer = {
        'LN-acumulado': configTypesbyChainOrFeature,
        'LN-Home_Main': configV1,
        'LN-Home_Sports': configTypesbyChainOrFeature,
        'LN10-Home_Main': configV2,
        default: configTypesbyChainOrFeature
    };
    return boxTypeContainer[layoutPage] == null
        ? boxTypeContainer.default
        : boxTypeContainer[layoutPage];
};

export default configsTypesByLayout;
