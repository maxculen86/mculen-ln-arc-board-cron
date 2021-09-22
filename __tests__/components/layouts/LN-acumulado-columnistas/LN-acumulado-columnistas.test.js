import * as LNAcumuladoColumnistasLayout from '../../../../components/layouts/LN-acumulado-columnistas/json';
jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});
describe('Test Acumulado Columnistas', () => {
    const props = {};
    props.id = 'LN-acumulado-columnistas';
    props.isAdmin = false;
    props.layout = 'LN-acumulado-columnistas';
    props.arcSite = 'la-nacion-ar';

    test('OK', () => {
        const children = [
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
        props.children = children;
        const columnistas = LNAcumuladoColumnistasLayout.default(props);
        expect(columnistas.length).toBe(1);
        expect(columnistas[0].length).toBe(2);
        expect(Object.keys(columnistas[0][0]).sort()).toEqual(
            ['absoluteUrl', 'id', 'imagen', 'slug', 'tipo', 'valor'].sort()
        );
    });
});
