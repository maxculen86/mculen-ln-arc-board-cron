import React from 'react';
import Context from 'fusion:context';
import {
    getTitle,
    getMetaDescriptionDefault,
    getSectionOfRequestUri,
    metasFromSiteServices,
    getTagTitle
} from '../../../../../components/private/common/utils/outputTypeHelper';

jest.mock('fusion:context', Component => {
    return function(Component) {
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
});

describe('Tests - metasFromSiteServices', () => {
    const metaTags = {
        robots: 'noindex, nofollow',
        title: 'La Nacion'
    };

    test('Return test when metaTags is defined', () => {
        expect(metasFromSiteServices(metaTags)).toStrictEqual([
            <meta content="noindex, nofollow" name="robots" />,
            <meta content="La Nacion" name="title" />
        ]);
    });

    test('Return test when metaTags is not defined', () => {
        expect(metasFromSiteServices(undefined)).toStrictEqual(<></>);
    });

    test('Return test when one of the properties does not have a value', () => {
        expect(
            metasFromSiteServices({
                ...metaTags,
                title: ''
            })
        ).toStrictEqual([
            <meta content="noindex, nofollow" name="robots" />,
            ''
        ]);
    });

    test('Return tests when the parameter received is an array', () => {
        expect(metasFromSiteServices([{}])).toStrictEqual(<></>);
    });
});

describe('getTagTitle function test', () => {
    describe('getTagTitle for note', () => {
        test('Return when both titles are defined must be shortTitle', () => {
            expect(
                getTagTitle({
                    basicTitle: 'Titulo de pagebuilder - LA NACION',
                    shortTitle: 'Titulo corto',
                    ottTitle: 'titulo ott',
                    nodeType: 'nota',
                    siteProps: {},
                    arcSite: 'la-nacion-ar'
                })
            ).toBe('Titulo corto - LA NACION');
        });
        test('Return when short title isnt defined, return basic title', () => {
            expect(
                getTagTitle({
                    basicTitle: 'Titulo de pagebuilder - LA NACION',
                    shortTitle: '',
                    ottTitle: 'titulo ott',
                    nodeType: 'nota',
                    siteProps: {},
                    arcSite: 'la-nacion-ar'
                })
            ).toBe('Titulo de pagebuilder - LA NACION');
        });
    });

    describe('getTagTitle for home', () => {
        test('Return longTitle from siteProps when its defined', () => {
            expect(
                getTagTitle({
                    basicTitle: 'Titulo de pagebuilder - LA NACION',
                    shortTitle: 'Titulo corto',
                    ottTitle: 'titulo ott',
                    nodeType: 'home',
                    siteProps: {
                        longTitle:
                            'Todas las noticias de Argentina y el mundo en LA NACION'
                    },
                    arcSite: 'la-nacion-ar'
                })
            ).toBe('Todas las noticias de Argentina y el mundo en LA NACION');
        });
        test('Return basic title when longTitle is not defined', () => {
            expect(
                getTagTitle({
                    basicTitle: 'Titulo de pagebuilder - LA NACION',
                    shortTitle: '',
                    ottTitle: 'titulo ott',
                    nodeType: 'home',
                    siteProps: {},
                    arcSite: 'la-nacion-ar'
                })
            ).toBe('Titulo de pagebuilder - LA NACION');
        });
    });
    describe('getTagTitle for ott', () => {
        test('Return ottTitle when arcSite is ott', () => {
            expect(
                getTagTitle({
                    basicTitle: 'Titulo de pagebuilder - LA NACION',
                    shortTitle: 'Titulo corto',
                    ottTitle: 'titulo ott',
                    nodeType: 'home',
                    siteProps: {
                        longTitle:
                            'Todas las noticias de Argentina y el mundo en LA NACION'
                    },
                    arcSite: 'ott'
                })
            ).toBe('titulo ott');
        });
    });
});
