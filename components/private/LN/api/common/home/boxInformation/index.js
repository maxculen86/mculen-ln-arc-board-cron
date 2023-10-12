import { boxInfoBySectionAliasLN } from './LN/index';
import { boxInfoBySectionAliasLN10 } from './LN10/index';
import { boxInfoBySectionAcumuladoV2 } from './AcuV2/index';

export const boxInfoByLayoutBySectionAlias = (layoutPage, sectionAlias) => {
    const boxesInfoByLayout = {
        'LN-Home_Main': boxInfoBySectionAliasLN,
        'LN10-Home_Main': boxInfoBySectionAliasLN10,
        'LN-acumulado': boxInfoBySectionAcumuladoV2,
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
