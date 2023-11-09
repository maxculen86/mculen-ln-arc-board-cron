import checkSection from '../../../../../../components/private/LN/common/utils/checkSection';
describe('Games test funcion checkSection', () => {
    it("should return true when primary_section is '/juegos'", () => {
        const globalContent = {
            _id: '/juegos'
        };
        const target = '/juegos';
        const result = checkSection(globalContent, target);
        expect(result).toBe(true);
    });

    it('should return true when primary_section is other section', () => {
        const globalContent = {
            _id: '/other'
        };
        const target = '/other';
        const result = checkSection(globalContent, target);
        expect(result).toBe(true);
    });

    it('should return false when globalContent is empty object', () => {
        const globalContent = {};
        const result = checkSection(globalContent);
        expect(result).toBe(false);
    });

    it('returns false if primarySection does not match the target', () => {
        const globalContent = {
            _id: '/targetSectionId'
        };
        const target = 'targetSectionId';
        const result = checkSection(globalContent, target);
        expect(result).toBe(false);
    });

    it('returns false if globalContent does not have a primary section', () => {
        const globalContent = {};
        const target = 'targetSectionId';
        const result = checkSection(globalContent, target);
        expect(result).toBe(false);
    });
});
