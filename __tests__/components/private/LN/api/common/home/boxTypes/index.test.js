import boxTypeByLayout from '../../../../../../../../components/private/LN/api/common/home/boxTypes';
import { boxTypesLN } from '../../../../../../../../components/private/LN/api/common/home/boxTypes/LN/index';
import { boxTypesLN10 } from '../../../../../../../../components/private/LN/api/common/home/boxTypes/LN10/index';

describe('boxTypeByLayout', () => {
    test('should return the correct box type for layout "LN-Home_Main"', () => {
        const layoutPage = 'LN-Home_Main';
        const expectedBoxType = boxTypesLN[0];
        expect(boxTypeByLayout(layoutPage, 0)).toEqual(expectedBoxType);
    });

    test('should return the correct box type for layout "LN10-Home_Main"', () => {
        const layoutPage = 'LN10-Home_Main';
        const expectedBoxType = boxTypesLN10[1];
        expect(boxTypeByLayout(layoutPage, 1)).toEqual(expectedBoxType);
    });

    test('should return the default box type when layout is not found', () => {
        const layoutPage = 'Unknown_Layout';
        const expectedBoxType = boxTypesLN[1];
        expect(boxTypeByLayout(layoutPage, 1)).toEqual(expectedBoxType);
    });
});
