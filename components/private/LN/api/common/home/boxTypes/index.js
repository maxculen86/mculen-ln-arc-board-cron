import { boxTypesLN } from './LN/index';
import { boxTypesLN10 } from './LN10/index';

export const boxTypeByLayout = (layoutPage, type) => {
    const boxesTypesByLayout = {
        'LN-Home_Main': boxTypesLN,
        'LN10-Home_Main': boxTypesLN10
    };
    const boxType = boxesTypesByLayout[layoutPage] || boxTypesLN;
    return boxType[type];
};

export default boxTypeByLayout;
