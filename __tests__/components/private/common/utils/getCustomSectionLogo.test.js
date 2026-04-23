import { getCustomSectionLogo } from '../../../../../components/private/common/utils/sectionUtils';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

jest.mock('../../../../../properties/sites/la-nacion-ar', () => ({
    layoutsName: {
        Noticia: 'LN-nota-noticia',
        StoryTelling: 'LN-nota-storytelling',
        StoryTellingV2: 'LN-nota-storytelling-v2',
        Cards: 'LN-Nota-Cards',
        Receta: 'LN-nota-receta'
    }
}));

const COMUNIDAD_SECTION = { _id: '/comunidad' };
const NOTICIA_LAYOUT = 'LN-nota-noticia';
const STORYTELLING_LAYOUT = 'LN-nota-storytelling';
const STORYTELLING_V2_LAYOUT = 'LN-nota-storytelling-v2';

describe('private - common - utils - getCustomSectionLogo', () => {
    describe('when section is /comunidad', () => {
        it('returns foreground logo for Noticia layout', () => {
            const result = getCustomSectionLogo({
                sections: [COMUNIDAD_SECTION],
                layout: NOTICIA_LAYOUT
            });

            expect(result).toEqual({
                logoName: 'fundacion-ln',
                path: '/comunidad',
                color: true,
                isExternal: false
            });
        });

        it('returns background logo for StoryTelling layout', () => {
            const result = getCustomSectionLogo({
                sections: [COMUNIDAD_SECTION],
                layout: STORYTELLING_LAYOUT
            });

            expect(result).toEqual({
                logoName: 'fundacion-ln',
                path: '/comunidad',
                color: false,
                isExternal: false
            });
        });

        it('returns background logo for StoryTellingV2 layout', () => {
            const result = getCustomSectionLogo({
                sections: [COMUNIDAD_SECTION],
                layout: STORYTELLING_V2_LAYOUT
            });

            expect(result).toEqual({
                logoName: 'fundacion-ln',
                path: '/comunidad',
                color: false,
                isExternal: false
            });
        });

        it('matches when comunidad is not the first section', () => {
            const result = getCustomSectionLogo({
                sections: [{ _id: '/politica' }, COMUNIDAD_SECTION],
                layout: NOTICIA_LAYOUT
            });

            expect(result).not.toBeNull();
            expect(result.logoName).toBe('fundacion-ln');
        });
    });

    describe('when there is no match', () => {
        it('returns null for a different section with valid layout', () => {
            const result = getCustomSectionLogo({
                sections: [{ _id: '/politica' }],
                layout: NOTICIA_LAYOUT
            });

            expect(result).toBeNull();
        });

        it('returns null for /comunidad with an unsupported layout', () => {
            const result = getCustomSectionLogo({
                sections: [COMUNIDAD_SECTION],
                layout: 'LN-Nota-Cards'
            });

            expect(result).toBeNull();
        });
    });

    describe('defensive: missing or invalid data', () => {
        it('returns null when called without arguments', () => {
            expect(getCustomSectionLogo()).toBeNull();
        });

        it('returns null when sections is undefined', () => {
            expect(getCustomSectionLogo({ layout: NOTICIA_LAYOUT })).toBeNull();
        });

        it('returns null when sections is null', () => {
            expect(
                getCustomSectionLogo({ sections: null, layout: NOTICIA_LAYOUT })
            ).toBeNull();
        });

        it('returns null when sections is an empty array', () => {
            expect(
                getCustomSectionLogo({ sections: [], layout: NOTICIA_LAYOUT })
            ).toBeNull();
        });

        it('returns null when layout is undefined', () => {
            expect(
                getCustomSectionLogo({ sections: [COMUNIDAD_SECTION] })
            ).toBeNull();
        });

        it('returns null when layout is null', () => {
            expect(
                getCustomSectionLogo({
                    sections: [COMUNIDAD_SECTION],
                    layout: null
                })
            ).toBeNull();
        });

        it('does not crash when sections contains null items', () => {
            expect(() =>
                getCustomSectionLogo({
                    sections: [null, undefined, COMUNIDAD_SECTION],
                    layout: NOTICIA_LAYOUT
                })
            ).not.toThrow();
        });

        it('does not crash when sections items have no _id', () => {
            expect(() =>
                getCustomSectionLogo({
                    sections: [{}, { name: 'sin id' }, COMUNIDAD_SECTION],
                    layout: NOTICIA_LAYOUT
                })
            ).not.toThrow();
        });
    });
});
