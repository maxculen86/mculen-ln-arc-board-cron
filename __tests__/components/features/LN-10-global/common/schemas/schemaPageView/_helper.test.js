import getPageType from '../../../../../../../components/features/LN-10-global/common/schemas/schemaPageView/_helper';

describe('getPageType', () => {
    it('should return "home" if isHomeLN10 returns true', () => {
        const result = getPageType('LN10-Home_Main', '');
        expect(result).toBe('home');
    });

    it('should return "accumulated" if layout is "LN-accumulated"', () => {
        const result = getPageType('LN-acumulado', '/politica');
        expect(result).toBe('acumulado');
    });

    it('should return "Sports" if section is "/deportes"', () => {
        const result = getPageType('otro-layout', '/deportes');
        expect(result).toBe('Deportes');
    });

    it('should return "note" if no condition is met', () => {
        const result = getPageType('otro-layout', '/otra-seccion');
        expect(result).toBe('nota');
    });

    it('must handle empty arguments and return "note"', () => {
        const result = getPageType();
        expect(result).toBe('nota');
    });
});
