import {
    siteMapListSectionLink,
    replacePlaceholders
} from '../../../../../components/private/common/siteMapList/siteMapList';
import mapListSection from '../../../../../components/private/common/siteMapList/siteMapList.json';
import { SITE_LANACION, SITIO_SEGURO_REGISTRACION } from 'fusion:environment';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar',
    SITIO_SEGURO_REGISTRACION: 'https://arc-static.glanacion.com'
}));

describe('Private - Common - siteMapList', () => {
    describe('replacePlaceholders', () => {
        it('should replace placeholders in href correctly', () => {
            const input = [
                { text: 'Home', href: 'SITE_LANACION/home' },
                {
                    text: 'Subscribe',
                    href: 'SITIO_SEGURO_REGISTRACION/suscribirme'
                },
                { text: 'About', href: 'SITE_LANACION/about' },
                { text: 'Contact', href: 'SITIO_SEGURO_REGISTRACION/contact' },
                { text: 'External', href: 'https://external.com' }
            ];

            const expected = [
                { text: 'Home', href: `${SITE_LANACION}/home` },
                {
                    text: 'Subscribe',
                    href: `${SITIO_SEGURO_REGISTRACION}/suscribirme`
                },
                { text: 'About', href: `${SITE_LANACION}/about` },
                {
                    text: 'Contact',
                    href: `${SITIO_SEGURO_REGISTRACION}/contact`
                },
                { text: 'External', href: 'https://external.com' }
            ];

            expect(replacePlaceholders(input)).toEqual(expected);
        });
    });

    describe('siteMapListSectionLink', () => {
        it('should correctly replace placeholders in mapListSection', () => {
            const expected = mapListSection.map(section => ({
                ...section,
                sections: section.sections.map(sec => ({
                    ...sec,
                    list: replacePlaceholders(sec.list)
                }))
            }));

            expect(siteMapListSectionLink).toEqual(expected);
        });
    });
});
