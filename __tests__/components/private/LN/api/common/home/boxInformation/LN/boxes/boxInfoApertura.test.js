import { boxInfoApertura } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN/boxes/boxInfoApertura';
import { boxInfoBasic } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/common/boxBasic';
import * as information from '../../../../../../../../../../__mocks__/data/LN10_BoxInformation/information.json';

describe('boxInfoApertura', () => {
    it('should return a box with basic information', () => {
        const section = 'some section';
        const typeSection = 'some typeSection';
        const result = boxInfoApertura(information, section, typeSection);
        const expectedBox = boxInfoBasic(information, section, typeSection);
        expect(result).toEqual(expectedBox);
    });
});
