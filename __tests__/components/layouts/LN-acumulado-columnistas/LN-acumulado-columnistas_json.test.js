import * as LayoutAcumColumnistasJson from '../../../../components/layouts/LN-acumulado-columnistas/json';

const props = {
    id: 'LN-acumulado-columnistas',
    isAdmin: false,
    layout: 'LN-acumulado-columnistas',
    arcSite: 'la-nacion-ar',
    siteProperties: {}
};
jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

describe('Components - Layout - LNAcumuladoColumnistasLayout JSON', () => {
    test('Should have correct ammount of children with their proper keys', () => {
        props.children = [
            [],
            [],
            [
                {
                    absoluteUrl:
                        'https://resizer.glanacion.com/resizer/sc2YCkoWRkpgFW3kkP9cVmUVGrs=/280x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/55/2089255.png',
                    id: 51,
                    imagen:
                        '/resizer/sc2YCkoWRkpgFW3kkP9cVmUVGrs=/280x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/55/2089255.png',
                    mail: '',
                    slug: 'joaquin-morales-sola-51',
                    tipo: 1,
                    twitter: '',
                    valor: 'Joaquín Morales Solá'
                },
                {
                    absoluteUrl:
                        'https://resizer.glanacion.com/resizer/sc2YCkoWRkpgFW3kkP9cVmUVGrs=/280x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/55/2089255.png',
                    id: 51,
                    imagen:
                        '/resizer/sc2YCkoWRkpgFW3kkP9cVmUVGrs=/280x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/55/2089255.png',
                    mail: '',
                    slug: 'joaquin-morales-sola-51',
                    tipo: 1,
                    twitter: '',
                    valor: 'Joaquín Morales Solá'
                }
            ],
            []
        ];

        const columnistas = LayoutAcumColumnistasJson.default(props);
        expect(columnistas.length).toBe(1);
        expect(columnistas[0].length).toBe(2);
        expect(Object.keys(columnistas[0][0]).sort()).toEqual(
            ['absoluteUrl', 'id', 'imagen', 'slug', 'tipo', 'valor'].sort()
        );
    });
});
