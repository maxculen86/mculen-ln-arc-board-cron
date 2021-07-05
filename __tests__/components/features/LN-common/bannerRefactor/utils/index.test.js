import React from 'react';
import { isPrimarySectionInBannerSegments } from '../../../../../../components/private/LN/common/bannerRefactor/utils/';

describe('isPrimarySectionInBannerSegments =>', () => {
    const segments = ['campo', 'propiedades'];

    const evalSectionInBanner = (section, equal) => {
        const result = isPrimarySectionInBannerSegments(section)(segments);
        expect(result).toEqual(equal);
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(2);
    };

    it('it should be campo included =>', () =>
        evalSectionInBanner('/economia/campo/', [true, 'campo']));
    it('it should be propiedades included =>', () =>
        evalSectionInBanner('/propiedades/', [true, 'propiedades']));
    it('it should be economia does not included =>', () =>
        evalSectionInBanner('/economia/dolar/', [false, 'economia']));
    it('it should be sociedad does not included =>', () =>
        evalSectionInBanner('/sociedad/cultura/', [false, 'sociedad']));
    it('it should be deportes does not included =>', () =>
        evalSectionInBanner('/deportes/futbol/', [false, 'deportes']));
    it('it should be opinion does not included =>', () =>
        evalSectionInBanner('/opinion/', [false, 'opinion']));
    it('it should be deportes (two sub-categories) does not included =>', () =>
        evalSectionInBanner('/deportes/futbol/boca/', [false, 'deportes']));
});
