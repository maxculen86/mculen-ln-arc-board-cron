import economicIndices from '../../../../../../content/sources/utils/servicesSource/economicIndices/economicIndices';

describe('content - sources - utils - serviceSource - economicIndices', () => {
    describe('getTemplates', () => {
        it('should resolve etf to detalle-indices', () => {
            const result = economicIndices.getTemplates('etf');
            expect(result).toBe('detalle-indices');
        });

        it('should resolve merval to detalle-indices', () => {
            const result = economicIndices.getTemplates('merval');
            expect(result).toBe('detalle-indices');
        });

        it('should return false for unknown service item', () => {
            const result = economicIndices.getTemplates('unknown');
            expect(result).toBeFalsy();
        });
    });
});
