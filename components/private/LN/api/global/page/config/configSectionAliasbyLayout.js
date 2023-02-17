import configSectionAliasbyFeatureOrChain from './configSectionAliasbyFeatureOrChain';
import { configSectionAliasbyFeatureOrChain as configV2 } from '../../../v2/mobile/home/config/configSectionAliasbyFeatureOrChain';

const configSectionAliasbyLayout = layoutPage => {
    const boxToSetSectionAliasMobile = {
        'LN-acumulado': configSectionAliasbyFeatureOrChain,
        'LN-Home_Main': configSectionAliasbyFeatureOrChain,
        'LN-Home_Sports': configSectionAliasbyFeatureOrChain,
        'LN10-Home_Main': configV2,
        default: configSectionAliasbyFeatureOrChain
    };
    return boxToSetSectionAliasMobile[layoutPage] == null
        ? boxToSetSectionAliasMobile.default
        : boxToSetSectionAliasMobile[layoutPage];
};

export default configSectionAliasbyLayout;
