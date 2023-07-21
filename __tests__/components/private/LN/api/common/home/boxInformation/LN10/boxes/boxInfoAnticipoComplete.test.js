import { boxInfoAnticipoComplete } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoAnticipoComplete';
import { boxInfoBasic } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/common/boxBasic';

jest.mock(
    '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/common/boxBasic',
    () => ({
        boxInfoBasic: jest.fn()
    })
);

describe('boxInfoAnticipoComplete', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return boxInfoBasic if box is falsy', () => {
        const information = {};
        const section = 'section';
        const typeSection = 'typeSection';

        const box = null;
        boxInfoBasic.mockReturnValue(box);

        const result = boxInfoAnticipoComplete(
            information,
            section,
            typeSection
        );

        expect(result).toBe(box);
        expect(boxInfoBasic).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
    });
});
