import getCanonicalLink from '../../../../../components/private/common/helpers/getCanonicalLink';
import { ottProgramsLayouts } from '../../../../../components/private/common/utils/getMetasOGHelper';
import { addForwardSlash } from '../../../../../components/private/LN/common/utils/addForwardSlash';

describe('getCanonicalLink', () => {
    const baseUrlByArcType = {
        // TODO: limpieza OTT - Borrar en iteración 5 de 5 y actualizar tests
        ott: 'https://lnmas.lanacion.com.ar',
        foodit: 'https://foodit.lanacion.com.ar',
        'la-nacion-ar': 'https://www.lanacion.com.ar'
    };

    it('Should return the URL for OTT including "/programas/[program-name]/" when the layout is OTT-program', () => {
        const result = getCanonicalLink({
            _id: '/mas-info',
            arcSite: 'ott',
            layout: ottProgramsLayouts[0],
            baseUrlByArcType,
            mustUseSiteUrl: false,
            siteUrl: '',
            canonicalUrl: '',
            canonicalSlash: ''
        });

        expect(result).toBe(
            addForwardSlash('https://lnmas.lanacion.com.ar/programas/mas-info')
        );
    });

    it('Should return the URL for OTT including "/programas/[program-name]/" when the layout is OTT-default', () => {
        const result = getCanonicalLink({
            _id: '/mas-info',
            arcSite: 'ott',
            layout: ottProgramsLayouts[1],
            baseUrlByArcType,
            mustUseSiteUrl: false,
            siteUrl: '',
            canonicalUrl: '',
            canonicalSlash: ''
        });

        expect(result).toBe(
            addForwardSlash('https://lnmas.lanacion.com.ar/programas/mas-info')
        );
    });

    it('Should return URL for OTT including "/programas/" when there is no _id', () => {
        const result = getCanonicalLink({
            _id: '',
            arcSite: 'ott',
            layout: ottProgramsLayouts[1],
            baseUrlByArcType,
            mustUseSiteUrl: false,
            siteUrl: '',
            canonicalUrl: '',
            canonicalSlash: ''
        });

        expect(result).toBe(
            addForwardSlash('https://lnmas.lanacion.com.ar/programas/')
        );
    });

    it('Should return siteUrl when mustUseSiteUrl is true', () => {
        const siteUrl = 'https://customsite.com';
        const result = getCanonicalLink({
            _id: '/test-id',
            arcSite: 'la-nacion-ar',
            layout: '',
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
            _id: '/test-id',
            arcSite: 'la-nacion-ar',
            layout: '',
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
            _id: '/test-id',
            arcSite: 'foodit',
            layout: '',
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
