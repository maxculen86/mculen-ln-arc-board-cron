import { boxInfoApertura } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoApertura';
import { boxInfoBasic } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/common/boxBasic';

jest.mock(
    '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/common/boxBasic',
    () => ({
        boxInfoBasic: jest.fn()
    })
);

describe('boxInfoApertura', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the result of boxInfoBasic function', () => {
        const information = {};
        const section = 'section';
        const typeSection = 'typeSection';
        const box = { parameters: {} };
        boxInfoBasic.mockReturnValue(box);

        const result = boxInfoApertura(information, section, typeSection);

        expect(result).toEqual(box);
        expect(boxInfoBasic).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
    });

    it('should return null if boxInfoBasic returns null', () => {
        const information = {};
        const section = 'section';
        const typeSection = 'typeSection';
        boxInfoBasic.mockReturnValue(null);

        const result = boxInfoApertura(information, section, typeSection);

        expect(result).toBeNull();
        expect(boxInfoBasic).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
    });
});
