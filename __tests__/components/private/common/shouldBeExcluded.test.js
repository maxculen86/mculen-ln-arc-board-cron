import { shouldBeExcluded } from '../../../../components/private/common/metarefresh';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('exclude metarefresh', () => {
    test('should exclude correctly', () => {
        const contentElements = [
            {
                _id: 'SIP3MNMHONFCPEVA5XHANEE3NE',
                additional_properties: {},
                content: 'Esta es la cobertura en vivo en el cuerpo',
                type: 'text'
            },
            {
                _id: 'BMMI2WKV4VBO5NWFDHEQCCBJ7I',
                raw_oembed: {
                    height: 340,
                    html:
                        '<iframe width="453" height="340" src="https://www.youtube.com/embed/HlhZ0XZHHaw?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="LN+ EN VIVO - Últimas noticias de la Argentina y el mundo"></iframe>',
                    type: 'youtube',
                    width: 453
                },
                subtype: 'youtube',
                type: 'oembed_response'
            },
            {
                _id: 'DJWM36OWTRELDISIWDSVBS6IN4',
                additional_properties: {},
                content:
                    '<iframe width="560" height="315" src="https://www.youtube.com/embed/HlhZ0XZHHaw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                type: 'raw_html'
            }
        ];

        const promoItem = {
            _id: 'YAHEC7EXR5ET7EWEDESTTQ74OI',
            content:
                '<iframe width="560" height="315" src="https://www.youtube.com/embed/HlhZ0XZHHaw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
            type: 'raw_html'
        };

        const labelMetarefresh = {
            display: true,
            text: 'No'
        };
        debugger;
        expect(
            shouldBeExcluded({ contentElements, promoItem, labelMetarefresh })
        ).toBe(true);
    });

    test('should exclude correctly with labelMetarefresh', () => {
        const labelMetarefresh = {
            display: true,
            text: 'No'
        };

        expect(
            shouldBeExcluded({
                contentElements: null,
                promoItem: null,
                labelMetarefresh
            })
        ).toBe(true);
    });

    test('should exclude correctly because one contentElement have type raw_html ', () => {
        const contentElements = [
            {
                _id: 'SIP3MNMHONFCPEVA5XHANEE3NE',
                additional_properties: {},
                content: 'Esta es la cobertura en vivo en el cuerpo',
                type: 'text'
            },
            {
                _id: 'BMMI2WKV4VBO5NWFDHEQCCBJ7I',
                raw_oembed: {
                    height: 340,
                    html:
                        '<iframe width="453" height="340" src="https://www.youtube.com/embed/HlhZ0XZHHaw?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="LN+ EN VIVO - Últimas noticias de la Argentina y el mundo"></iframe>',
                    type: 'youtube',
                    width: 453
                },
                subtype: 'youtube',
                type: 'oembed_response'
            },
            {
                _id: 'DJWM36OWTRELDISIWDSVBS6IN4',
                additional_properties: {},
                content:
                    '<iframe width="560" height="315" src="https://www.youtube.com/embed/HlhZ0XZHHaw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                type: 'raw_html'
            }
        ];

        expect(
            shouldBeExcluded({
                contentElements,
                promoItem: null,
                labelMetarefresh: null
            })
        ).toBe(true);
    });

    test('should exclude because promoItem have type video', () => {
        const promoItem = {
            _id: 'YAHEC7EXR5ET7EWEDESTTQ74OI',
            content:
                '<iframe width="560" height="315" src="https://www.youtube.com/embed/HlhZ0XZHHaw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
            type: 'video'
        };

        expect(
            shouldBeExcluded({
                contentElements: null,
                promoItem,
                labelMetarefresh: null
            })
        ).toBe(true);
    });

    test('should NOT exclude because contentElements promoItem labelMetarefresh are null', () => {
        expect(
            shouldBeExcluded({
                contentElements: null,
                promoItem: null,
                labelMetarefresh: null
            })
        ).not.toBe(true);
    });

    test('should NOT exclude', () => {
        const contentElements = [
            {
                _id: 'SIP3MNMHONFCPEVA5XHANEE3NE',
                additional_properties: {},
                content: 'Esta es la cobertura en vivo en el cuerpo',
                type: 'text'
            },
            {
                _id: 'BGX42LXVFZCSXILS6DDFHEZSRE',
                additional_properties: {},
                content: 'Segundo parrafo hablando del evento',
                type: 'text'
            }
        ];

        const promoItem = {
            _id: 'YAHEC7EXR5ET7EWEDESTTQ74OI',
            content:
                '<iframe width="560" height="315" src="https://www.youtube.com/embed/HlhZ0XZHHaw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
            type: 'raw_html'
        };

        const labelMetarefresh = {
            display: true,
            text: 'Si'
        };

        expect(
            shouldBeExcluded({ contentElements, promoItem, labelMetarefresh })
        ).not.toBe(true);
    });
    test('should NOT exclude correctly because contentElement not have a type video or raw_html or oembed_response', () => {
        const contentElements = [
            {
                _id: 'HOWHVHRS5VF3PHYBDUUOOOR7OE',
                additional_properties: {},
                content: 'Esta ocurriendo un evento',
                type: 'text'
            },
            {
                _id: 'BGX42LXVFZCSXILS6DDFHEZSRE',
                additional_properties: {},
                content: 'Segundo parrafo hablando del evento',
                type: 'text'
            },
            {
                _id: '4NDI66DSANECZE4VJ23NZBXI3U',
                additional_properties: {},
                content: 'Tercer parrafo',
                type: 'text'
            }
        ];

        expect(
            shouldBeExcluded({
                contentElements,
                promoItem: null,
                labelMetarefresh: null
            })
        ).not.toBe(true);
    });
    test('should NOT exclude because the promoItem have type distinct video', () => {
        const promoItem = {
            _id: 'YAHEC7EXR5ET7EWEDESTTQ74OI',
            content:
                '<iframe width="560" height="315" src="https://www.youtube.com/embed/HlhZ0XZHHaw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
            type: 'raw_html'
        };

        expect(
            shouldBeExcluded({
                contentElements: null,
                promoItem,
                labelMetarefresh: null
            })
        ).not.toBe(true);
    });
    test('should NOT exclude with labelMetarefresh', () => {
        const labelMetarefresh = {
            display: true,
            text: 'Si'
        };

        expect(
            shouldBeExcluded({
                contentElements: null,
                promoItem: null,
                labelMetarefresh
            })
        ).not.toBe(true);
    });
});
