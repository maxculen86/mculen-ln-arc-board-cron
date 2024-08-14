import {
    mapListSectionLink,
    replacePlaceholders
} from '../../../../../components/private/common/mapaListSection/mapListSectionLink';
import mapListSection from '../../../../../components/private/common/mapaListSection/mapListSection.json';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar',
    SITIO_SEGURO_REGISTRACION: 'https://arc-static.glanacion.com'
}));

describe('replacePlaceholders', () => {
    it('should replace placeholders in href correctly', () => {
        const input = [
            { text: 'Home', href: '{SITE_LANACION}/home' },
            { text: 'Subscribe', href: '{SITIO_SEGURO_REGISTRACION}' }
        ];

        const expected = [
            { text: 'Home', href: 'https://www.lanacion.com.ar/home' },
            { text: 'Subscribe', href: 'https://arc-static.glanacion.com' }
        ];

        expect(replacePlaceholders(input)).toEqual(expected);
    });
});

describe('mapListSectionLink', () => {
    it('should correctly replace placeholders in mapListSection', () => {
        const expected = mapListSection.map(section => ({
            ...section,
            items: replacePlaceholders(section.items)
        }));

        expect(mapListSectionLink).toEqual(expected);
    });
});
