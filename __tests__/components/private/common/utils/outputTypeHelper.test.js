import React from 'react';
import Context from 'fusion:context';
import {
    getTitle,
    getMetaDescriptionDefault,
    getSectionOfRequestUri,
    metasFromSiteServices,
    getTagTitle,
    addMetaNoIndexNoFollow,
    isUSALangHtml
} from '../../../../../components/private/common/utils/outputTypeHelper';
import {
    AGENCIA,
    RECETA
} from '../../../../../components/private/common/utils/subtypes/subtypeHelper';

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

describe('Common - utils - getTitle', () => {
    const metaValue = 'Ultimas noticias en la nacion';
    const siteProperties = {
        longTitle: 'Últimas noticias de Argentina y el mundo - LA NACION',
        title: 'LA NACION'
    };
    const requestUri = '/page/?_website=la-nacion-ar';

    test('Test of return in case of undefined metaValue', () => {
        const metaValue = undefined;
        const _nodeType = undefined;

        const title = getTitle({
            title: metaValue,
            properties: siteProperties,
            uri: requestUri,
            nodeType: _nodeType
        });

        expect(title).toStrictEqual('LA NACION');
    });

    test('Test of return for home', () => {
        const _nodeType = 'home';
        const title = getTitle({
            title: metaValue,
            properties: siteProperties,
            uri: requestUri,
            nodeType: _nodeType
        });

        expect(title).toStrictEqual(
            'Últimas noticias de Argentina y el mundo - LA NACION'
        );
    });

    test('Test of return for acu', () => {
        const _nodeType = 'acumulado';
        const metaValue = 'Política - LA NACION';
        const layout = 'LN-acumulado';
        const title = getTitle({
            title: metaValue,
            properties: siteProperties,
            uri: requestUri,
            nodeType: _nodeType
        });

        expect(title).toStrictEqual('Política - LA NACION');
    });

    test('Test of return for note ', () => {
        const _nodeType = 'nota';
        const metaValue =
            'Ola de calor: la temperatura superó los 40° en la ciudad y es la segunda más alta de la historia';

        const title = getTitle({
            title: metaValue,
            properties: siteProperties,
            uri: requestUri,
            nodeType: _nodeType
        });

        expect(title).toStrictEqual(
            'Ola de calor: la temperatura superó los 40° en la ciudad y es la segunda más alta de la historia'
        );
    });

    test('Test of return of My Notes', () => {
        const requestUri = '/mis-notas/?_website=la-nacion-ar';
        const _nodeType = 'acumulado';
        const metaValue = 'Mis Notas guardadas - LA NACION';

        const title = getTitle({
            title: metaValue,
            properties: siteProperties,
            uri: requestUri,
            nodeType: _nodeType
        });

        expect(title).toStrictEqual('Mis Notas guardadas - LA NACION');
    });

    test('Test of return when requesUri isnt defined', () => {
        const requestUri = undefined;
        const _nodeType = 'home';

        const title = getTitle({
            title: metaValue,
            properties: siteProperties,
            uri: requestUri,
            nodeType: _nodeType
        });

        expect(title).toStrictEqual(
            'Últimas noticias de Argentina y el mundo - LA NACION'
        );
    });

    test('Test of return for acu My Notes when metaValue isnt defined', () => {
        const requestUri = '/mis-notas/?_website=la-nacion-ar';
        const _nodeType = 'acumulado';
        const metaValue = undefined;

        const title = getTitle({
            title: metaValue,
            properties: siteProperties,
            uri: requestUri,
            nodeType: _nodeType
        });

        expect(title).toStrictEqual('LA NACION');
    });
});

describe('Common Util getMetaDescriptionDefault', () => {
    const layout = 'LN-nota-noticia';
    const defaultDescription =
        'Últimas noticias de Argentina y el mundo - LA NACION';
    const _nodeType = 'home';
    const metaValue = undefined;
    const _id = undefined;
    const Payload = undefined;
    const nodeType = undefined;
    const name = undefined;
    const arcSite = 'la-nacion-ar';

    test('Test of return for metaValue("description") undefined', () => {
        const metaDescription = getMetaDescriptionDefault(
            metaValue,
            layout,
            defaultDescription,
            _nodeType,
            _id,
            Payload,
            nodeType,
            name,
            arcSite
        );
        expect(metaDescription).toStrictEqual(
            'Últimas noticias de Argentina y el mundo - LA NACION'
        );
    });

    test('Test of return for acu', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {}
        }));

        const metaValue =
            'Últimas Noticias de Propiedades: ARBA les bonifica el 25% en el Impuesto Inmobiliario, Cuáles son las dos zonas que ganaron en plena pandemia y por qué - LA NACION';
        const _nodeType = 'acumulado';
        const _id = '/propiedades';
        const nodeType = 'section';
        const name = 'Propiedades';

        const metaDescription = getMetaDescriptionDefault(
            metaValue,
            layout,
            defaultDescription,
            _nodeType,
            _id,
            Payload,
            nodeType,
            name,
            arcSite
        );

        expect(metaDescription).toStrictEqual(
            'Últimas Noticias de Propiedades: ARBA les bonifica el 25% en el Impuesto Inmobiliario, Cuáles son las dos zonas que ganaron en plena pandemia y por qué - LA NACION'
        );
    });

    test('Test of return for _nodeType !== acumulado', () => {
        const _nodeType = 'nota';
        const _id = 'WLBYLGLLX5BMNPYJRYJFP6';

        const metaDescription = getMetaDescriptionDefault(
            metaValue,
            layout,
            defaultDescription,
            _nodeType,
            _id,
            Payload,
            nodeType,
            name,
            arcSite
        );

        expect(metaDescription).toStrictEqual(
            'Últimas noticias de Argentina y el mundo - LA NACION'
        );
    });

    test('Test of return for My Notes', () => {
        const requestUri = '/mis-notas/?_website=la-nacion-ar';
        const metaValue = 'Mis Notas guardadas - LA NACION';

        const metaDescription = getMetaDescriptionDefault(
            metaValue,
            layout,
            defaultDescription,
            _nodeType,
            _id,
            Payload,
            nodeType,
            name,
            arcSite,
            requestUri
        );

        expect(metaDescription).toStrictEqual(
            'Mis Notas guardadas - LA NACION'
        );
    });

    test('Test of return for acu My Notes, when metaValue isnt defined.', () => {
        const requestUri = '/mis-notas/?_website=la-nacion-ar';
        const metaValue = undefined;

        const metaDescription = getMetaDescriptionDefault(
            metaValue,
            layout,
            defaultDescription,
            _nodeType,
            _id,
            Payload,
            nodeType,
            name,
            arcSite,
            requestUri
        );

        expect(metaDescription).toStrictEqual(
            'Últimas noticias de Argentina y el mundo - LA NACION'
        );
    });
});

describe('Test getSectionOfRequestUri', () => {
    const requestUri = '/mis-notas/?_website=la-nacion-ar';

    test('Test of return when requestUri is correct ', () => {
        expect(getSectionOfRequestUri(requestUri)).toStrictEqual('mis-notas');
    });

    test('Test of return when requestUri isnt defined', () => {
        const requestUri = undefined;

        expect(getSectionOfRequestUri(requestUri)).toStrictEqual('');
    });

    test('Test of return when requestUri is null', () => {
        const requestUri = null;

        expect(getSectionOfRequestUri(requestUri)).toStrictEqual('');
    });
});

describe('Tests - metasFromSiteServices', () => {
    const metaTags = {
        robots: 'noindex, nofollow',
        title: 'La Nacion'
    };

    test('Return test when metaTags is defined', () => {
        expect(metasFromSiteServices(metaTags).props.children).toStrictEqual([
            <meta content="noindex, nofollow" name="robots" />,
            <meta content="La Nacion" name="title" />
        ]);
    });

    test('Return test when metaTags is not defined', () => {
        expect(metasFromSiteServices(undefined)).toStrictEqual(null);
    });

    test('Return test when one of the properties does not have a value', () => {
        expect(
            metasFromSiteServices({
                ...metaTags,
                title: ''
            }).props.children
        ).toStrictEqual([
            <meta content="noindex, nofollow" name="robots" />,
            ''
        ]);
    });

    test('Return tests when the parameter received is an array', () => {
        expect(metasFromSiteServices([{}])).toStrictEqual(null);
    });
});

describe('getTagTitle function test', () => {
    describe('getTagTitle for note', () => {
        test('Return basicTitle when basic and short titles are defined', () => {
            expect(
                getTagTitle({
                    PBTitle: 'Titulo de pagebuilder - LA NACION',
                    basicTitle: 'Titular de trabajo completo',
                    shortTitle: 'Titulo corto',
                    nodeType: 'nota',
                    siteProps: {},
                    metaTitle: ''
                })
            ).toBe('Titular de trabajo completo - LA NACION');
        });
        test('Return basicTitle when short title is empty', () => {
            expect(
                getTagTitle({
                    PBTitle: 'Titulo de pagebuilder - LA NACION',
                    basicTitle: 'Titular de trabajo completo',
                    shortTitle: '',
                    nodeType: 'nota',
                    siteProps: {},
                    metaTitle: ''
                })
            ).toBe('Titular de trabajo completo - LA NACION');
        });
        test('Return metaTitle when basic, short and meta titles are defined', () => {
            expect(
                getTagTitle({
                    PBTitle: 'Titulo de pagebuilder - LA NACION',
                    basicTitle: 'Titular de trabajo completo',
                    shortTitle: 'Titulo corto',
                    nodeType: 'nota',
                    siteProps: {},
                    metaTitle: 'I am the metaTitle'
                })
            ).toBe('I am the metaTitle - LA NACION');
        });
        test('Keep special characters in basicTitle without truncation', () => {
            expect(
                getTagTitle({
                    PBTitle: 'Titulo de pagebuilder - LA NACION',
                    basicTitle:
                        'El que dijo que no y los dos principales candidatos: ya empezo la carrera para ser el nuevo DT; "LA NACION" | ¡?\'¿¡',
                    shortTitle: 'Titulo corto',
                    nodeType: 'nota',
                    siteProps: {},
                    metaTitle: ''
                })
            ).toBe(
                'El que dijo que no y los dos principales candidatos: ya empezo la carrera para ser el nuevo DT; "LA NACION" | ¡?\'¿¡ - LA NACION'
            );
        });
    });

    describe('getTagTitle for home', () => {
        test('Return longTitle from siteProps when its defined', () => {
            expect(
                getTagTitle({
                    PBTitle: 'Titulo de pagebuilder - LA NACION',
                    shortTitle: 'Titulo corto',
                    nodeType: 'home',
                    siteProps: {
                        longTitle:
                            'Todas las noticias de Argentina y el mundo en LA NACION'
                    }
                })
            ).toBe('Todas las noticias de Argentina y el mundo en LA NACION');
        });
        test('Return basic title when longTitle is not defined', () => {
            expect(
                getTagTitle({
                    PBTitle: 'Titulo de pagebuilder - LA NACION',
                    shortTitle: '',
                    nodeType: 'home',
                    siteProps: {}
                })
            ).toBe('Titulo de pagebuilder - LA NACION');
        });

        test('Return PBTitle when subtype is LIVEBLOG_EDITORIAL', () => {
            expect(
                getTagTitle({
                    PBTitle:
                        'Titulo de pagebuilder (liveblog editorial) - LA NACION',
                    basicTitle: 'Titulo de pagebuilder',
                    shortTitle: 'Titulo corto',
                    nodeType: 'nota',
                    siteProps: {},
                    metaTitle: '',
                    subtype: '11'
                })
            ).toBe('Titulo de pagebuilder (liveblog editorial) - LA NACION');
        });
    });
    describe('addNoIndexNoFollow for LN10', () => {
        test('Return meta robots no index no follow when subtype is agencia', () => {
            expect(
                addMetaNoIndexNoFollow({
                    subtype: AGENCIA
                })
            ).toStrictEqual(<meta name="robots" content="noindex, nofollow" />);
        });

        test('Return meta robots no index no follow when subtype is agencia outside agencias uri', () => {
            expect(
                addMetaNoIndexNoFollow({
                    requestUri:
                        '/estados-unidos/prueba-borrar-2-nid12032026/?d=5495',
                    subtype: AGENCIA
                })
            ).toStrictEqual(<meta name="robots" content="noindex, nofollow" />);
        });

        test('Return fragment when agencias uri does not have agencia subtype', () => {
            expect(
                addMetaNoIndexNoFollow({
                    requestUri: '/agencias/?_website=la-nacion-ar'
                })
            ).toStrictEqual(null);
        });

        test('Return meta robots no index no follow when the page is home-vivo', () => {
            expect(
                addMetaNoIndexNoFollow({
                    requestUri: '/home-vivo/?_website=la-nacion-ar'
                })
            ).toStrictEqual(<meta name="robots" content="noindex, nofollow" />);
        });

        test('Return meta robots no index no follow when the page is home-temas', () => {
            expect(
                addMetaNoIndexNoFollow({
                    requestUri: '/home-temas/?_website=la-nacion-ar'
                })
            ).toStrictEqual(<meta name="robots" content="noindex, nofollow" />);
        });

        test('Return meta robots no index no follow when the page is cajaafondo', () => {
            expect(
                addMetaNoIndexNoFollow({
                    requestUri: '/cajaafondo/?_website=la-nacion-ar'
                })
            ).toStrictEqual(<meta name="robots" content="noindex, nofollow" />);
        });

        test('Return meta robots no index no follow when the page is home-webstories', () => {
            expect(
                addMetaNoIndexNoFollow({
                    requestUri: '/home-webstories/?_website=la-nacion-ar'
                })
            ).toStrictEqual(<meta name="robots" content="noindex, nofollow" />);
        });

        test('Return meta robots no index no follow when the page is home-juegos', () => {
            expect(
                addMetaNoIndexNoFollow({
                    requestUri: '/home-juegos/?_website=la-nacion-ar'
                })
            ).toStrictEqual(<meta name="robots" content="noindex, nofollow" />);
        });

        test('Return meta robots no index no follow when the page is preview-arc', () => {
            expect(
                addMetaNoIndexNoFollow({
                    requestUri: '/preview-arc/'
                })
            ).toStrictEqual(<meta name="robots" content="noindex, nofollow" />);
        });

        test('Return meta robots no index no follow when the page is home-content', () => {
            expect(
                addMetaNoIndexNoFollow({
                    requestUri: '/home-content/'
                })
            ).toStrictEqual(<meta name="robots" content="noindex, nofollow" />);
        });
        test('Return meta robots no index no follow when the page is carrusel-home', () => {
            expect(
                addMetaNoIndexNoFollow({
                    requestUri: '/carrusel-home/'
                })
            ).toStrictEqual(<meta name="robots" content="noindex, nofollow" />);
        });

        test('Return fragment when when the page is home LN10', () => {
            expect(
                addMetaNoIndexNoFollow({
                    requestUri: '/homepage-ln10/'
                })
            ).toStrictEqual(null);
        });

        test('Return fragment when when the page is not LN10', () => {
            expect(
                addMetaNoIndexNoFollow({
                    siteProperties: {
                        layoutsName: {
                            HomeLN10: 'LN10-Home_Main',
                            Acumulado: 'LN-acumulado'
                        }
                    },
                    layout: 'LN-acumulado'
                })
            ).toStrictEqual(null);
        });

        test('Return fragment when layout is not LN10', () => {
            expect(
                addMetaNoIndexNoFollow({
                    requestUri: 'politica'
                })
            ).toStrictEqual(null);
        });

        test('Return fragment when requestUri is a empty string', () => {
            expect(
                addMetaNoIndexNoFollow({
                    requestUri: ''
                })
            ).toStrictEqual(null);
        });

        test('Return fragment when everything is undefined', () => {
            expect(
                addMetaNoIndexNoFollow({
                    siteProperties: undefined,
                    layout: undefined
                })
            ).toStrictEqual(null);
        });

        test('Return fragment when everything is undefined', () => {
            expect(
                addMetaNoIndexNoFollow({
                    requestUri: undefined
                })
            ).toStrictEqual(null);
        });

        test('Return fragment when everything is null', () => {
            expect(
                addMetaNoIndexNoFollow({
                    requestUri: null
                })
            ).toStrictEqual(null);
        });

        test('Return Googlebot meta tag when distributorName is EL PAIS', () => {
            expect(
                addMetaNoIndexNoFollow({
                    distributorName: 'EL PAIS'
                })
            ).toStrictEqual(<meta name="googlebot" content="noindex" />);
        });

        test('Return Googlebot meta when requestUri includes /distributor/el-pais', () => {
            expect(
                addMetaNoIndexNoFollow({
                    requestUri: '/distributor/el-pais/?_website=la-nacion-ar'
                })
            ).toStrictEqual(<meta name="googlebot" content="noindex" />);
        });
    });

    describe('addNoIndexNoFollow for outputType widgets and opta-embeds', () => {
        test('Return meta robots no index no follow when outputType is widgets', () => {
            expect(
                addMetaNoIndexNoFollow({
                    outputType: 'widgets'
                })
            ).toStrictEqual(<meta name="robots" content="noindex, nofollow" />);
        });

        test('Return meta robots no index no follow when outputType is opta-embeds', () => {
            expect(
                addMetaNoIndexNoFollow({
                    outputType: 'opta'
                })
            ).toStrictEqual(<meta name="robots" content="noindex, nofollow" />);
        });

        test('Return fragment when the layout is not home', () => {
            expect(
                addMetaNoIndexNoFollow({
                    siteProperties: {
                        layoutsName: {
                            HomeLN10: 'LN10-Home_Main'
                        }
                    },
                    layout: 'LN-Home-Sports',
                    outputType: 'default'
                })
            ).toStrictEqual(null);
        });

        test('Return fragment when receiving an empty object', () => {
            expect(addMetaNoIndexNoFollow({})).toStrictEqual(null);
        });

        test('Return fragment when receiving outputType undefined', () => {
            expect(
                addMetaNoIndexNoFollow({
                    outputType: undefined
                })
            ).toStrictEqual(null);
        });

        test('Return fragment when receiving outputType as an empty string', () => {
            expect(
                addMetaNoIndexNoFollow({
                    outputType: ''
                })
            ).toStrictEqual(null);
        });
    });

    describe('getTagTitle for acu', () => {
        test('Return pagebuilder title when nodeType is acu', () => {
            expect(
                getTagTitle({
                    PBTitle: 'Titulo de pagebuilder - LA NACION',
                    shortTitle: 'Titulo corto',
                    nodeType: 'acumulado',
                    siteProps: {
                        longTitle:
                            'Todas las noticias de Argentina y el mundo en LA NACION'
                    }
                })
            ).toBe('Titulo de pagebuilder - LA NACION');
        });
    });
    describe('getTagTitle for recipe note', () => {
        test('Return custom recipe title, using shortTitle as priority', () => {
            expect(
                getTagTitle({
                    PBTitle: 'Titulo de receta pagebuilder - LA NACION',
                    basicTitle: 'Titulo largo',
                    shortTitle: 'Titulo corto',
                    nodeType: 'acumulado',
                    siteProps: {
                        longTitle:
                            'Todas las noticias de Argentina y el mundo en LA NACION'
                    },
                    subtype: RECETA
                })
            ).toBe('Receta de titulo corto - LA NACION');
        });
        test('Return custom recipe title, using basicTitle (when has not shortTitle)', () => {
            expect(
                getTagTitle({
                    PBTitle: 'Titulo de receta pagebuilder - LA NACION',
                    basicTitle: 'Titulo largo',
                    nodeType: 'acumulado',
                    siteProps: {
                        longTitle:
                            'Todas las noticias de Argentina y el mundo en LA NACION'
                    },
                    subtype: RECETA
                })
            ).toBe('Receta de titulo largo - LA NACION');
        });
        test('Return custom recipe title, using meta_title with more prority than shortTitle', () => {
            expect(
                getTagTitle({
                    PBTitle: 'Titulo de receta pagebuilder - LA NACION',
                    basicTitle: 'Titulo largo',
                    nodeType: 'acumulado',
                    siteProps: {
                        longTitle:
                            'Todas las noticias de Argentina y el mundo en LA NACION'
                    },
                    subtype: RECETA,
                    metaTitle: 'I am a recipe metaTitle'
                })
            ).toBe('Receta de i am a recipe metaTitle - LA NACION');
        });
    });
});

describe('isUSALangHtml test', () => {
    const cases = [
        ['should return true', '/estados-unidos', undefined, true],
        ['should return false', '/economia', undefined, false],
        [
            'should return true',
            undefined,
            '/estados-unidos/nota-trump-biden-nid12345',
            true
        ],
        [
            'should return false',
            undefined,
            '/deportes/nota-messi-nid12345',
            false
        ],
        ['should return false', undefined, undefined, false]
    ];

    test.each(cases)('%s', (message, id, canonical, result) => {
        expect(isUSALangHtml(id, canonical)).toBe(result);
    });
});
