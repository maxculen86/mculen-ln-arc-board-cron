import { boxInfoBySectionAliasLN } from './LN/index';
import { boxInfoBySectionAliasLN10 } from './LN10/index';

export const boxInfoByLayoutBySectionAlias = (layoutPage, sectionAlias) => {
    const boxesInfoByLayout = {
        'LN-Home_Main': boxInfoBySectionAliasLN,
        'LN10-Home_Main': boxInfoBySectionAliasLN10,
        default: boxInfoBySectionAliasLN
    };
    const sectionAliasDefault = 'default';
    const boxInfoByLayout =
        boxesInfoByLayout[layoutPage] || boxInfoBySectionAliasLN;
    return (
        boxInfoByLayout[sectionAlias] || boxInfoByLayout[sectionAliasDefault]
    );
};

export default boxInfoByLayoutBySectionAlias;
