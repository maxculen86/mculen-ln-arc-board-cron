import articleFilterNota from '../../../../../content/filters/foodit/article/articleFilterNota';

describe('articleFilterNota', () => {
    it('should be a string', () => {
        expect(typeof articleFilterNota).toBe('string');
        expect(articleFilterNota.length).toBeGreaterThan(0);
    });
});
