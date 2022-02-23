import {
    getTitle,
    getMetaDescriptionDefault
} from '../../../../../components/private/common/utils/outputTypeHelper';

describe('Common - utils - getTitle', () => {
    const metaValue = 'Ultimas noticias en la nacion';
    const siteProperties = {
        longTitle: 'Últimas noticias de Argentina y el mundo - LA NACION',
        title: 'LA NACION'
    };

    test('Test de retorno para el caso de metaValue en undefined', () => {
        const metaValue = undefined;
        const _nodeType = undefined;
        const title = getTitle(_nodeType, metaValue, siteProperties);

        expect(title).toStrictEqual('LA NACION');
    });

    test('Test de retorno para el caso de la home', () => {
        const _nodeType = 'home';
        const title = getTitle(_nodeType, metaValue, siteProperties);

        expect(title).toStrictEqual(
            'Últimas noticias de Argentina y el mundo - LA NACION'
        );
    });

    test('Test de retorno para el caso de acumulado', () => {
        const _nodeType = 'acumulado';
        const metaValue = 'Política - LA NACION';
        const layout = 'LN-acumulado';
        const title = getTitle(_nodeType, metaValue, layout, siteProperties);

        expect(title).toStrictEqual('Política - LA NACION');
    });

    test('Test de retorno para el caso de una nota ', () => {
        const _nodeType = 'nota';
        const metaValue =
            'Ola de calor: la temperatura superó los 40° en la ciudad y es la segunda más alta de la historia';
        const layout = 'LN-nota-noticia';

        const title = getTitle(_nodeType, metaValue, layout, siteProperties);

        expect(title).toStrictEqual(
            'Ola de calor: la temperatura superó los 40° en la ciudad y es la segunda más alta de la historia'
        );
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
});
