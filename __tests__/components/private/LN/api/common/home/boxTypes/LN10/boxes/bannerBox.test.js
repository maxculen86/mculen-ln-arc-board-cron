import { bannerBox } from '../../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN10/boxes/bannerBox';
import { infoLNMainLN10 } from '../../../../../../../../../../components/private/LN/api/common/home/config/configInfoSectionsByLayout';

describe('bannerBox LN10', () => {
    it('should return result when correct info is provided', () => {
        const element = {
            id: 402,
            type: 1,
            sectionAliasMobile: 'Banner',
            position: 'bottom'
        };
        const result = bannerBox(element, infoLNMainLN10);
        expect(result).toEqual({
            tipoSeccion: 'banner',
            idSeccion: 402
        });
    });
});
