import boxTypesLN10 from '../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN10/index';
import { storyBox } from '../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN10/boxes/storyBox';
import { bannerBox } from '../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN10/boxes/bannerBox';
import { anexoMobileBox } from '../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN10/boxes/anexoMobileBox';
import { anticipoBox } from '../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN10/boxes/anticipoBox';
import { sectionAcuBox } from '../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN10/boxes/sectionAcumuladoBox';
import { titleBox } from '../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN10/boxes/titleBox';
import { dolarBox } from '../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN10/boxes/dolarBox';

describe('boxTypesLN10', () => {
    it('should contain the story box', () => {
        expect(boxTypesLN10[0]).toBe(storyBox);
    });

    it('should contain the banner box', () => {
        expect(boxTypesLN10[1]).toBe(bannerBox);
    });

    it('should contain the mobile annex box', () => {
        expect(boxTypesLN10[2]).toBe(anexoMobileBox);
    });

    it('should contain the advance box', () => {
        expect(boxTypesLN10[3]).toBe(anticipoBox);
    });

    it('should contain the accumulated title box', () => {
        expect(boxTypesLN10[4]).toBe(titleBox);
    });
    it('should contain the Dolar box', () => {
        expect(boxTypesLN10[5]).toBe(dolarBox);
    });

    it('should contain the accumulated section box', () => {
        expect(boxTypesLN10[6]).toBe(sectionAcuBox);
    });
});
