/* eslint-disable no-underscore-dangle */
import {
    getAFondoLogo,
    hasAFondoTag
} from '../../../../../components/private/common/utils/sectionUtils';

jest.mock('../../../../../properties/sites/la-nacion-ar', () => ({
    layoutsName: {
        StoryTelling: 'LN-nota-storytelling',
        StoryTellingV2: 'LN-nota-storytelling-v2',
        Cards: 'LN-Nota-Cards',
        Noticia: 'LN-nota-noticia',
        Video: 'LN-nota-video'
    }
}));

const TAGS_A_FONDO = [{ slug: 'a-fondo', text: 'A Fondo' }];
const TAGS_OTHER = [{ slug: 'economia', text: 'Economía' }];
const TAGS_MIXED = [
    { slug: 'economia', text: 'Economía' },
    { slug: 'a-fondo', text: 'A Fondo' }
];

describe('getAFondoLogo', () => {
    describe('when tag a-fondo is present', () => {
        it('should return logo data for StoryTelling layout', () => {
            const result = getAFondoLogo(TAGS_A_FONDO, 'LN-nota-storytelling');
            expect(result).not.toBeNull();
            expect(result.logoName).toBe('a-fondo-logo');
            expect(result.path).toBe('/a-fondo');
        });

        it('should return logo data for StoryTellingV2 layout', () => {
            const result = getAFondoLogo(
                TAGS_A_FONDO,
                'LN-nota-storytelling-v2'
            );
            expect(result).not.toBeNull();
            expect(result.logoName).toBe('a-fondo-logo');
            expect(result.path).toBe('/a-fondo');
        });

        it('should return logo data for Cards layout', () => {
            const result = getAFondoLogo(TAGS_A_FONDO, 'LN-Nota-Cards');
            expect(result).not.toBeNull();
            expect(result.logoName).toBe('a-fondo-logo');
        });

        it('should return white logo (color: false) for StoryTelling', () => {
            const result = getAFondoLogo(TAGS_A_FONDO, 'LN-nota-storytelling');
            expect(result.color).toBe(false);
        });

        it('should return white logo (color: false) for StoryTellingV2', () => {
            const result = getAFondoLogo(
                TAGS_A_FONDO,
                'LN-nota-storytelling-v2'
            );
            expect(result.color).toBe(false);
        });

        it('should return colored logo (color: true) for Cards', () => {
            const result = getAFondoLogo(TAGS_A_FONDO, 'LN-Nota-Cards');
            expect(result.color).toBe(true);
        });

        it('should detect a-fondo tag among multiple tags', () => {
            const result = getAFondoLogo(TAGS_MIXED, 'LN-nota-storytelling-v2');
            expect(result).not.toBeNull();
            expect(result.logoName).toBe('a-fondo-logo');
        });

        it('should set isExternal to false', () => {
            const result = getAFondoLogo(
                TAGS_A_FONDO,
                'LN-nota-storytelling-v2'
            );
            expect(result.isExternal).toBe(false);
        });
    });

    describe('when tag a-fondo is NOT present', () => {
        it('should return null for Storytelling layout', () => {
            const result = getAFondoLogo(TAGS_OTHER, 'LN-nota-storytelling');
            expect(result).toBeNull();
        });

        it('should return null for Cards layout', () => {
            const result = getAFondoLogo(TAGS_OTHER, 'LN-Nota-Cards');
            expect(result).toBeNull();
        });
    });

    describe('when layout is not StoryTelling or Cards', () => {
        it('should return null for Noticia layout', () => {
            const result = getAFondoLogo(TAGS_A_FONDO, 'LN-nota-noticia');
            expect(result).toBeNull();
        });

        it('should return null for Video layout', () => {
            const result = getAFondoLogo(TAGS_A_FONDO, 'LN-nota-video');
            expect(result).toBeNull();
        });
    });

    describe('edge cases', () => {
        it('should return null when tags is null', () => {
            const result = getAFondoLogo(null, 'LN-nota-storytelling');
            expect(result).toBeNull();
        });

        it('should return null when tags is undefined', () => {
            const result = getAFondoLogo(undefined, 'LN-nota-storytelling');
            expect(result).toBeNull();
        });

        it('should return null when tags is empty array', () => {
            const result = getAFondoLogo([], 'LN-nota-storytelling-v2');
            expect(result).toBeNull();
        });

        it('should handle tags with null entries gracefully', () => {
            const tagsWithNull = [null, { slug: 'a-fondo', text: 'A Fondo' }];
            const result = getAFondoLogo(
                tagsWithNull,
                'LN-nota-storytelling-v2'
            );
            expect(result).not.toBeNull();
        });

        it('should return null when layout is null', () => {
            const result = getAFondoLogo(TAGS_A_FONDO, null);
            expect(result).toBeNull();
        });
    });
});

describe('hasAFondoTag', () => {
    it('should return true when a-fondo tag is present', () => {
        expect(hasAFondoTag(TAGS_A_FONDO)).toBe(true);
    });

    it('should return false when a-fondo tag is absent', () => {
        expect(hasAFondoTag(TAGS_OTHER)).toBe(false);
    });

    it('should return false for null', () => {
        expect(hasAFondoTag(null)).toBe(false);
    });

    it('should return false for empty array', () => {
        expect(hasAFondoTag([])).toBe(false);
    });

    it('should handle mixed tags with nulls', () => {
        const tags = [null, { slug: 'a-fondo', text: 'A Fondo' }];
        expect(hasAFondoTag(tags)).toBe(true);
    });
});
