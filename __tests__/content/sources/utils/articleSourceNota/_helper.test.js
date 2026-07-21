import {
    getUrlQuery,
    transformPromoItems,
    filterSections,
    transformAuthors,
    transformElementsBasedOnType,
    setRedirect,
    handleRedirectMobile,
    isValidSectionIA,
    updateUrlIfMatch,
    getIncludedFields,
    checkIfExternalRedirect,
    transformSubtype,
    getImageConfig
} from '../../../../../content/sources/utils/articleSourceNota/_helper';
import Redirect from '../../../../../content/sources/utils/redirect';
import {
    addHttpsLinkInParagraphs,
    addHttpsInterstitialLink,
    replaceMalformedAnchorTags,
    formatElementText,
    removeErrosInterstitialLink,
    formatInterstitialLink,
    configCallbackContentElements,
    parseImageText,
    sanitizeString
} from '../../../../../content/sources/utils/articleSourceNota/_configs';

describe('Tests articleSourceNota - _helper', () => {
    describe('configCallbackContentElements text', () => {
        it('should normalize links and styles on text elements', () => {
            const textElement = {
                type: 'text',
                content:
                    'Texto con <a href="https://www.lanacion.com.ar/politica">link</a> y <b>bold</b>'
            };

            const result = configCallbackContentElements.text({
                element: textElement,
                withSponsoredLink: false,
                articlePath: '/politica/nota-prueba',
                baseOrigin: 'https://www.lanacion.com.ar'
            });

            const transformed = result.content;

            expect(transformed).toContain('class="com-link break-word"');
            expect(transformed).toContain('target="_self"');
            expect(transformed).toContain('<strong>bold</strong>');
        });
    });

    describe('configCallbackContentElements list', () => {
        it('should transform text items applying link and style normalization', () => {
            const listElement = {
                type: 'list',
                items: [
                    {
                        type: 'text',
                        content:
                            'Item con <a href="https://www.lanacion.com.ar">link</a> y <b>negrita</b>'
                    }
                ]
            };

            const result = configCallbackContentElements.list({
                element: listElement,
                withSponsoredLink: false,
                articlePath: '/nota-prueba',
                baseOrigin: 'https://www.lanacion.com.ar'
            });

            const transformedContent = result.items[0].content;

            expect(transformedContent).toContain('class="com-link break-word"');
            expect(transformedContent).toContain('target="_self"');
            expect(transformedContent).toContain('<strong>negrita</strong>');
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

        it('should return query with id', () => {
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

        it('should return query with website_url when url is provided', () => {
            expect(getUrlQuery({ ...mockKey, id: undefined })).toStrictEqual(
                '/content/v4/stories/?website=foodit&website_url=/receta/pollito-con-papa/'
            );
        });

        it('should return query with published', () => {
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

        it('should return query with included fields', () => {
            expect(
                getUrlQuery({
                    ...mockKey,
                    sourceInclude: 'field1,field2'
                })
            ).toStrictEqual(
                '/content/v4/stories/?website=foodit&included_fields=field1,field2&_id=AJING3OCZRHWFJGE5I4HFBFMPY'
            );
        });

        it('should handle and clean URL for specific format', () => {
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

        it('should throw an error when neither url nor id is provided', () => {
            expect(() => getUrlQuery({})).toThrowError(
                'Debe definir url o id para obtener la nota'
            );
        });

        it('should throw an error when the props is not defined or null', () => {
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
                        title: 'Ariel en su salsa: Waffles de chocolate con bananas foster'
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

        it('should transform promo items using callbacks', async () => {
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

        it('should handle empty promoItemObject', async () => {
            const result = await transformPromoItems({
                cachedCall,
                arcSite: 'foodit',
                configCallbacks: mockConfigCallbacks
            });

            expect(result).toEqual({});
        });

        it('should handle callbacks that return undefined', async () => {
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
        it('should replace malformed anchor tags with new value', () => {
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

        it('should replace multiple malformed anchor tags with new value', () => {
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

        it('should not replace well-formed anchor tags', () => {
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

        it('should not replace anchor tags with hyphenated domains', () => {
            const textTypeElement = {
                content:
                    '<a href="https://masterassist-trip.axa-assistance.com.ar/">adolescencia</a>'
            };
            const newValue = 'Replacement';
            const result = replaceMalformedAnchorTags({
                textTypeElement,
                newValue
            });

            expect(result.content).toStrictEqual(
                '<a href="https://masterassist-trip.axa-assistance.com.ar/">adolescencia</a>'
            );
        });

        it('should not replace anchor tags with amp entities and hyphenated domains', () => {
            const textTypeElement = {
                content:
                    '<a href="https://masterassist-trip.axa-assistance.com.ar/?utm_source=LaNacion&amp;utm_medium=referral">adolescencia</a>'
            };
            const newValue = 'Replacement';
            const result = replaceMalformedAnchorTags({
                textTypeElement,
                newValue
            });

            expect(result.content).toStrictEqual(
                '<a href="https://masterassist-trip.axa-assistance.com.ar/?utm_source=LaNacion&amp;utm_medium=referral">adolescencia</a>'
            );
        });

        it('should not replace anchor tags with amp entities and simple domains', () => {
            const textTypeElement = {
                content:
                    '<a href="https://example.com/?utm_source=LaNacion&amp;utm_medium=referral">primeros</a>'
            };
            const newValue = 'Replacement';
            const result = replaceMalformedAnchorTags({
                textTypeElement,
                newValue
            });

            expect(result.content).toStrictEqual(
                '<a href="https://example.com/?utm_source=LaNacion&amp;utm_medium=referral">primeros</a>'
            );
        });

        it('should not replace when no malformed anchor tags present', () => {
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

        it('should handle empty content', () => {
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

        it('should handle empty textTypeElement', () => {
            const result = replaceMalformedAnchorTags({
                textTypeElement: null,
                newValue: 'Replacement'
            });
            expect(result).toBeNull();
        });

        it('should handle empty newValue', () => {
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
        it('should add "https://" in paragraphs link', () => {
            const elementText = {
                content:
                    'This is a <p>paragraph</p> with a <a href="//lanacion.com.ar/">link</a>.'
            };
            const result = formatElementText(elementText);
            expect(result.content).toStrictEqual(
                'This is a <p>paragraph</p> with a <a href="https://lanacion.com.ar/">link</a>.'
            );
        });

        it('should add forward slash in paragraphs links', () => {
            const elementText = {
                content:
                    'This is a <p>paragraph</p> with a <a href="https://lanacion.com.ar">link</a>.'
            };
            const result = formatElementText(elementText);
            expect(result.content).toStrictEqual(
                'This is a <p>paragraph</p> with a <a href="https://lanacion.com.ar/">link</a>.'
            );
        });

        it('should replace malformed anchor tags with empty value', () => {
            const elementText = {
                content:
                    'This is a text with malformed link: <a href="https://example\\">Link 1</a>'
            };
            const result = formatElementText(elementText);
            expect(result.content).toStrictEqual(
                'This is a text with malformed link: Link 1'
            );
        });

        it('should handle empty elementText', () => {
            const result = formatElementText();
            expect(result).toEqual({
                content: ''
            });
        });

        it('should handle empty content in elementText', () => {
            const elementText = {
                content: ''
            };
            const result = formatElementText(elementText);
            expect(result.content).toStrictEqual('');
        });

        it('should handle empty content when elementText is null', () => {
            const result = formatElementText(null);
            expect(result.content).toStrictEqual('');
        });
    });

    describe('Tests removeErrosInterstitialLink function', () => {
        it('should return empty string for invalid URL format', () => {
            const invalidUrls = ['invalid-url', 'ftp://example.com'];

            invalidUrls.forEach(url => {
                const result = removeErrosInterstitialLink(url);
                console.log(result);
                expect(result).toStrictEqual('');
            });
        });

        it('should return original URL for valid URL format', () => {
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

        it('should handle empty string as input', () => {
            const result = removeErrosInterstitialLink('');
            expect(result).toStrictEqual('');
        });

        it('should handle non-string input', () => {
            const nonStringInputs = [null, undefined, 123, { key: 'value' }];

            nonStringInputs.forEach(input => {
                const result = removeErrosInterstitialLink(input);
                expect(result).toStrictEqual('');
            });
        });
    });

    describe('Tests formatInterstitialLink function', () => {
        it('should format interstitial link with forward slash and https', () => {
            expect(formatInterstitialLink('//lanacion.com.ar')).toEqual(
                'https://lanacion.com.ar/'
            );
        });

        it('should return null when the url is a empty string', () => {
            expect(formatInterstitialLink('')).toStrictEqual('');
        });

        it('should return null when the url is invalid', () => {
            expect(formatInterstitialLink('invalid-url')).toStrictEqual('');
        });

        it('should return null when non-string url', () => {
            expect(formatInterstitialLink(123)).toStrictEqual('');
        });

        it('should return null when the url is not defined or is null', () => {
            expect(formatInterstitialLink(null)).toStrictEqual('');
            expect(formatInterstitialLink(undefined)).toStrictEqual('');
        });
    });

    describe('Tests filterSections function', () => {
        it('should filter sections from valid response', () => {
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

        it('should return a empty array when the response is not defined', () => {
            const result = filterSections();
            expect(result.sections).toHaveLength(0);
        });

        it('should return a empty array when the response is a empty object', () => {
            const result = filterSections({});
            expect(result.sections).toHaveLength(0);
        });

        it('should return a empty array when the taxonomy is a empty object', () => {
            const responseWithoutSections = {
                taxonomy: {}
            };
            const result = filterSections(responseWithoutSections);
            expect(result.sections).toHaveLength(0);
        });

        it('should handle sections property with non-object items', () => {
            const responseWithNonObjectItems = {
                taxonomy: {
                    sections: [null, 'not-an-object', 123]
                }
            };
            const result = filterSections(responseWithNonObjectItems);
            expect(result.sections).toHaveLength(0);
        });

        it('should handle sections property with items missing type property', () => {
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

        it('should handle sections property with items of type other than "section"', () => {
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
        it('should transform author list with resized image URL', () => {
            const authorList = [
                {
                    _id: 'francisco-jueguen-12',
                    additional_properties: {
                        original: {
                            byline: 'Francisco Jueguen',
                            image: 'https://s3.amazonaws.com/2Farc-authors-22f7-497f-9fb8-6e918922e5ce.png',
                            role: 'LA NACION'
                        }
                    },
                    image: {
                        auth: {
                            1: 'f52540fae363f59649ac6fb60654aa4b43d338bd359a34f2ef80497ffb8f9b04'
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
                        url: 'https://www.lanacion.com.ar/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-authors%2Flanacionar%2F43ae64e8-22f7-497f-9fb8-6e918922e5ce.png?auth=f52540fae363f59649ac6fb60654aa4b43d338bd359a34f2ef80497ffb8f9b04&width=768&quality=70&smart=false'
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

        it('should handle empty author list', () => {
            const result = transformAuthors([]);
            expect(result).toHaveLength(0);
        });

        it('should return a empty array when the authorList is not defined', () => {
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

        it('should transform elements based on type', () => {
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

        it('should return a empty array', () => {
            const result = transformElementsBasedOnType({});
            expect(result).toHaveLength(0);
        });

        it('should handle invalid array elements', () => {
            invalidArgunments.forEach(elements => {
                const result = transformElementsBasedOnType({
                    arrayElements: elements
                });
                expect(result).toHaveLength(0);
            });
        });

        it('should handle invalid config callbacks', () => {
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

        it('should handle elements without matching callback', () => {
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

        it('should handle errors during transformation', () => {
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

        it('should return the same redirect url as response', () => {
            const response = {
                type: 'redirect',
                redirect_url: 'https://example.com'
            };

            expect(
                setRedirect({
                    response,
                    query: { uri: '/api/mobile/v1/notas/byUrl' },
                    siteUrl
                })
            ).toBe('https://example.com');
        });
        it('should return empty object when no redirect is present in response of content api', () => {
            const response = {
                redirect_url: 'https://example.com'
            };

            expect(
                setRedirect({ response, query: { uri: '' }, siteUrl })
            ).toStrictEqual({});
        });
        it('should throw Redirect exception for response type "redirect" with redirect_url', () => {
            const response = {
                type: 'redirect',
                redirect_url: 'https://example.com'
            };

            expect(() => setRedirect({ response, query: {}, siteUrl })).toThrow(
                Redirect
            );
        });
        it('should throw Redirect exception when redirectMobile', () => {
            const response = {
                type: 'redirect',
                redirect_url: '/autos/clasicos'
            };
            const query = {
                uri: '/api/mobile/v1/clima/cordoba',
                url: '/clima/cordoba'
            };

            expect(() => setRedirect({ response, query, siteUrl })).toThrow(
                Redirect
            );
            try {
                handleRedirectMobile('redirect', response.redirect_url, query);
            } catch (error) {
                expect(error.location).toBe('/api/mobile/v1/autos/clasicos');
                expect(error.statusCode).toBe(301);
            }
        });
        it('should throw Redirect exception for forwardUrl with valid URL', () => {
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

        it('should not throw Redirect for forwardUrl with invalid URL', () => {
            const response = {
                related_content: {
                    redirect: [{ redirect_url: 'invalid-url' }]
                }
            };

            expect(() =>
                setRedirect({ response, query: {}, siteUrl })
            ).not.toThrow();
        });

        it('should validate exclusive access when paywallEnabled is true and checkExclusiveAccess is present', () => {
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

        it('should not validate exclusive access when paywallEnabled is false', () => {
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

        it('should not validate exclusive access when checkExclusiveAccess is false', () => {
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

        it('should call checkPaywall when isNotShowcase is true', () => {
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
                    'https://suscripciones.lanacion.com.ar/ln/cerrado?callback='
            };

            expect(() => setRedirect({ response, query, siteUrl })).toThrow(
                Redirect
            );
        });

        it('should not call checkPaywall when isNotShowcase is false', () => {
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

    describe('Test hanldeMobileRedirect', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should throw Redirect with correct URL and status code for valid mobile path', () => {
            const query = {
                uri: '/api/mobile/v1/clima/cordoba',
                url: '/clima/cordoba'
            };

            expect(() => {
                handleRedirectMobile('redirect', '/new/path', query);
            }).toThrow(Redirect);

            try {
                handleRedirectMobile('redirect', '/new/path', query);
            } catch (error) {
                expect(error.location).toBe('/api/mobile/v1/new/path');
                expect(error.statusCode).toBe(301);
            }
        });

        it('should extract mobile prefix and combine with redirect URL correctly', () => {
            const query = {
                uri: '/api/mobile/v2/clima/cordoba',
                url: '/clima/cordoba'
            };

            try {
                handleRedirectMobile('redirect', '/clima/cordoba', query);
            } catch (error) {
                expect(error.location).toBe('/api/mobile/v2/clima/cordoba');
            }
        });

        it('should handle valid query parameters correctly', () => {
            const query = {
                uri: '/api/mobile/v2/clima',
                url: '/clima'
            };

            try {
                handleRedirectMobile('redirect', '/clima', query);
            } catch (error) {
                expect(error.location).toBe('/api/mobile/v2/clima');
            }
        });

        it('should return when redirectUrl is empty or missing', () => {
            const query = {
                uri: '/api/mobile/v1/clima',
                url: '/products'
            };

            expect(() => {
                handleRedirectMobile('redirect', '', query);
            }).not.toThrow();

            expect(() => {
                handleRedirectMobile('redirect', null, query);
            }).not.toThrow();
        });

        it('should return when url in query is empty or missing', () => {
            const query = {
                uri: '/api/mobile/v1/clima',
                url: ''
            };

            expect(() => {
                handleRedirectMobile('redirect', '/new-path', query);
            }).not.toThrow();

            expect(() => {
                handleRedirectMobile('redirect', '/new-path', {
                    uri: '/api/mobile/v1/clima'
                });
            }).not.toThrow();
        });

        it('should return when URI does not start with /api/mobile', () => {
            const query = {
                uri: '/api/web/products',
                url: '/products'
            };

            expect(() => {
                handleRedirectMobile('redirect', '/new-path', query);
            }).not.toThrow();
        });
    });
    describe('Test checkIfExternalRedirect', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should check if story is external', () => {
            const result = checkIfExternalRedirect(
                'redirect',
                'http://google.com',
                {
                    uri: '/api/mobile/v1/notas/byUrl/'
                }
            );
            expect(result).not.toBeNull();
            expect(result).toBeTruthy();
            expect(result).toBe(true);
        });
        it('should check if story is external even redirect is https', () => {
            const result = checkIfExternalRedirect(
                'redirect',
                'https://google.com',
                {
                    uri: '/api/mobile/v1/notas/byUrl/'
                }
            );
            expect(result).not.toBeNull();
            expect(result).toBeTruthy();
            expect(result).toBe(true);
        });
        it('should check if story is not external even redirect is https', () => {
            const result = checkIfExternalRedirect(
                'redirect',
                '/internal/url/nacion',
                {
                    uri: '/api/mobile/v1/notas/byUrl/'
                }
            );
            expect(result).not.toBeNull();
            expect(result).toBeFalsy();
            expect(result).toBe(false);
        });
    });
    describe('isValidSectionIA', () => {
        it('should return false if sections is not an array', () => {
            expect(isValidSectionIA(null)).toBe(false);
            expect(isValidSectionIA(undefined)).toBe(false);
            expect(isValidSectionIA({})).toBe(false);
        });

        it('should return false if sections is an empty array', () => {
            expect(isValidSectionIA([])).toBe(false);
        });

        it('should return false when the section is politica', () => {
            const sections = [{ path: '/politica' }];
            expect(isValidSectionIA(sections)).toBe(false);
        });

        it('should return false when the section is opinion', () => {
            const sections = [{ path: '/opinion' }];
            expect(isValidSectionIA(sections)).toBe(false);
        });

        it('should return false when the section is recetas', () => {
            const sections = [{ path: '/recetas' }];
            expect(isValidSectionIA(sections)).toBe(false);
        });

        it('should return true if the section path exactly matches a valid section', () => {
            const sections = [{ path: '/autos' }];
            expect(isValidSectionIA(sections)).toBe(true);
        });

        it.each([
            { path: '/autos/test-drive', expected: true },
            { path: '/salud/vida_sana', expected: true },
            { path: '/propiedades/casas-y-departamentos', expected: true },
            { path: '/economia/campo/cosecha-de-girasoles', expected: true }
        ])(
            'should return $expected if the section path is $path',
            ({ path, expected }) => {
                const sections = [{ path }];
                expect(isValidSectionIA(sections)).toBe(expected);
            }
        );

        it('should handle sections with path as an empty string', () => {
            const sections = [{ path: '' }];
            expect(isValidSectionIA(sections)).toBe(false);
        });
    });

    describe('updateUrlIfMatch', () => {
        it('should remove "tests-bannerdisabled/" if it matches the URL', () => {
            const url =
                '/sociedad/el-holocausto-olvidado-perpetrado-por-los-nazis-durante-la-segunda-guerra-mundial-nid04052023/tests-bannerdisabled/';
            expect(updateUrlIfMatch(url)).toBe(
                '/sociedad/el-holocausto-olvidado-perpetrado-por-los-nazis-durante-la-segunda-guerra-mundial-nid04052023/'
            );
        });

        it('should not modify the URL if it does not match the pattern', () => {
            const url =
                '/sociedad/el-holocausto-olvidado-perpetrado-por-los-nazis-durante-la-segunda-guerra-mundial-nid04052023/';
            expect(updateUrlIfMatch(url)).toBe(url);
        });
    });
    describe('getIncludedFields function', () => {
        it('should return the common fields when isLiveblog is false', () => {
            const isLiveblog = false;
            const expectedFields = [
                'taxonomy',
                'distributor.name',
                'related_content.basic',
                '_id',
                'last_updated_date',
                'headlines',
                'subheadlines',
                'description',
                'label',
                'promo_items',
                'canonical_website',
                'credits',
                'subtype',
                'first_publish_date',
                'publish_date',
                'website',
                'website_url',
                'content_restrictions',
                'owner',
                'source',
                'canonical_url'
            ];

            const result = getIncludedFields(isLiveblog);
            expect(result).toEqual(expectedFields.join(','));
        });

        it('should return the common fields plus content_elements when isLiveblog is true', () => {
            const isLiveblog = true;
            const expectedFields = [
                'taxonomy',
                'distributor.name',
                'related_content.basic',
                '_id',
                'last_updated_date',
                'headlines',
                'subheadlines',
                'description',
                'label',
                'promo_items',
                'canonical_website',
                'credits',
                'subtype',
                'first_publish_date',
                'publish_date',
                'website',
                'website_url',
                'content_restrictions',
                'owner',
                'source',
                'canonical_url',
                'content_elements'
            ];

            const result = getIncludedFields(isLiveblog);
            expect(result).toEqual(expectedFields.join(','));
        });
    });

    describe('Tests - function - transformSubtype', () => {
        const mockResponse = {
            _id: 'ID-DE-NOTA',
            promo_items: {},
            subtype: 'Noticia'
        };

        it("It should return a copy of the response it receives, with the subtype value overwritten by '1'.", () => {
            expect(transformSubtype(mockResponse)).toStrictEqual({
                ...mockResponse,
                subtype: '1'
            });
        });

        it("It should return a copy of the response it receives, with the subtype value overwritten by '2'.", () => {
            expect(
                transformSubtype({ ...mockResponse, subtype: 'Infografia' })
            ).toStrictEqual({
                ...mockResponse,
                subtype: '2'
            });
        });

        it("It should return a copy of the response it receives, with the subtype value overwritten by '5'.", () => {
            expect(
                transformSubtype({ ...mockResponse, subtype: 'Video' })
            ).toStrictEqual({
                ...mockResponse,
                subtype: '5'
            });
        });

        it("It should return a copy of the response it receives, with the subtype value overwritten by '6'.", () => {
            expect(
                transformSubtype({ ...mockResponse, subtype: 'LiveBlog' })
            ).toStrictEqual({
                ...mockResponse,
                subtype: '6'
            });
        });

        it("It should return a copy of the response it receives, with the subtype value overwritten by '7'.", () => {
            expect(
                transformSubtype({ ...mockResponse, subtype: 'Receta' })
            ).toStrictEqual({
                ...mockResponse,
                subtype: '7'
            });
        });

        it("It should return a copy of the response it receives, with the subtype value overwritten by '4'.", () => {
            expect(
                transformSubtype({ ...mockResponse, subtype: 'Storytelling' })
            ).toStrictEqual({
                ...mockResponse,
                subtype: '4'
            });
        });

        it("It should return a copy of the response it receives, with the subtype value overwritten by '8'.", () => {
            expect(
                transformSubtype({ ...mockResponse, subtype: 'FotoAl100' })
            ).toStrictEqual({
                ...mockResponse,
                subtype: '8'
            });
        });

        it("It should return a copy of the response it receives, with the subtype value overwritten by '9'.", () => {
            expect(
                transformSubtype({ ...mockResponse, subtype: 'HtmlLibre' })
            ).toStrictEqual({
                ...mockResponse,
                subtype: '9'
            });
        });

        it("It should return a copy of the response it receives, with the subtype value overwritten by '10'.", () => {
            expect(
                transformSubtype({ ...mockResponse, subtype: 'Agencia' })
            ).toStrictEqual({
                ...mockResponse,
                subtype: '10'
            });
        });

        it('It should return the response received by parameter, if it is null', () => {
            expect(transformSubtype(null)).toBeNull();
        });
    });

    describe('Tests configCallbackCustomEmbed', () => {
        let configCallbackCustomEmbed;
        let buildGalleryEmbedDataMock;

        beforeEach(() => {
            jest.resetModules();
            buildGalleryEmbedDataMock = jest.fn();
            jest.doMock(
                '../../../../../content/sources/utils/articleSourceNota/cachedCalls/buildGalleryEmbedData',
                () => ({
                    __esModule: true,
                    default: buildGalleryEmbedDataMock
                })
            );
            const configs = require('../../../../../content/sources/utils/articleSourceNota/_configs');
            configCallbackCustomEmbed = configs.configCallbackCustomEmbed;
        });

        afterEach(() => {
            jest.resetModules();
        });

        it('should return empty object when isShowGalleryEmbed is false', async () => {
            const result = await configCallbackCustomEmbed['gallery-embed']({
                cachedCall: jest.fn(),
                element: { subtype: 'gallery-embed' },
                arcSite: 'la-nacion-ar',
                isShowGalleryEmbed: false
            });

            expect(result).toEqual({});
            expect(buildGalleryEmbedDataMock).not.toHaveBeenCalled();
        });

        it('should return empty object when isShowGalleryEmbed is undefined', async () => {
            const result = await configCallbackCustomEmbed['gallery-embed']({
                cachedCall: jest.fn(),
                element: { subtype: 'gallery-embed' },
                arcSite: 'la-nacion-ar'
            });

            expect(result).toEqual({});
            expect(buildGalleryEmbedDataMock).not.toHaveBeenCalled();
        });

        it('should call buildGalleryEmbedData when isShowGalleryEmbed is true', async () => {
            const mockElement = { subtype: 'gallery-embed' };
            const mockCachedCall = jest.fn();
            const mockArcSite = 'la-nacion-ar';
            const expectedResult = {
                ...mockElement,
                embed: { config: { galleryImages: [] } }
            };

            buildGalleryEmbedDataMock.mockResolvedValue(expectedResult);

            const result = await configCallbackCustomEmbed['gallery-embed']({
                cachedCall: mockCachedCall,
                element: mockElement,
                arcSite: mockArcSite,
                isShowGalleryEmbed: true
            });

            expect(buildGalleryEmbedDataMock).toHaveBeenCalledTimes(1);
            expect(buildGalleryEmbedDataMock).toHaveBeenCalledWith({
                element: mockElement,
                cachedCall: mockCachedCall,
                gallerySource: expect.any(Object),
                arcSite: mockArcSite
            });
            expect(result).toEqual(expectedResult);
        });

        it('should return empty object when called with empty parameters', async () => {
            const result = await configCallbackCustomEmbed['gallery-embed']();

            expect(result).toEqual({});
            expect(buildGalleryEmbedDataMock).not.toHaveBeenCalled();
        });
    });

    describe('Tests parseImageText', () => {
        it('should return a sanitized image object for a complete image input', () => {
            const image = {
                _id: '123',
                caption: 'Valid caption',
                subtitle: 'Valid subtitle',
                additional_properties: {
                    iptc_source: 'Valid source',
                    other_prop: 'remains'
                },
                credits: {
                    affiliation: [{ name: 'Affiliation Name', type: 'author' }],
                    by: [
                        {
                            name: 'By Name',
                            type: 'author',
                            byline: 'Byline txt'
                        }
                    ]
                }
            };
            const expected = {
                _id: '123',
                caption: 'Valid caption',
                subtitle: 'Valid subtitle',
                additional_properties: {
                    iptc_source: 'Valid source',
                    other_prop: 'remains'
                },
                credits: {
                    affiliation: [{ name: 'Affiliation Name', type: 'author' }],
                    by: [
                        {
                            name: 'By Name',
                            type: 'author',
                            byline: 'Byline txt'
                        }
                    ]
                }
            };
            expect(parseImageText(image)).toEqual(expected);
        });
        it('should sanitize non-ASCII characters from text fields', () => {
            const image = {
                caption: 'Caption with áéí',
                subtitle: 'Subtitle with ñ',
                additional_properties: {
                    iptc_source: 'Source with \t'
                },
                credits: {
                    affiliation: [{ name: 'Name with ö', type: 'Type with ü' }],
                    by: [
                        {
                            name: 'By with ç',
                            type: 'Type with ß',
                            byline: 'Byline with \r'
                        }
                    ]
                }
            };
            const expected = {
                caption: 'Caption with áéí',
                subtitle: 'Subtitle with ñ',
                additional_properties: {
                    iptc_source: 'Source with \t'
                },
                credits: {
                    affiliation: [{ name: 'Name with ö', type: 'Type with ü' }],
                    by: [
                        {
                            name: 'By with ç',
                            type: 'Type with ß',
                            byline: 'Byline with \r'
                        }
                    ]
                }
            };
            expect(parseImageText(image)).toEqual(expected);
        });
        it('should handle string missing values natively or gracefully', () => {
            const image = {
                caption: undefined,
                subtitle: undefined,
                additional_properties: { iptc_source: undefined },
                credits: {
                    affiliation: [{ name: undefined, type: undefined }],
                    by: [
                        {
                            name: undefined,
                            type: undefined,
                            byline: undefined
                        }
                    ]
                }
            };
            const expected = {
                caption: '',
                subtitle: '',
                additional_properties: {
                    iptc_source: ''
                },
                credits: {
                    affiliation: [{ name: '', type: '' }],
                    by: [{ name: '', type: '', byline: '' }]
                }
            };
            expect(parseImageText(image)).toEqual(expected);
        });
        it('should preserve other properties inside the image object', () => {
            const image = {
                url: 'http://example.com/image.jpg',
                type: 'image',
                width: 800,
                height: 600
            };
            const result = parseImageText(image);
            expect(result.url).toBe('http://example.com/image.jpg');
            expect(result.type).toBe('image');
            expect(result.width).toBe(800);
            expect(result.height).toBe(600);
        });
        it('should handle missing credits or additional_properties completely', () => {
            const image = {
                _id: '123'
            };
            const expected = {
                _id: '123',
                caption: '',
                subtitle: '',
                additional_properties: {
                    iptc_source: ''
                },
                credits: {
                    affiliation: [],
                    by: []
                }
            };
            expect(parseImageText(image)).toEqual(expected);
        });
        it('should handle empty object', () => {
            const image = {};
            const expected = {
                caption: '',
                subtitle: '',
                additional_properties: {
                    iptc_source: ''
                },
                credits: {
                    affiliation: [],
                    by: []
                }
            };
            expect(parseImageText(image)).toEqual(expected);
        });
    });

    describe('Tests getImageConfig - presetsPromoItemStorytelling', () => {
        const diagramPreset = { sizes: [{ width: 560, height: 375 }] };
        const fallbackPreset = { sizes: [{ width: 600, height: 400 }] };

        const baseSiteProperties = {
            imageConfig: {
                resize: {
                    'image-50-right-title-left': {
                        promo_items: fallbackPreset
                    },
                    'image-diagram-custom': { promo_items: diagramPreset },
                    l: {
                        promo_items: { sizes: [] },
                        content_elements: { sizes: [] },
                        credits: {}
                    }
                }
            }
        };

        it('should use the diagram preset when custom_storytelling_opening has a known diagram key', () => {
            const response = {
                subtype: '4',
                promo_items: {
                    custom_storytelling_opening: {
                        embed: {
                            config: { diagram: 'image-diagram-custom' }
                        },
                        subtype: 'custom-storytelling-opening'
                    }
                }
            };

            const { presets } = getImageConfig({
                response,
                siteProperties: baseSiteProperties,
                imageConfig: null
            });

            expect(presets.promoItems).toEqual(diagramPreset);
        });

        it('should fall back to image-50-right-title-left preset when custom_storytelling_opening diagram key is not in imageConfig', () => {
            const response = {
                subtype: '4',
                promo_items: {
                    custom_storytelling_opening: {
                        embed: {
                            config: { diagram: 'image-100-title-below' }
                        },
                        subtype: 'custom-storytelling-opening'
                    }
                }
            };

            const { presets } = getImageConfig({
                response,
                siteProperties: baseSiteProperties,
                imageConfig: null
            });

            expect(presets.promoItems).toEqual(fallbackPreset);
        });

        it('should fall back to image-50-right-title-left preset when custom_storytelling_opening is absent', () => {
            const response = {
                subtype: '4',
                promo_items: {}
            };

            const { presets } = getImageConfig({
                response,
                siteProperties: baseSiteProperties,
                imageConfig: null
            });

            expect(presets.promoItems).toEqual(fallbackPreset);
        });
    });

    describe('Tests sanitizeString', () => {
        it('should keep printable ASCII characters intact', () => {
            const input =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 € !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~á, é, í, ó, ú, ñ, ç,¿, ¡ y ü';
            expect(sanitizeString(input)).toBe(input);
        });
        it('should not delete characters, tabs, and new lines.', () => {
            const input = 'Hello\tWorld\n\r!';
            expect(sanitizeString(input)).toBe(`Hello\tWorld\n\r!`);
        });
        it('should remove nullish ASCII characters', () => {
            const input = 'AFP\u0000';
            expect(sanitizeString(input)).toBe('AFP');
        });
        it('should retain accents and symbols', () => {
            const input = 'Café ñandú pingüino €123 &&';
            expect(sanitizeString(input)).toBe(input);
        });
        it('should handle undefined gracefully and return an empty string', () => {
            expect(sanitizeString(undefined)).toBe('');
        });
        it('should handle null gracefully and return an null', () => {
            expect(sanitizeString(null)).toBe(null);
        });
        it('should handle empty string correctly', () => {
            expect(sanitizeString('')).toBe('');
        });
        it('should throw an error for non-string, non-nullish inputs like numbers or objects', () => {
            expect(sanitizeString(123)).toBe(123);
            expect(sanitizeString(true)).toBeTruthy();
        });
    });
});
