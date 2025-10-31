import getCanonicalLink from '../../../../../components/private/common/helpers/getCanonicalLink';
import { addForwardSlash } from '../../../../../components/private/LN/common/utils/addForwardSlash';

describe('getCanonicalLink', () => {
    const baseUrlByArcType = {
        foodit: 'https://foodit.lanacion.com.ar',
        'la-nacion-ar': 'https://www.lanacion.com.ar'
    };

    it('Should return siteUrl when mustUseSiteUrl is true', () => {
        const siteUrl = 'https://customsite.com';
        const result = getCanonicalLink({
            arcSite: 'la-nacion-ar',
            baseUrlByArcType,
            mustUseSiteUrl: true,
            siteUrl,
            canonicalUrl: '',
            canonicalSlash: ''
        });

        expect(result).toBe(siteUrl);
    });

    it('Should return URL based on baseUrlByArcType and canonicalUrl when mustUseSiteUrl is false', () => {
        const result = getCanonicalLink({
            arcSite: 'la-nacion-ar',
            baseUrlByArcType,
            mustUseSiteUrl: false,
            siteUrl: '',
            canonicalUrl: '/some-path',
            canonicalSlash: ''
        });

        expect(result).toBe(
            addForwardSlash('https://www.lanacion.com.ar/some-path')
        );
    });

    it('Should return URL based on canonicalSlash when there is no canonicalUrl', () => {
        const result = getCanonicalLink({
            arcSite: 'foodit',
            baseUrlByArcType,
            mustUseSiteUrl: false,
            siteUrl: '',
            canonicalUrl: '',
            canonicalSlash: '/canonical-slash'
        });

        expect(result).toBe(
            addForwardSlash('https://foodit.lanacion.com.ar/canonical-slash')
        );
    });
});
