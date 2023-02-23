import { boxInfoBasic } from './common/boxBasic';
import { boxInfoComplete } from './common/boxComplete';
import { boxInfoApertura, boxInfoAnticipo } from './LN/index';
import {
    boxInfoApertura as boxInfoAperturaLN10,
    boxInfoAnticipo as boxInfoAnticipoLN10,
    boxInfoExclusiveSuscriptor
} from './LN10/index';

export const boxInfoBySectionAliasLN = {
    'ln-common/cajaanticipo': boxInfoAnticipo,
    apertura: boxInfoApertura,
    default: boxInfoComplete
};

export const boxInfoBySectionAliasLN10 = {
    'ln-common/ln10_anticipo': boxInfoAnticipoLN10,
    apertura: boxInfoAperturaLN10,
    hashtag: boxInfoBasic,
    'sub-exclusive': boxInfoExclusiveSuscriptor,
    default: boxInfoComplete
};

export const boxInfoByLayoutBySectionAlias = (layoutPage, sectionAlias) => {
    const boxesInfoByLayout = {
        'LN-Home_Main': boxInfoBySectionAliasLN,
        'LN10-Home_Main': boxInfoBySectionAliasLN10,
        default: boxInfoBySectionAliasLN
    };
    const boxInfoByLayout =
        boxesInfoByLayout[layoutPage] || boxInfoBySectionAliasLN;
    return boxInfoByLayout[sectionAlias] || boxInfoComplete;
};

export default boxInfoByLayoutBySectionAlias;
