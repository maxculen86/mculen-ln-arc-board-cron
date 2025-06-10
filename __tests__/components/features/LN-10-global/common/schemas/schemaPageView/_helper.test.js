import getPageType, {
    getObjectSchema
} from '../../../../../../../components/features/LN-10-global/common/schemas/schemaPageView/_helper';

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

    it('should return "receta" if layout is "LN-nota-receta"', () => {
        const result = getPageType('LN-nota-receta', '/recetas');
        expect(result).toBe('receta');
    });
});

describe('getObjectSchema', () => {
    it('should set valor to "comun" if content_restrictions.content_code does not exist', () => {
        const globalContent = {
            _id: '123',
            subtype: '1',
            isListenable: false
        };
        const schema = getObjectSchema(globalContent, 'nota');
        expect(schema.nota.valor).toBe('comun');
    });

    it('should set valor to content_code if it exists', () => {
        const globalContent = {
            _id: '123',
            subtype: '1',
            isListenable: false,
            content_restrictions: {
                content_code: 'cerrada'
            }
        };
        const schema = getObjectSchema(globalContent, 'nota');
        expect(schema.nota.valor).toBe('cerrada');
    });
});
