import isRecipeSection from '../../../../../../../components/features/LN/common/breadcrumb/helpers/isRecipeSection';

describe('isRecipeSection', () => {
    it('should return true when section id includes "/recetas"', () => {
        const section = {
            id: '/gastronomia/recetas/postres'
        };

        const result = isRecipeSection(section);

        expect(result).toBe(true);
    });

    it('should return true when section path includes "/recetas"', () => {
        const section = {
            path: '/gastronomia/recetas/postres'
        };

        const result = isRecipeSection(section);

        expect(result).toBe(true);
    });

    it('should return true when both id and path include "/recetas"', () => {
        const section = {
            id: '/recetas',
            path: '/recetas'
        };

        const result = isRecipeSection(section);

        expect(result).toBe(true);
    });

    it('should return false when neither id nor path include "/recetas"', () => {
        const section = {
            id: '/gastronomia',
            path: '/cocina'
        };

        const result = isRecipeSection(section);

        expect(result).toBe(false);
    });

    it('should return false when section is undefined', () => {
        const result = isRecipeSection(undefined);

        expect(result).toBe(false);
    });

    it('should return false when section has no id and no path', () => {
        const section = {};

        const result = isRecipeSection(section);

        expect(result).toBe(false);
    });
});
