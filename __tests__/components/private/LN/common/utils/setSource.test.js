import { setSource } from '../../../../../../components/private/LN/common/utils/setSource';

describe('setSource', () => {
    it('should return "acuArticlesSourceV2" when sectionId is provided', () => {
        const result = setSource({ sectionId: '123' });
        expect(result).toBe('acuArticlesSourceV2');
    });

    it('should return "acuArticlesSourceV2" when tagId is provided', () => {
        const result = setSource({ tagId: '456' });
        expect(result).toBe('acuArticlesSourceV2');
    });

    it('should return "acuArticlesSourceV2" when authorId is provided', () => {
        const result = setSource({ authorId: '789' });
        expect(result).toBe('acuArticlesSourceV2');
    });

    it('should return "acuArticlesSourceV2" when distributorId is provided', () => {
        const result = setSource({ distributorId: '101' });
        expect(result).toBe('acuArticlesSourceV2');
    });

    it('should return "acuArticlesSourceV2" when sectionsIds is provided', () => {
        const result = setSource({ sectionsIds: ['102', '103'] });
        expect(result).toBe('acuArticlesSourceV2');
    });

    it('should return "collectionsSource" when collectionId is provided', () => {
        const result = setSource({ collectionId: '104' });
        expect(result).toBe('collectionsSource');
    });

    it('should return "acuArticlesSourceV2" when multiple relevant properties are provided', () => {
        const result = setSource({
            sectionId: '123',
            tagId: '456',
            authorId: '789',
            distributorId: '101',
            sectionsIds: ['102', '103']
        });
        expect(result).toBe('acuArticlesSourceV2');
    });

    it('should return null when no relevant properties are provided', () => {
        const result = setSource({});
        expect(result).toBeNull();
    });
});
