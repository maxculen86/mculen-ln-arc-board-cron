import { shouldBeExcluded } from '../../../../components/private/common/metarefresh';
import globalContentMock from '../../../../__mocks__/data/nota/globalContentMock.json';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('exclude metarefresh', () => {
    test('should exclude correctly', () => {
        expect(shouldBeExcluded({ globalContent: globalContentMock })).toBe(
            true
        );
    });

    test('should exclude correctly with label.metarefresh', () => {
        const globalContent = {
            ...globalContentMock,
            label: {
                metarefresh: {
                    display: true,
                    text: 'No'
                }
            },
            content_elements: undefined,
            promo_items: undefined
        };

        expect(shouldBeExcluded({ globalContent })).toBe(true);
    });

    test('should exclude correctly because one content_elements have type raw_html ', () => {
        const globalContent = {
            ...globalContentMock,
            promo_items: undefined,
            label: undefined
        };

        expect(shouldBeExcluded({ globalContent })).toBe(true);
    });

    test('should exclude because promo_items.basic.type is video', () => {
        const globalContent = {
            ...globalContentMock,
            promo_items: {
                basic: {
                    _id: 'YAHEC7EXR5ET7EWEDESTTQ74OI',
                    content:
                        '<iframe width="560" height="315" src="https://www.youtube.com/embed/HlhZ0XZHHaw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                    type: 'video'
                }
            },
            content_elements: undefined,
            label: undefined
        };

        expect(shouldBeExcluded({ globalContent })).toBe(true);
    });

    test('should NOT exclude', () => {
        const globalContent = {
            ...globalContentMock,
            content_elements: [
                {
                    _id: 'SIP3MNMHONFCPEVA5XHANEE3NE',
                    additional_properties: {},
                    content: 'Esta es la cobertura en vivo en el cuerpo',
                    type: 'text'
                }
            ],
            label: {
                metarefresh: {
                    display: true,
                    text: 'Si'
                }
            },
            promo_items: undefined
        };

        expect(shouldBeExcluded({ globalContent })).not.toBe(true);
    });
    test('should NOT exclude correctly because content_elements not have a type video or raw_html or oembed_response', () => {
        const globalContent = {
            ...globalContentMock,
            content_elements: [
                {
                    _id: 'HOWHVHRS5VF3PHYBDUUOOOR7OE',
                    additional_properties: {},
                    content: 'Esta ocurriendo un evento',
                    type: 'text'
                }
            ],
            promo_items: undefined,
            label: undefined
        };

        expect(shouldBeExcluded({ globalContent })).not.toBe(true);
    });
    test('should NOT exclude because the promo_items have type distinct video', () => {
        const globalContent = {
            ...globalContentMock,
            promo_items: {
                basic: {
                    _id: 'YAHEC7EXR5ET7EWEDESTTQ74OI',
                    content:
                        '<iframe width="560" height="315" src="https://www.youtube.com/embed/HlhZ0XZHHaw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                    type: 'raw_html'
                }
            },
            content_elements: undefined,
            label: undefined
        };

        expect(shouldBeExcluded({ globalContent })).not.toBe(true);
    });
    test('should NOT exclude with label.metarefresh', () => {
        const globalContent = {
            ...globalContentMock,
            label: {
                metarefresh: {
                    display: true,
                    text: 'Si'
                }
            },
            content_elements: undefined,
            label: undefined
        };

        expect(shouldBeExcluded({ globalContent })).not.toBe(true);
    });
});
