import { boxTypesLN } from './LN/index';
import { boxTypesLN10 } from './LN10/index';
import { boxTypesLN10v2 } from './LN10v2/index';

const discard = () => () => null;

export const boxTypeByLayout = (layoutPage, type) => {
    const boxesTypesByLayout = {
        'LN-Home_Main': boxTypesLN,
        'LN10-Home_Main': boxTypesLN10,
        'LN10-Home_Main-V2': boxTypesLN10v2,
        'LN-acumulado': boxTypesLN10v2
    };
    const boxType = boxesTypesByLayout[layoutPage] || boxTypesLN;
    return boxType[type] ?? discard();
};

export default boxTypeByLayout;
