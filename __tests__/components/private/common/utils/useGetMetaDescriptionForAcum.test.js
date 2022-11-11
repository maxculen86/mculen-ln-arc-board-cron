import Context from 'fusion:context';
import useGetArticlesFromAcumSource from '../../../../../components/private/LN/common/hooks/useGetArticlesFromAcumSource';
import useGetMetaDescriptionForAcum, {
    isInPVS,
    extractDataFromTags
} from '../../../../../components/private/common/utils/getMetaDescriptionForAcum';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

const mockArticles = [
    {
        headlines: {
            basic: 'El aumento a las  jubilaciones no compensa la inflación',
            mobile: '¿La jubilación mínima le gana a la inflación?'
        }
    },
    {
        headlines: {
            basic:
                'Tras el viaje de Massa a EE.UU., el Gobierno ultima detalles sobre abastecimiento energético',
            mobile:
                'Tras el viaje de Massa a EE.UU., el Gobierno ultima detalles sobre abastecimiento energético'
        }
    }
];

jest.mock(
    '../../../../../components/private/LN/common/hooks/useGetArticlesFromAcumSource',
    () => jest.fn()
);

useGetArticlesFromAcumSource.mockImplementation(() => mockArticles);

describe('Components - private - common - utils - useGetMetaDescriptionForAcum', () => {
    describe('useGetMetaDescriptionForAcum should return the correct description according the acu', () => {
        it('useGetMetaDescriptionForAcum for acu author with expertise areas', () => {
            Context.useAppContext = jest.fn(() => ({
                globalContent: {
                    expertise: 'Politica'
                }
            }));
            const _id = 'javier-blanco-170';
            const description =
                'Accedé a todas las publicaciones de Javier Blanco para La Nación.';
            expect(
                useGetMetaDescriptionForAcum(
                    description,
                    _id,
                    undefined,
                    'author',
                    'Javier Blanco',
                    'la-nacion-ar',
                    'LN-Acumulado'
                )
            ).toBe(
                'Accedé a todas las publicaciones de Javier Blanco para La Nación. Columnista de Politica. Ingresá a su perfil en esta página.'
            );
        });
        it('useGetMetaDescriptionForAcum for acu author without expertise areas', () => {
            Context.useAppContext = jest.fn(() => ({
                globalContent: {}
            }));
            const name = 'Javier Blanco';
            const nodeType = 'author';
            const _id = 'javier-blanco-170';
            const description =
                'Accedé a todas las publicaciones de Javier Blanco para La Nación.';
            expect(
                useGetMetaDescriptionForAcum(
                    description,
                    _id,
                    undefined,
                    nodeType,
                    name,
                    'la-nacion-ar',
                    'LN-Acumulado'
                )
            ).toBe(
                'Accedé a todas las publicaciones de Javier Blanco para La Nación. Ingresá a su perfil en esta página.'
            );
        });

        it('useGetMetaDescriptionForAcum for weatherPVS service', () => {
            Context.useAppContext = jest.fn(() => ({
                globalContent: {}
            }));
            const description = `Encontrá el pronóstico del tiempo en Argentina, condiciones climáticas, temperatura actual y pronóstico extendido del clima en Capital Federal, Buenos Aires y todo el país por el Servicio Meteorológico Nacional - LA NACION`;
            const _id = '/clima';
            expect(
                useGetMetaDescriptionForAcum(
                    description,
                    _id,
                    undefined,
                    'section',
                    'Clima',
                    'la-nacion-ar',
                    'LN-acumulado'
                )
            ).toBe(description);
        });

        it('useGetMetaDescriptionForAcum for lotteryPVS service', () => {
            Context.useAppContext = jest.fn(() => ({
                globalContent: {}
            }));
            const description =
                'Encontrá los resultados de sorteos de loterías y quinielas de Argentina: Quini 6, Loto, Loto 5, Telekino, Brinco y más - LA NACION';
            const _id = '/loterias';
            expect(
                useGetMetaDescriptionForAcum(
                    description,
                    _id,
                    undefined,
                    'section',
                    'Loterias',
                    'la-nacion-ar',
                    'LN-acumulado'
                )
            ).toBe(description);
        });

        it('useGetMetaDescriptionForAcum for horoscope service', () => {
            Context.useAppContext = jest.fn(() => ({
                globalContent: {}
            }));
            const description =
                'El horóscopo de hoy gratis, las claves del destino en Amor, Dinero y Salud para los signos del zodiaco: Aries, Tauro, Géminis, Cáncer, Leo, Virgo, Libra, Escorpio, Sagitario, Capricornio, Piscis.';
            const _id = '/loterias';
            expect(
                useGetMetaDescriptionForAcum(
                    description,
                    _id,
                    undefined,
                    'section',
                    'Loterias',
                    'la-nacion-ar',
                    'LN-acumulado'
                )
            ).toBe(description);
        });
        it('useGetMetaDescriptionForAcum for receta', () => {
            Context.useAppContext = jest.fn(() => ({
                globalContent: {}
            }));
            const description =
                'Encontrá las mejores Recetas para cocinar en LA NACION: ideas para platos rápidos, platos veganos y vegetarianos, recetas con carne y pollo, tortas, dulces y mucho más!';
            const _id = '/recetas';
            expect(
                useGetMetaDescriptionForAcum(
                    description,
                    _id,
                    undefined,
                    'section',
                    'Recetas',
                    'la-nacion-ar',
                    'LN-acumulado'
                )
            ).toBe(description);
        });

        it('useGetMetaDescriptionForAcum for the rest of acus', () => {
            Context.useAppContext = jest.fn(() => ({
                globalContent: {}
            }));
            const description = 'Ultimas noticias de economia:';
            const _id = '/economia';
            expect(
                useGetMetaDescriptionForAcum(
                    description,
                    _id,
                    undefined,
                    'section',
                    'Economia',
                    'la-nacion-ar',
                    'LN-acumulado'
                )
            ).toBe(
                'Ultimas noticias de economia: ¿La jubilación mínima le gana a la inflación?, Tras el viaje de Massa a EE.UU., el Gobierno ultima detalles sobre abastecimiento energético'
            );
            expect(
                useGetMetaDescriptionForAcum(
                    undefined,
                    _id,
                    undefined,
                    'section',
                    'Economia',
                    'la-nacion-ar',
                    'LN-acumulado'
                )
            ).toBe(
                '¿La jubilación mínima le gana a la inflación?, Tras el viaje de Massa a EE.UU., el Gobierno ultima detalles sobre abastecimiento energético'
            );
        });

        it('useGetMetaDescriptionForAcum for tag', () => {
            Context.useAppContext = jest.fn(() => ({
                globalContent: {}
            }));
            const payload = {
                items: [
                    {
                        description: 'Lionel Messi',
                        name: 'Lionel Messi',
                        slug: 'lionel-messi-tid1619'
                    }
                ]
            };
            const description =
                'Encontrá las últimas noticias de Lionel Messi:';
            const _id =
                'e94f3981d06f2b9137192843b344673ec72c21de22ee74c0d96098c083f695cb';
            expect(
                useGetMetaDescriptionForAcum(
                    description,
                    _id,
                    payload,
                    'tags',
                    'Lionel Messi',
                    'la-nacion-ar',
                    'LN-acumulado'
                )
            ).toBe(
                'Encontrá las últimas noticias de Lionel Messi: ¿La jubilación mínima le gana a la inflación?, Tras el viaje de Massa a EE.UU., el Gobierno ultima detalles sobre abastecimiento energético'
            );
        });

        it('Check useGetMetaDescriptionForAcum defensive behavior', () => {
            Context.useAppContext = jest.fn(() => ({
                globalContent: {}
            }));
            useGetArticlesFromAcumSource.mockImplementation(() => []);
            expect(
                useGetMetaDescriptionForAcum(
                    undefined,
                    '',
                    undefined,
                    '',
                    '',
                    '',
                    ''
                )
            ).toBe('');
        });
    });

    describe('useGetMetaDescriptionForAcum helper functions', () => {
        it('Check isInPVS function', () => {
            expect(isInPVS('/clima')).toBe(true);
            expect(isInPVS('/economia')).toBe(false);
            expect(isInPVS('')).toBe(false);
            expect(isInPVS()).toBe(false);
            expect(isInPVS('/')).toBe(false);
        });
        it('Check extractDataFromTags function', () => {
            const payload = {
                items: [
                    {
                        description: 'Lionel Messi',
                        name: 'Lionel Messi',
                        slug: 'lionel-messi-tid1619'
                    }
                ]
            };
            expect(extractDataFromTags(payload)).toStrictEqual({
                tagId: 'lionel-messi-tid1619',
                tagName: 'Lionel Messi'
            });
            expect(extractDataFromTags()).toStrictEqual({
                tagId: undefined,
                tagName: undefined
            });
        });
    });
});
