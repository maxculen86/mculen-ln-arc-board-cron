import {
    getTitle,
    getMetaDescriptionDefault,
    getSectionOfRequestUri
} from '../../../../../components/private/common/utils/outputTypeHelper';

describe('Common - utils - getTitle', () => {
    const metaValue = 'Ultimas noticias en la nacion';
    const siteProperties = {
        longTitle: 'Últimas noticias de Argentina y el mundo - LA NACION',
        title: 'LA NACION'
    };
    const requestUri = '/page/?_website=la-nacion-ar';

    test('Test de retorno para el caso de metaValue en undefined', () => {
        const metaValue = undefined;
        const _nodeType = undefined;

        const title = getTitle(
            metaValue,
            requestUri,
            siteProperties,
            _nodeType
        );

        expect(title).toStrictEqual('LA NACION');
    });

    test('Test de retorno para el caso de la home', () => {
        const _nodeType = 'home';
        const title = getTitle(
            metaValue,
            requestUri,
            siteProperties,
            _nodeType
        );

        expect(title).toStrictEqual(
            'Últimas noticias de Argentina y el mundo - LA NACION'
        );
    });

    test('Test de retorno para el caso de acumulado', () => {
        const _nodeType = 'acumulado';
        const metaValue = 'Política - LA NACION';
        const layout = 'LN-acumulado';
        const title = getTitle(
            metaValue,
            requestUri,
            siteProperties,
            _nodeType
        );

        expect(title).toStrictEqual('Política - LA NACION');
    });

    test('Test de retorno para el caso de una nota ', () => {
        const _nodeType = 'nota';
        const metaValue =
            'Ola de calor: la temperatura superó los 40° en la ciudad y es la segunda más alta de la historia';

        const title = getTitle(
            metaValue,
            requestUri,
            siteProperties,
            _nodeType
        );

        expect(title).toStrictEqual(
            'Ola de calor: la temperatura superó los 40° en la ciudad y es la segunda más alta de la historia'
        );
    });

    test('Test de retorno para el acu Mis notas', () => {
        const requestUri = '/mis-notas/?_website=la-nacion-ar';
        const _nodeType = 'acumulado';
        const metaValue = 'Mis Notas guardadas - LA NACION';

        const title = getTitle(
            metaValue,
            requestUri,
            siteProperties,
            _nodeType
        );

        expect(title).toStrictEqual('Mis Notas guardadas - LA NACION');
    });

    test('Test de retorno cuando requesUri no esta definida', () => {
        const requestUri = undefined;
        const _nodeType = 'home';

        const title = getTitle(
            metaValue,
            requestUri,
            siteProperties,
            _nodeType
        );

        expect(title).toStrictEqual(
            'Últimas noticias de Argentina y el mundo - LA NACION'
        );
    });

    test('Test de retorno para el acu Mis notas cuando el metaValue no esta definido', () => {
        const requestUri = '/mis-notas/?_website=la-nacion-ar';
        const _nodeType = 'acumulado';
        const metaValue = undefined;

        const title = getTitle(
            metaValue,
            requestUri,
            siteProperties,
            _nodeType
        );

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

    test('Test de retorno para el caso de metaValue("description") en undefined', () => {
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

    test('Test de retorno para acumulado', () => {
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

    test('Test de retorno para _nodeType !== acumulado', () => {
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

    test('Test de retorno para el acu Mis notas', () => {
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

    test('Test de retorno para el acu Mis notas, cuando el metaValue no esta definido.', () => {
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

    test('Test de retorno cuando el requestUri es correcto ', () => {
        expect(getSectionOfRequestUri(requestUri)).toStrictEqual('mis-notas');
    });

    test('Test de retorno cuando el requestUri no esta definido', () => {
        const requestUri = undefined;

        expect(getSectionOfRequestUri(requestUri)).toStrictEqual('');
    });
});
