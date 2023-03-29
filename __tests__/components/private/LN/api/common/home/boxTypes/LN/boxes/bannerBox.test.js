import { bannerBox } from '../../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN/boxes/bannerBox';
import { infoLNMain } from '../../../../../../../../../../components/private/LN/api/common/home/config/configInfoSectionsByLayout';

describe('bannerBox LN9', () => {
    it('should return result when correct info is provided', () => {
        const element = {
            id: 402,
            type: 1,
            sectionAliasMobile: 'Banner',
            position: 'bottom'
        };
        const result = bannerBox(element, infoLNMain);
        expect(result).toEqual({
            tipoSeccion: 'banner',
            idSeccion: 402
        });
    });
});
