import {
    getTitle,
    getMetaDescriptionDefault
} from '../../../../../components/private/common/utils/outputTypeHelper';

describe('Common - utils - getTitle', () => {
    const _nodeType = 'home';
    const metaValue = undefined;
    const layout = 'LN-buscador';
    const requestUri = '/buscador/?query=holanda&_website=la-nacion-ar';
    const siteProperties = {
        host: 'https://www.lanacion.com.ar',
        longTitle: 'Últimas noticias de Argentina y el mundo - LA NACION',
        title: 'LA NACION'
    };

    test('Test de retorno para el buscador', () => {
        const title = getTitle(
            _nodeType,
            metaValue,
            layout,
            requestUri,
            siteProperties
        );

        expect(title).toStrictEqual(
            'holanda: Últimas noticias de Argentina y el mundo - LA NACION'
        );
    });

    test('Test de retorno para el caso de que no exista el metaValue("title") en pageBuilder', () => {
        const metaValue = undefined;
        const requestUri = undefined;

        const title = getTitle(
            _nodeType,
            metaValue,
            layout,
            requestUri,
            siteProperties
        );

        expect(title).toStrictEqual(
            'Últimas noticias de Argentina y el mundo - LA NACION'
        );
    });

    test('Test de retorno para el caso de que no se reciba una requestUri valida', () => {
        const requestUri = undefined;
        const title = getTitle(
            _nodeType,
            metaValue,
            layout,
            requestUri,
            siteProperties
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
            _nodeType,
            metaValue,
            layout,
            requestUri,
            siteProperties
        );

        expect(title).toStrictEqual('Política - LA NACION');
    });

    test('Test de retorno para el caso de una nota ', () => {
        const _nodeType = 'nota';
        const metaValue =
            'Ola de calor: la temperatura superó los 40° en la ciudad y es la segunda más alta de la historia';
        const layout = 'LN-nota-noticia';

        const title = getTitle(
            _nodeType,
            metaValue,
            layout,
            requestUri,
            siteProperties
        );

        expect(title).toStrictEqual(
            'Ola de calor: la temperatura superó los 40° en la ciudad y es la segunda más alta de la historia'
        );
    });
});

describe('Common Util getMetaDescriptionDefault', () => {
    const metaValue =
        'Resultados de búsqueda para las últimas noticias de + en LA NACION.  Noticias de Argentina y el mundo';
    const layout = 'LN-buscador';
    const defaultDescription =
        'Últimas noticias de Argentina y el mundo - LA NACION';
    const host = 'https://www.lanacion.com.ar';
    const requestUri = '/buscador/?query=holanda&_website=la-nacion-ar';
    const _nodeType = 'home';
    const _id = undefined;
    const Payload = undefined;
    const nodeType = undefined;
    const name = undefined;
    const arcSite = 'la-nacion-ar';
    test('Test de retorno para el buscador', () => {
        const metaDescription = getMetaDescriptionDefault(
            metaValue,
            layout,
            defaultDescription,
            host,
            requestUri,
            _nodeType,
            _id,
            Payload,
            nodeType,
            name,
            arcSite
        );

        expect(metaDescription).toStrictEqual(
            'Resultados de búsqueda para las últimas noticias de holanda en LA NACION.  Noticias de Argentina y el mundo'
        );
    });

    test('Test de retorno para el caso de que no exista el metaValue("description") en pageBuilder', () => {
        const metaValue = undefined;

        const metaDescription = getMetaDescriptionDefault(
            metaValue,
            layout,
            defaultDescription,
            host,
            requestUri,
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
            host,
            requestUri,
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

    test('Test de retorno para nota', () => {
        const metaValue =
            'La Unión Europea sacó a la Argentina de la lista de países desde los que se puede viajar sin restricciones - LA NACION';
        const _nodeType = 'nota';
        const _id = 'WLBYLGLLX5BMNPYJRYJFP6';

        const metaDescription = getMetaDescriptionDefault(
            metaValue,
            layout,
            defaultDescription,
            host,
            requestUri,
            _nodeType,
            _id,
            Payload,
            nodeType,
            name,
            arcSite
        );

        expect(metaDescription).toStrictEqual(
            'La Unión Europea sacó a la Argentina de la lista de países desde los que se puede viajar sin restricciones - LA NACION'
        );
    });
});
