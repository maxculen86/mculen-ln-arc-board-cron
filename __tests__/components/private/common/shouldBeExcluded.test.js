import { shouldBeExcluded } from '../../../../components/private/common/metarefresh';
import globalContentMock from '../../../../__mocks__/data/nota/globalContentMock.json';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('exclude metarefresh', () => {
    test('should exclude correctly', () => {
        const globalContent = globalContentMock;

        expect(shouldBeExcluded({ globalContent })).toBe(true);
    });

    test('should exclude correctly with label.metarefresh', () => {
        const globalContent = {
            label: {
                metarefresh: {
                    display: true,
                    text: 'No'
                }
            }
        };

        expect(shouldBeExcluded({ globalContent })).toBe(true);
    });

    test('should exclude correctly because one content_elements have type raw_html ', () => {
        const globalContent = {
            content_elements: [
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
            ]
        };

        expect(shouldBeExcluded({ globalContent })).toBe(true);
    });

    test('should exclude because promo_items.basic.type is video', () => {
        const globalContent = {
            promo_items: {
                basic: {
                    _id: 'YAHEC7EXR5ET7EWEDESTTQ74OI',
                    content:
                        '<iframe width="560" height="315" src="https://www.youtube.com/embed/HlhZ0XZHHaw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                    type: 'video'
                }
            }
        };

        expect(shouldBeExcluded({ globalContent })).toBe(true);
    });

    test('should NOT exclude', () => {
        let globalContent = { ...globalContentMock };
        globalContent.content_elements = [
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
        globalContent.label.metarefresh.text = 'Si';

        expect(shouldBeExcluded({ globalContent })).not.toBe(true);
    });
    test('should NOT exclude correctly because content_elements not have a type video or raw_html or oembed_response', () => {
        const globalContent = {
            content_elements: [
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
            ]
        };

        expect(shouldBeExcluded({ globalContent })).not.toBe(true);
    });
    test('should NOT exclude because the promo_items have type distinct video', () => {
        const globalContent = {
            promo_items: {
                basic: {
                    _id: 'YAHEC7EXR5ET7EWEDESTTQ74OI',
                    content:
                        '<iframe width="560" height="315" src="https://www.youtube.com/embed/HlhZ0XZHHaw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                    type: 'raw_html'
                }
            }
        };

        expect(shouldBeExcluded({ globalContent })).not.toBe(true);
    });
    test('should NOT exclude with label.metarefresh', () => {
        const globalContent = {
            label: {
                metarefresh: {
                    display: true,
                    text: 'Si'
                }
            }
        };

        expect(shouldBeExcluded({ globalContent })).not.toBe(true);
    });
});
