import { generatePathStructure } from '../../../../../../components/private/LN/acumulado/breadcrumb/generatePathStructure';

describe('generatePathStructure', () => {
    it('debería manejar un solo segmento', () => {
        const result = generatePathStructure('/autos');
        expect(result).toEqual([
            { id: '/', name: 'LA NACION', path: '/' }, // Objeto inicial siempre presente
            { id: '/autos', name: 'Autos', path: '/autos' }
        ]);
    });

    it('debería manejar múltiples segmentos', () => {
        const result = generatePathStructure('/autos/tendencias');
        expect(result).toEqual([
            { id: '/', name: 'LA NACION', path: '/' }, // Objeto inicial siempre presente
            { id: '/autos', name: 'Autos', path: '/autos' },
            {
                id: '/autos/tendencias',
                name: 'Tendencias',
                path: '/autos/tendencias'
            }
        ]);
    });

    it('debería manejar más de dos segmentos', () => {
        const result = generatePathStructure('/autos/tendencias/velocidad');
        expect(result).toEqual([
            { id: '/', name: 'LA NACION', path: '/' }, // Objeto inicial siempre presente
            { id: '/autos', name: 'Autos', path: '/autos' },
            {
                id: '/autos/tendencias',
                name: 'Tendencias',
                path: '/autos/tendencias'
            },
            {
                id: '/autos/tendencias/velocidad',
                name: 'Velocidad',
                path: '/autos/tendencias/velocidad'
            }
        ]);
    });
});
