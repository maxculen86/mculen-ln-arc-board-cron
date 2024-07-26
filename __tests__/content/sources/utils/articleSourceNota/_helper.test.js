import {
    getUrlQuery,
    transformPromoItems,
    filterSections,
    transformAuthors,
    transformElementsBasedOnType,
    setRedirect
} from '../../../../../content/sources/utils/articleSourceNota/_helper';
import Redirect from '../../../../../content/sources/utils/redirect';
import {
    addHttpsLinkInParagraphs,
    addHttpsInterstitialLink,
    replaceMalformedAnchorTags,
    formatElementText,
    removeErrosInterstitialLink,
    formatInterstitialLink,
    injectGlossaryInText
} from '../../../../../content/sources/utils/articleSourceNota/_configs';

describe('Tests articleSourceNota - _helper', () => {
    describe('Tests injectGlossaryInText function', () => {
        it('should inject glossary HTML into the content when exist a word of glossary', () => {
            const glossary = [
                {
                    key: 'CCL',
                    value:
                        'Dólar CCL es una variante a la que pueden acceder los argentinos para fondear cuentas en dólares en el exterior.'
                },
                {
                    key: 'Cedears',
                    value:
                        '(Certificados de Depósito Argentinos), son papeles que siguen cotizaciones de compañías extranjeras en mercados globales y que se suscriben en pesos -también en dólares- pero siguen las fluctuaciones del dólar Contado con Liquidación (CCL).'
                }
            ];

            const content =
                'El <b>dólar CCL </b> registra un aumento en lo que va del mes de 7,5% y la brecha se ubica en 47,18%, con lo cual superó el máximo reciente de 46,1% registrado a inicios de junio.';

            const expected = {
                foundGlossaryWord: true,
                text:
                    'El <b>dólar <mark class="word-glossary" onmouseenter="if(window.LN.handleGlossary) { window.LN.handleGlossary(event,\'CCL\') }" onmouseleave="if(window.LN.handleGlossary) { window.LN.handleGlossary(event,\'CCL\') }">CCL</mark> </b> registra un aumento en lo que va del mes de 7,5% y la brecha se ubica en 47,18%, con lo cual superó el máximo reciente de 46,1% registrado a inicios de junio.'
            };

            expect(injectGlossaryInText(content, glossary)).toEqual(expected);
        });

        it('should not inject glossary HTML when no glossary word is found', () => {
            const glossary = [
                {
                    key: 'CCL',
                    value:
                        'Dólar CCL es una variante a la que pueden acceder los argentinos para fondear cuentas en dólares en el exterior.'
                },
                {
                    key: 'Cedears',
                    value:
                        '(Certificados de Depósito Argentinos), son papeles que siguen cotizaciones de compañías extranjeras en mercados globales y que se suscriben en pesos -también en dólares- pero siguen las fluctuaciones del dólar Contado con Liquidación (CCL).'
                }
            ];

            const content =
                'Los que hayan adquirido dólar “bolsa” o contado con liquidación en los 90 días anteriores';

            const expected = {
                foundGlossaryWord: false,
                text:
                    'Los que hayan adquirido dólar “bolsa” o contado con liquidación en los 90 días anteriores'
            };

            expect(injectGlossaryInText(content, glossary)).toEqual(expected);
        });

        it('should return the original content when the glossary is an empty array', () => {
            const glossary = [];

            const content =
                'Beneficiarios de un plan o programa de la Administración Nacional de la Seguridad Social (Anses), como la Asignación Universal por Hijo (AUH) o la Asignación Universal por Embarazo (AUE)';

            const expected = {
                foundGlossaryWord: false,
                text:
                    'Beneficiarios de un plan o programa de la Administración Nacional de la Seguridad Social (Anses), como la Asignación Universal por Hijo (AUH) o la Asignación Universal por Embarazo (AUE)'
            };
            expect(injectGlossaryInText(content, glossary)).toEqual(expected);
        });
    });

    describe('Tests addHttpsInterstitialLink function', () => {
        const urlWithHttps =
            'https://www.lanacion.com.ar/sabado/en-florida-la-isla-deshabitada-y-paradisiaca-que-cautiva-a-los-turistas-nid07012023/';
        it('Should return https when the url has http', () => {
            expect(
                addHttpsInterstitialLink(
                    'http://www.lanacion.com.ar/sabado/en-florida-la-isla-deshabitada-y-paradisiaca-que-cautiva-a-los-turistas-nid07012023/'
                )
            ).toStrictEqual(urlWithHttps);
        });

        it('Should return https when the url has no protocol', () => {
            expect(
                addHttpsInterstitialLink(
                    '//www.lanacion.com.ar/sabado/en-florida-la-isla-deshabitada-y-paradisiaca-que-cautiva-a-los-turistas-nid07012023/'
                )
            ).toStrictEqual(urlWithHttps);
        });

        it('Should return the url exactly the same when it has https', () => {
            expect(
                addHttpsInterstitialLink(
                    'https://www.lanacion.com.ar/sabado/en-florida-la-isla-deshabitada-y-paradisiaca-que-cautiva-a-los-turistas-nid07012023/'
                )
            ).toStrictEqual(urlWithHttps);
        });
    });

    describe('Tests addHttpsLinkInParagraphs function', () => {
        it('Should return https when the url has no protocol', () => {
            expect(
                addHttpsLinkInParagraphs(
                    'Agregar este almíbar a las claras mientras se van batiendo por unos 7 minutos. Luego colocar un papel film en <a href="//lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">contacto</a>.'
                )
            ).toStrictEqual(
                'Agregar este almíbar a las claras mientras se van batiendo por unos 7 minutos. Luego colocar un papel film en <a href="https://lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">contacto</a>.'
            );
        });

        it('Should return https when the url has http', () => {
            expect(
                addHttpsLinkInParagraphs(
                    'Agregar este almíbar a las claras mientras se van batiendo por unos 7 minutos. Luego colocar un papel film en <a href="http://lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">contacto</a>.'
                )
            ).toStrictEqual(
                'Agregar este almíbar a las claras mientras se van batiendo por unos 7 minutos. Luego colocar un papel film en <a href="https://lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">contacto</a>.'
            );
        });

        it('Should return https when you succeed more than two urls without protocol or with http', () => {
            expect(
                addHttpsLinkInParagraphs(
                    'Cuando se lleva el relleno a la masa, es <a href="http://www.lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">conveniente</a> colocar una base de almendras trituradas para evitar que el merengue se <a href="//www.lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">deslice</a>.'
                )
            ).toStrictEqual(
                'Cuando se lleva el relleno a la masa, es <a href="https://www.lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">conveniente</a> colocar una base de almendras trituradas para evitar que el merengue se <a href="https://www.lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">deslice</a>.'
            );
        });

        it('Should return the url exactly the same when it has https', () => {
            expect(
                addHttpsLinkInParagraphs(
                    'Agregar este almíbar a las claras mientras se van batiendo por unos 7 minutos. Luego colocar un papel film en <a href="https://lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">contacto</a>.'
                )
            ).toStrictEqual(
                'Agregar este almíbar a las claras mientras se van batiendo por unos 7 minutos. Luego colocar un papel film en <a href="https://lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">contacto</a>.'
            );
        });

        it('Should return content when the content is not a string', () => {
            expect(addHttpsLinkInParagraphs({})).toStrictEqual({});
        });
    });

    describe('Tests getUrlQuery function', () => {
        const mockKey = {
            'arc-site': 'foodit',
            id: 'AJING3OCZRHWFJGE5I4HFBFMPY',
            url: '/receta/pollito-con-papa/'
        };

        test('should return query with id', () => {
            expect(
                getUrlQuery({
                    ...mockKey,
                    url: undefined,
                    id: 'AJING3OCZRHWFJGE5I4HFBFMPY'
                })
            ).toStrictEqual(
                '/content/v4/stories/?website=foodit&_id=AJING3OCZRHWFJGE5I4HFBFMPY'
            );
        });

        test('should return query with website_url when url is provided', () => {
            expect(getUrlQuery({ ...mockKey, id: undefined })).toStrictEqual(
                '/content/v4/stories/?website=foodit&website_url=/receta/pollito-con-papa/'
            );
        });

        test('should return query with published', () => {
            expect(
                getUrlQuery({
                    ...mockKey,
                    url: undefined,
                    published: 'false'
                })
            ).toStrictEqual(
                '/content/v4/stories/?website=foodit&published=false&_id=AJING3OCZRHWFJGE5I4HFBFMPY'
            );
        });

        test('should return query with included fields', () => {
            expect(
                getUrlQuery({
                    ...mockKey,
                    sourceInclude: 'field1,field2'
                })
            ).toStrictEqual(
                '/content/v4/stories/?website=foodit&included_fields=field1,field2&_id=AJING3OCZRHWFJGE5I4HFBFMPY'
            );
        });

        test('should handle and clean URL for specific format', () => {
            expect(
                getUrlQuery({
                    ...mockKey,
                    id: undefined,
                    published: undefined,
                    sourceInclude: undefined,
                    url: '/api/v1/notas/byUrl/receta/pollito-con-papa/'
                })
            ).toStrictEqual(
                '/content/v4/stories/?website=foodit&website_url=/receta/pollito-con-papa/'
            );
        });

        test('should throw an error when neither url nor id is provided', () => {
            expect(() => getUrlQuery({})).toThrowError(
                'Debe definir url o id para obtener la nota'
            );
        });

        test('should throw an error when the props is not defined or null', () => {
            expect(() => getUrlQuery(undefined)).toThrowError(
                'Debe definir url o id para obtener la nota'
            );
            expect(() => getUrlQuery(null)).toThrowError(
                'Debe definir url o id para obtener la nota'
            );
        });
    });

    describe('Tests transformPromoItems function', () => {
        const resultConvertVideoArcToJW = {
            embed: {
                config: {
                    idPlayer: 'ih0086X3',
                    idVideo: 'wzNCu0kE',
                    videoJw: {
                        description: ' ',
                        kind: 'Single Item',
                        playlist: [],
                        title:
                            'Ariel en su salsa: Waffles de chocolate con bananas foster'
                    }
                }
            },
            subtype: 'video_jw'
        };
        const resultCallbackImage = {
            type: 'image',
            id: 'image-id',
            resized_urls: []
        };
        const mockCallbackConvertVideoToJW = jest
            .fn()
            .mockResolvedValue(resultConvertVideoArcToJW);
        const mockCallback2 = jest.fn().mockResolvedValue({
            type: 'image',
            id: 'image-id',
            resized_urls: []
        });
        const cachedCall = jest.fn();

        const mockConfigCallbacks = {
            video: mockCallbackConvertVideoToJW,
            image: mockCallback2
        };

        const mockPromoItemObject = {
            apertura_multimedia: { type: 'video', id: 'video-id' },
            basic: { type: 'image', id: 'image-id' }
        };

        test('should transform promo items using callbacks', async () => {
            const result = await transformPromoItems({
                cachedCall,
                arcSite: 'foodit',
                configCallbacks: mockConfigCallbacks,
                promoItemObject: mockPromoItemObject
            });

            expect(mockCallbackConvertVideoToJW).toHaveBeenCalledWith({
                element: mockPromoItemObject.apertura_multimedia,
                cachedCall,
                arcSite: 'foodit'
            });

            expect(mockCallback2).toHaveBeenCalledWith({
                element: mockPromoItemObject.basic,
                cachedCall,
                arcSite: 'foodit'
            });

            expect(result).toEqual({
                apertura_multimedia: resultConvertVideoArcToJW,
                basic: resultCallbackImage
            });
        });

        test('should handle empty promoItemObject', async () => {
            const result = await transformPromoItems({
                cachedCall,
                arcSite: 'foodit',
                configCallbacks: mockConfigCallbacks
            });

            expect(result).toEqual({});
        });

        test('should handle callbacks that return undefined', async () => {
            mockCallbackConvertVideoToJW.mockResolvedValueOnce(undefined);

            const result = await transformPromoItems({
                cachedCall,
                arcSite: 'foodit',
                configCallbacks: mockConfigCallbacks,
                promoItemObject: mockPromoItemObject
            });

            expect(result).toEqual({
                apertura_multimedia: undefined,
                basic: {
                    id: 'image-id',
                    type: 'image',
                    resized_urls: []
                }
            });
        });
    });

    describe('Tests replaceMalformedAnchorTags function', () => {
        test('should replace malformed anchor tags with new value', () => {
            const textTypeElement = {
                content: '<a href="https://example\\">Link 1</a>'
            };
            const newValue = '';
            const result = replaceMalformedAnchorTags({
                textTypeElement,
                newValue
            });
            expect(result.content).toStrictEqual('Link 1');
        });

        test('should replace multiple malformed anchor tags with new value', () => {
            const textTypeElement = {
                content:
                    'This is <a href="https://example\\">Link 1</a> <a href="https://example2\\">Link 2</a>'
            };
            const newValue = '';
            const result = replaceMalformedAnchorTags({
                textTypeElement,
                newValue
            });
            expect(result.content).toStrictEqual('This is Link 1 Link 2');
        });

        test('should not replace well-formed anchor tags', () => {
            const textTypeElement = {
                content: '<a href="https://example.com">Link 1</a>'
            };
            const newValue = 'Replacement';
            const result = replaceMalformedAnchorTags({
                textTypeElement,
                newValue
            });
            expect(result.content).toStrictEqual(
                '<a href="https://example.com">Link 1</a>'
            );
        });

        test('should not replace when no malformed anchor tags present', () => {
            const textTypeElement = {
                content: 'This is plain text without any anchor tags.'
            };
            const newValue = 'Replacement';
            const result = replaceMalformedAnchorTags({
                textTypeElement,
                newValue
            });
            expect(result.content).toStrictEqual(
                'This is plain text without any anchor tags.'
            );
        });

        test('should handle empty content', () => {
            const textTypeElement = {
                content: ''
            };
            const newValue = 'Replacement';
            const result = replaceMalformedAnchorTags({
                textTypeElement,
                newValue
            });
            expect(result.content).toStrictEqual('');
        });

        test('should handle empty textTypeElement', () => {
            const result = replaceMalformedAnchorTags({
                textTypeElement: null,
                newValue: 'Replacement'
            });
            expect(result).toBeNull();
        });

        test('should handle empty newValue', () => {
            const textTypeElement = {
                content: '<a href="https://example\\">Link 1</a>'
            };
            const result = replaceMalformedAnchorTags({
                textTypeElement,
                newValue: ''
            });
            expect(result.content).toStrictEqual('Link 1');
        });
    });

    describe('Tests formatElementText function', () => {
        test('should add "https://" in paragraphs link', () => {
            const elementText = {
                content:
                    'This is a <p>paragraph</p> with a <a href="//lanacion.com.ar/">link</a>.'
            };
            const result = formatElementText(elementText);
            expect(result.content).toStrictEqual(
                'This is a <p>paragraph</p> with a <a href="https://lanacion.com.ar/">link</a>.'
            );
        });

        test('should add forward slash in paragraphs links', () => {
            const elementText = {
                content:
                    'This is a <p>paragraph</p> with a <a href="https://lanacion.com.ar">link</a>.'
            };
            const result = formatElementText(elementText);
            expect(result.content).toStrictEqual(
                'This is a <p>paragraph</p> with a <a href="https://lanacion.com.ar/">link</a>.'
            );
        });

        test('should replace malformed anchor tags with empty value', () => {
            const elementText = {
                content:
                    'This is a text with malformed link: <a href="https://example\\">Link 1</a>'
            };
            const result = formatElementText(elementText);
            expect(result.content).toStrictEqual(
                'This is a text with malformed link: Link 1'
            );
        });

        test('should handle empty elementText', () => {
            const result = formatElementText();
            expect(result).toEqual({
                content: ''
            });
        });

        test('should handle empty content in elementText', () => {
            const elementText = {
                content: ''
            };
            const result = formatElementText(elementText);
            expect(result.content).toStrictEqual('');
        });

        test('should handle empty content when elementText is null', () => {
            const result = formatElementText(null);
            expect(result.content).toStrictEqual('');
        });
    });

    describe('Tests removeErrosInterstitialLink function', () => {
        test('should return empty string for invalid URL format', () => {
            const invalidUrls = ['invalid-url', 'ftp://example.com'];

            invalidUrls.forEach(url => {
                const result = removeErrosInterstitialLink(url);
                console.log(result);
                expect(result).toStrictEqual('');
            });
        });

        test('should return original URL for valid URL format', () => {
            const validUrls = [
                'http://example.com',
                'https://example.com/path',
                'https://www.example.com'
            ];

            validUrls.forEach(url => {
                const result = removeErrosInterstitialLink(url);
                expect(result).toStrictEqual(url);
            });
        });

        test('should handle empty string as input', () => {
            const result = removeErrosInterstitialLink('');
            expect(result).toStrictEqual('');
        });

        test('should handle non-string input', () => {
            const nonStringInputs = [null, undefined, 123, { key: 'value' }];

            nonStringInputs.forEach(input => {
                const result = removeErrosInterstitialLink(input);
                expect(result).toStrictEqual('');
            });
        });
    });

    describe('Tests formatInterstitialLink function', () => {
        test('should format interstitial link with forward slash and https', () => {
            expect(formatInterstitialLink('//lanacion.com.ar')).toEqual(
                'https://lanacion.com.ar/'
            );
        });

        test('should return null when the url is a empty string', () => {
            expect(formatInterstitialLink('')).toStrictEqual('');
        });

        test('should return null when the url is invalid', () => {
            expect(formatInterstitialLink('invalid-url')).toStrictEqual('');
        });

        test('should return null when non-string url', () => {
            expect(formatInterstitialLink(123)).toStrictEqual('');
        });

        test('should return null when the url is not defined or is null', () => {
            expect(formatInterstitialLink(null)).toStrictEqual('');
            expect(formatInterstitialLink(undefined)).toStrictEqual('');
        });
    });

    describe('Tests filterSections function', () => {
        test('should filter sections from valid response', () => {
            const validResponse = {
                taxonomy: {
                    sections: [
                        { type: 'section', name: 'Section 1' },
                        { type: 'category', name: 'Category 1' },
                        { type: 'section', name: 'Section 2' }
                    ]
                }
            };
            expect(filterSections(validResponse)).toStrictEqual({
                sections: [
                    { type: 'section', name: 'Section 1' },
                    { type: 'section', name: 'Section 2' }
                ]
            });
        });

        test('should return a empty array when the response is not defined', () => {
            const result = filterSections();
            expect(result.sections).toHaveLength(0);
        });

        test('should return a empty array when the response is a empty object', () => {
            const result = filterSections({});
            expect(result.sections).toHaveLength(0);
        });

        test('should return a empty array when the taxonomy is a empty object', () => {
            const responseWithoutSections = {
                taxonomy: {}
            };
            const result = filterSections(responseWithoutSections);
            expect(result.sections).toHaveLength(0);
        });

        test('should handle sections property with non-object items', () => {
            const responseWithNonObjectItems = {
                taxonomy: {
                    sections: [null, 'not-an-object', 123]
                }
            };
            const result = filterSections(responseWithNonObjectItems);
            expect(result.sections).toHaveLength(0);
        });

        test('should handle sections property with items missing type property', () => {
            const responseWithItemsMissingType = {
                taxonomy: {
                    sections: [
                        { name: 'Section 1' },
                        { type: 'section', name: 'Section 2' }
                    ]
                }
            };
            const result = filterSections(responseWithItemsMissingType);
            expect(result.sections).toHaveLength(1);
            expect(result.sections).toEqual([
                { type: 'section', name: 'Section 2' }
            ]);
        });

        test('should handle sections property with items of type other than "section"', () => {
            const responseWithItemsOfDifferentType = {
                taxonomy: {
                    sections: [
                        { type: 'category', name: 'Category 1' },
                        { type: 'tag', name: 'Tag 1' }
                    ]
                }
            };
            const result = filterSections(responseWithItemsOfDifferentType);
            expect(result.sections).toHaveLength(0);
        });
    });

    describe('Tests transformAuthors function', () => {
        test('should transform author list with resized image URL', () => {
            const authorList = [
                {
                    _id: 'francisco-jueguen-12',
                    additional_properties: {
                        original: {
                            byline: 'Francisco Jueguen',
                            image:
                                'https://s3.amazonaws.com/2Farc-authors-22f7-497f-9fb8-6e918922e5ce.png',
                            role: 'LA NACION'
                        }
                    },
                    image: {
                        auth: {
                            '1':
                                'f52540fae363f59649ac6fb60654aa4b43d338bd359a34f2ef80497ffb8f9b04'
                        },
                        resized_urls: [
                            {
                                option: {
                                    height: 80,
                                    media: '(min-width: 320px)',
                                    width: 80
                                },
                                resizedUrl:
                                    'https://www.lanacion.com.ar/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-authors%2Flanacionar%2F43ae64e8-22f7-497f-9fb8-6e918922e5ce.png?auth=f52540fae363f59649ac6fb60654aa4b43d338bd359a34f2ef80497ffb8f9b04&width=80&quality=70&smart=false'
                            }
                        ],
                        url:
                            'https://www.lanacion.com.ar/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-authors%2Flanacionar%2F43ae64e8-22f7-497f-9fb8-6e918922e5ce.png?auth=f52540fae363f59649ac6fb60654aa4b43d338bd359a34f2ef80497ffb8f9b04&width=768&quality=70&smart=false'
                    },
                    type: 'author',
                    url: '/autor/francisco-jueguen-12/'
                }
            ];

            const result = transformAuthors(authorList);
            expect(result[0].additional_properties.original.image).toEqual(
                'https://www.lanacion.com.ar/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-authors%2Flanacionar%2F43ae64e8-22f7-497f-9fb8-6e918922e5ce.png?auth=f52540fae363f59649ac6fb60654aa4b43d338bd359a34f2ef80497ffb8f9b04&width=80&quality=70&smart=false'
            );
        });

        test('should handle empty author list', () => {
            const result = transformAuthors([]);
            expect(result).toHaveLength(0);
        });

        test('should return a empty array when the authorList is not defined', () => {
            expect(transformAuthors(undefined)).toEqual([]);
        });
    });

    describe('Tests transformElementsBasedOnType function', () => {
        const invalidArgunments = [null, undefined, '', 1];

        const configCallbacks = {
            text: ({ element }) => ({
                ...element,
                transformed: true,
                value: `${element.value} transformed`
            }),
            video: ({ element }) => ({
                ...element,
                transformed: true,
                type: 'videoJW'
            })
        };

        test('should transform elements based on type', () => {
            const arrayElements = [
                { type: 'text', value: 'This is a text' },
                {
                    type: 'video',
                    value: 'This is a video',
                    url: 'https://video.com.ar'
                },
                { type: 'header', value: 'This is a title' }
            ];

            const result = transformElementsBasedOnType({
                arrayElements,
                configCallbacks,
                searchPropertyOnElem: 'type',
                aditionalProps: { additional: 'property' }
            });

            expect(result).toHaveLength(3);
            expect(result).toEqual([
                {
                    type: 'text',
                    value: 'This is a text transformed',
                    transformed: true
                },
                {
                    type: 'videoJW',
                    value: 'This is a video',
                    url: 'https://video.com.ar',
                    transformed: true
                },
                { type: 'header', value: 'This is a title' }
            ]);
        });

        test('should return a empty array', () => {
            const result = transformElementsBasedOnType({});
            expect(result).toHaveLength(0);
        });

        test('should handle invalid array elements', () => {
            invalidArgunments.forEach(elements => {
                const result = transformElementsBasedOnType({
                    arrayElements: elements
                });
                expect(result).toHaveLength(0);
            });
        });

        test('should handle invalid config callbacks', () => {
            const arrayElements = [{ type: 'gallery', value: 'gallery list' }];

            invalidArgunments.forEach(callbacks => {
                const result = transformElementsBasedOnType({
                    arrayElements,
                    configCallbacks: callbacks
                });

                expect(result).toHaveLength(1);
                expect(result).toEqual(arrayElements);
            });
        });

        test('should handle elements without matching callback', () => {
            const arrayElements = [
                { type: 'header', value: 'This is a title' },
                { type: 'custom_embed', value: 'This is a power up' }
            ];

            const result = transformElementsBasedOnType({
                arrayElements,
                configCallbacks,
                searchPropertyOnElem: 'type'
            });

            expect(result).toHaveLength(2);
            expect(result).toEqual(arrayElements);
        });

        test('should handle errors during transformation', () => {
            const arrayElements = [
                { type: 'text', value: 'This is a text' },
                { type: 'header', value: 'This is a title' }
            ];
            const callbacks = {
                ...configCallbacks,
                header: () => {
                    throw new Error('Simulated error');
                }
            };

            const consoleErrorSpy = jest
                .spyOn(console, 'error')
                .mockImplementation();

            const result = transformElementsBasedOnType({
                arrayElements,
                configCallbacks: callbacks,
                searchPropertyOnElem: 'type'
            });

            expect(result).toHaveLength(1);
            expect(result).toEqual([
                {
                    transformed: true,
                    type: 'text',
                    value: 'This is a text transformed'
                }
            ]);

            expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
            consoleErrorSpy.mockRestore();
        });
    });

    describe('Test setRedirect function', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        const siteUrl = 'https://lanacion.com.ar';

        test('should throw Redirect exception for response type "redirect" with redirect_url', () => {
            const response = {
                type: 'redirect',
                redirect_url: 'https://example.com'
            };

            expect(() => setRedirect({ response, query: {}, siteUrl })).toThrow(
                Redirect
            );
        });

        test('should throw Redirect exception for forwardUrl with valid URL', () => {
            const response = {
                related_content: {
                    redirect: [{ redirect_url: 'https://example.com' }]
                }
            };
            const siteUrl = 'https://mysite.com';

            expect(() => setRedirect({ response, query: {}, siteUrl })).toThrow(
                Redirect
            );
        });

        test('should not throw Redirect for forwardUrl with invalid URL', () => {
            const response = {
                related_content: {
                    redirect: [{ redirect_url: 'invalid-url' }]
                }
            };

            expect(() =>
                setRedirect({ response, query: {}, siteUrl })
            ).not.toThrow();
        });

        test('should validate exclusive access when paywallEnabled is true and checkExclusiveAccess is present', () => {
            const response = {
                content_restrictions: { content_code: 'cerrada' },
                type: 'story'
            };
            const query = {
                paywallEnabled: 'true',
                checkExclusiveAccess: true,
                uri: '/uri-example/'
            };

            expect(() => setRedirect({ response, query, siteUrl })).toThrow(
                Redirect
            );
        });

        test('should not validate exclusive access when paywallEnabled is false', () => {
            const response = {
                content_restrictions: { content_code: 'cerrada' },
                type: 'story'
            };
            const query = {
                paywallEnabled: 'false',
                checkExclusiveAccess: true,
                uri: '/some-path'
            };

            expect(() =>
                setRedirect({ response, query, siteUrl })
            ).not.toThrow();
        });

        test('should not validate exclusive access when checkExclusiveAccess is false', () => {
            const response = {
                content_restrictions: { content_code: 'cerrada' },
                type: 'story'
            };
            const query = {
                paywallEnabled: 'true',
                uri: '/some-path',
                checkExclusiveAccess: false
            };

            expect(() =>
                setRedirect({ response, query, siteUrl })
            ).not.toThrow();
        });

        test('should call checkPaywall when isNotShowcase is true', () => {
            const response = {
                type: 'story',
                label: {
                    showcase: {
                        text: 'no'
                    }
                },
                content_restrictions: { content_code: 'cerrada' }
            };

            const query = {
                paywallEnabled: '1',
                meteringVariant: 'D',
                paywallUrl:
                    'https://suscripciones.lanacion.com.ar/suscripcion/E/1/1/?callback='
            };

            expect(() => setRedirect({ response, query, siteUrl })).toThrow(
                Redirect
            );
        });

        test('should not call checkPaywall when isNotShowcase is false', () => {
            const response = {
                type: 'story',
                label: {
                    showcase: {
                        text: 'si'
                    }
                },
                content_restrictions: { content_code: 'cerrada' }
            };

            expect(() =>
                setRedirect({ response, query: {}, siteUrl })
            ).not.toThrow();
        });
    });
});
