import { enumTypeError } from '../../enums/enumTypeError';
import { BackendLnError } from '../../models/backendLnError';
import { boxTypesLN } from './LN/index';
import { boxTypesLN10 } from './LN10/index';
import { boxTypesLN10v2 } from './LN10v2/index';

const discard = (type, layout) => {
    console.warn(
        new BackendLnError(
            `No box is defined for type '${type}' and layout '${layout}'`,
            enumTypeError.featureError
        )
    );
    return () => null;
};

export const boxTypeByLayout = (layoutPage, type) => {
    const boxesTypesByLayout = {
        'LN-Home_Main': boxTypesLN,
        'LN10-Home_Main': boxTypesLN10,
        'LN10-Home_Main-V2': boxTypesLN10v2,
        'LN-acumulado': boxTypesLN10v2
    };
    const boxType = boxesTypesByLayout[layoutPage] || boxTypesLN;
    return boxType[type] ?? discard(type, layoutPage);
};

export default boxTypeByLayout;
