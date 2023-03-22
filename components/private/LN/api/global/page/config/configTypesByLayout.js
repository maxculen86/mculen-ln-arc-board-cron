import { configTypesbyChainOrFeature as configAcu } from './config-childs/configTypesbyChainOrFeatureLNAcumulados';
import { configTypesbyChainOrFeature as configLN } from './config-childs/configTypesbyChainOrFeatureLNMain';
import { configTypesbyChainOrFeature as configLN10 } from './config-childs/configTypesbyChainOrFeatureLNMain10';

const configsTypesByLayout = layoutPage => {
    const boxTypeContainer = {
        'LN-acumulado': configAcu,
        'LN-Home_Main': configLN,
        'LN-Home_Sports': configLN,
        'LN10-Home_Main': configLN10,
        default: configLN
    };
    return boxTypeContainer[layoutPage] == null
        ? boxTypeContainer.default
        : boxTypeContainer[layoutPage];
};

export default configsTypesByLayout;
