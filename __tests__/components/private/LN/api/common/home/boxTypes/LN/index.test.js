import boxTypesLN from '../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN/index';
import { storyBox } from '../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN/boxes/storyBox';
import { bannerBox } from '../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN/boxes/bannerBox';
import { anexoMobileBox } from '../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN/boxes/anexoMobileBox';
import { anticipoBox } from '../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN/boxes/anticipoBox';
import { sectionAcuBox } from '../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN/boxes/sectionAcumuladoBox';
import { titleBox } from '../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN/boxes/titleBox';

describe('boxTypesLN', () => {
    it('should contain the story box', () => {
        expect(boxTypesLN[0]).toBe(storyBox);
    });

    it('should contain the banner box', () => {
        expect(boxTypesLN[1]).toBe(bannerBox);
    });

    it('should contain the mobile annex box', () => {
        expect(boxTypesLN[2]).toBe(anexoMobileBox);
    });

    it('should contain the advance box', () => {
        expect(boxTypesLN[3]).toBe(anticipoBox);
    });

    it('should contain the accumulated section title box', () => {
        expect(boxTypesLN[4]).toBe(titleBox);
    });
    it('should contain the accumulated section box', () => {
        expect(boxTypesLN[5]).toBe(sectionAcuBox);
    });
});
