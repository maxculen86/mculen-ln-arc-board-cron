import { boxInfoBomba } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoBomba';
import { boxInfoBasic } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/common/boxBasic';

describe('boxInfoBomba', () => {
    const information = {};
    const section = 'section';
    const typeSection = 'typeSection';

    it('should call boxInfoBasic and return its result', () => {
        const expectedBox = boxInfoBasic(information, section, typeSection);
        const resultBox = boxInfoBomba(information, section, typeSection);
        expect(resultBox).toEqual(expectedBox);
    });
});
