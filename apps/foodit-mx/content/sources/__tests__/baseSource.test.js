import baseSource from '../baseSource';

describe('baseSource (content source)', () => {
    it('expone la config que Fusion espera de un content source', () => {
        expect(baseSource.params).toEqual({ id: 'text' });
        expect(baseSource.ttl).toBe(600);
        expect(typeof baseSource.fetch).toBe('function');
    });

    it('fetch devuelve la data mockeada con la query serializada', () => {
        const query = { id: 'abc-123' };

        const result = baseSource.fetch(query);

        expect(result.message).toContain('mock response');
        expect(result.message).toContain('abc-123');
    });
});
