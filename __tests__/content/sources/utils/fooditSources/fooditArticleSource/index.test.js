import {
    getImageConfig,
    getArticleSubtype,
    transform
} from '../../../../../../content/sources/utils/fooditSources/fooditArticleSource';
import {
    STORYTELLING,
    RECETA,
    RECETA_CERRADA
} from '../../../../../../components/private/common/utils/subtypes/subtypeHelper';
import getProperties from 'fusion:properties';
import {
    transformElementText,
    replaceClassForMark,
    transformLinks,
    addAttribute,
    configCallbackContentElements,
    configPromoItems
} from '../../../../../../content/sources/utils/fooditSources/fooditArticleSource/_configs';
import {
    setOtherChar,
    setBoldText,
    setItalicText,
    deleteTagsForTitle
} from '../../../../../../content/sources/utils/common/textTransformHelpers';
import {
    filterSections,
    transformAuthors,
    transformElementsBasedOnType,
    transformPromoItems
} from '../../../../../../content/sources/utils/articleSourceNota/_helper';
import validateSponsoredLink from '../../../../../../content/sources/utils/validateSponsoredLink';

const mockResults = {
    imageConfig: {
        resize: {
            default: ['configSizesDefault'],
            recipeDay: {
                promo_items: {
                    sizes: ['imageConfigRecipeDay']
                },
                credits: { sizes: ['fichaNotaCredits'] }
            },
            fichaNotaAl100: {
                promo_items: { sizes: ['fichaNotaPromoItemsSizes'] },
                content_elements: { sizes: ['fichaNotaContentElementsSizes'] },
                credits: { sizes: ['fichaNotaCredits'] }
            },
            fichaReceta: {
                promo_items: { sizes: ['fichaRecetaPromoItemsSizes'] },
                content_elements: {
                    sizes: ['fichaRecetaContentElementsSizes']
                },
                credits: { sizes: ['fichaNotaCredits'] }
            }
        }
    }
};

jest.mock('fusion:properties', () => () => mockResults);

jest.mock(
    '../../../../../../content/sources/utils/articleSourceNota/_helper',
    () => ({
        transformElementsBasedOnType: jest.fn(),
        transformPromoItems: jest.fn(),
        transformAuthors: jest.fn(),
        filterSections: jest.fn()
    })
);

jest.mock('../../../../../../content/sources/utils/validateSponsoredLink', () =>
    jest.fn()
);

describe('Tests helpers fooditArticleSource', () => {
    describe('Test function getImageConfig', () => {
        test('should return custom image config if specified in query', () => {
            const query = { imageConfig: 'recipeDay' };
            expect(getImageConfig({}, query)).toEqual({
                promoItems: {
                    sizes: ['imageConfigRecipeDay']
                }
            });
        });

        test('should return default image config if custom image config is not specified', () => {
            expect(getImageConfig({}, {})).toEqual({
                promoItems: ['configSizesDefault'],
                contentElements: ['configSizesDefault'],
                credits: ['configSizesDefault']
            });
        });

        test('should return image config for STORYTELLING subtype', () => {
            const response = { subtype: '4' };

            expect(getImageConfig(response, {})).toEqual({
                promoItems: { sizes: ['fichaNotaPromoItemsSizes'] },
                contentElements: { sizes: ['fichaNotaContentElementsSizes'] },
                credits: { sizes: ['fichaNotaCredits'] },
                presetsDefault: ['configSizesDefault']
            });
        });

        test('should return image config for RECETA subtype', () => {
            const response = { subtype: '7' };

            expect(getImageConfig(response, {})).toEqual({
                promoItems: { sizes: ['fichaRecetaPromoItemsSizes'] },
                contentElements: { sizes: ['fichaRecetaContentElementsSizes'] },
                credits: { sizes: ['fichaNotaCredits'] },
                presetsDefault: ['configSizesDefault']
            });
        });

        test('should return default image config if subtype is not recognized', () => {
            const response = { subtype: null };
            const result = getImageConfig(response, {});
            expect(result).toEqual({
                promoItems: ['configSizesDefault'],
                contentElements: ['configSizesDefault'],
                credits: ['configSizesDefault']
            });
        });
    });

    describe('Tests function deleteTagsForTitle', () => {
        test('should remove <em> tags', () => {
            const text = '<em>Emphasized text</em>';
            expect(deleteTagsForTitle(text)).toBe('Emphasized text');
        });

        test('should remove <strong> tags', () => {
            const text = '<strong>Strong text</strong>';
            expect(deleteTagsForTitle(text)).toBe('Strong text');
        });

        test('should remove both <em> and <strong> tags', () => {
            const text =
                '<em>Emphasized text</em> with <strong>strong text</strong>';
            expect(deleteTagsForTitle(text)).toBe(
                'Emphasized text with strong text'
            );
        });

        test('should not modify text without <em> or <strong> tags', () => {
            const text = 'Plain text without tags';
            expect(deleteTagsForTitle(text)).toBe(text);
        });

        test('should handle multiple occurrences of tags in the text', () => {
            const text =
                '<em>Emphasized</em> and <strong>strong</strong> text with <em>more</em> tags.';
            expect(deleteTagsForTitle(text)).toBe(
                'Emphasized and strong text with more tags.'
            );
        });

        test('should handle empty string input', () => {
            const text = '';
            expect(deleteTagsForTitle(text)).toBe('');
        });

        test('should handle null input', () => {
            expect(deleteTagsForTitle(null)).toBe('');
        });
    });

    describe('Tests function addAttribute', () => {
        const attributes = [{ property: 'class', value: 'pollito' }];

        test('should add attribute to the text', () => {
            expect(
                addAttribute({
                    attributes,
                    text: '<div>Hello World</div>'
                })
            ).toBe('<div class="pollito">Hello World</div>');
        });

        test('should add attribute with spaces around existing attributes', () => {
            expect(
                addAttribute({
                    attributes,
                    text: '<div id="container">Content</div>'
                })
            ).toBe('<div id="container" class="pollito">Content</div>');
        });

        test('should handle multiple spaces in the text', () => {
            expect(
                addAttribute({
                    attributes,
                    text: '<p>   Some   Text   </p>'
                })
            ).toBe('<p class="pollito">   Some   Text   </p>');
        });

        test('should handle empty text', () => {
            expect(addAttribute({ attributes, text: '' })).toBe('');
        });

        test('should return the value of text as received, if the text is null', () => {
            expect(addAttribute({ attributes, text: null })).toBeNull();
        });

        test('should handle null nameAttribute and valueAttribute', () => {
            expect(addAttribute({ text: '<span>Some Text</span>' })).toBe(
                '<span>Some Text</span>'
            );
        });

        test('Should return all attributes defined in the attributes array', () => {
            expect(
                addAttribute({
                    attributes: [
                        ...attributes,
                        { property: 'data-variant', value: 'secondary' }
                    ],
                    text: '<div id="container">Content</div>'
                })
            ).toBe(
                '<div id="container" class="pollito" data-variant="secondary">Content</div>'
            );
        });
    });

    describe('Tests function setOtherChar', () => {
        test('should replace &lt; with <', () => {
            expect(setOtherChar('This is a &lt;div&gt; element.')).toBe(
                'This is a <div> element.'
            );
        });

        test('should replace &gt; with >', () => {
            expect(setOtherChar('This is a &gt;span&lt; element.')).toBe(
                'This is a >span< element.'
            );
        });

        test('should replace multiple occurrences of &lt; and &gt;', () => {
            expect(
                setOtherChar('&lt;p&gt;This is a paragraph.&lt;/p&gt;')
            ).toBe('<p>This is a paragraph.</p>');
        });

        test('should handle empty string input', () => {
            expect(setOtherChar('')).toBe('');
        });

        test('should handle null input', () => {
            expect(setOtherChar(null)).toBe('');
        });

        test('should not modify text without &lt; or &gt; entities', () => {
            const text = 'This text does not contain entities.';
            expect(setOtherChar(text)).toBe(text);
        });
    });

    describe('Tests function replaceClassForMark', () => {
        test('should replace hl_yellow with hl_underline', () => {
            const text =
                'This is highlighted in <span class="hl_yellow">yellow</span>.';
            expect(replaceClassForMark(text)).toBe(
                'This is highlighted in <span class="hl_underline">yellow</span>.'
            );
        });

        test('should replace hl_pink with hl_underline', () => {
            const text =
                'This is highlighted in <span class="hl_pink">pink</span>.';
            expect(replaceClassForMark(text)).toBe(
                'This is highlighted in <span class="hl_underline">pink</span>.'
            );
        });

        test('should replace multiple occurrences of different classes', () => {
            const text =
                'Highlighted in <span class="hl_yellow">yellow</span> and <span class="hl_pink">pink</span>.';
            expect(replaceClassForMark(text)).toBe(
                'Highlighted in <span class="hl_underline">yellow</span> and <span class="hl_underline">pink</span>.'
            );
        });

        test('should handle empty string input', () => {
            expect(replaceClassForMark('')).toBe('');
        });

        test('should handle null input', () => {
            expect(replaceClassForMark(null)).toBe('');
        });

        test('should not modify text without hl classes', () => {
            const text = 'This text does not contain hl classes.';
            expect(replaceClassForMark(text)).toBe(text);
        });
    });

    describe('Tests function setBoldText', () => {
        test('should replace <b> with <strong>', () => {
            expect(
                setBoldText({
                    content: 'This is <b>bold</b> text.',
                    withSponsoredLink: true
                })
            ).toEqual({
                text: 'This is <strong>bold</strong> text.',
                withSponsoredLink: true
            });
        });

        test('should replace multiple occurrences of <b> and </b>', () => {
            expect(
                setBoldText({
                    content: 'This is <b>bold</b> and <b>strong</b> text.',
                    withSponsoredLink: true
                })
            ).toEqual({
                text: 'This is <strong>bold</strong> and <strong>strong</strong> text.',
                withSponsoredLink: true
            });
        });

        test('should handle empty content', () => {
            expect(
                setBoldText({
                    content: '',
                    withSponsoredLink: true
                })
            ).toEqual({
                text: '',
                withSponsoredLink: true
            });
        });

        test('should handle null content', () => {
            expect(
                setBoldText({
                    content: null,
                    withSponsoredLink: false
                })
            ).toEqual({
                text: '',
                withSponsoredLink: false
            });
        });

        test('should not modify text without <b> or </b> tags', () => {
            expect(
                setBoldText({
                    content: 'This text does not contain bold tags.',
                    withSponsoredLink: true
                })
            ).toEqual({
                text: 'This text does not contain bold tags.',
                withSponsoredLink: true
            });
        });
    });

    describe('Tests function setItalicText', () => {
        test('should replace <i> with <em>', () => {
            expect(
                setItalicText({
                    text: 'This is <i>italic</i> text.',
                    withSponsoredLink: true
                })
            ).toEqual({
                content: 'This is <em>italic</em> text.',
                withSponsoredLink: true
            });
        });

        test('should replace </i> with </em>', () => {
            expect(
                setItalicText({
                    text: 'This is <i>italic</i> text.',
                    withSponsoredLink: false
                })
            ).toEqual({
                content: 'This is <em>italic</em> text.',
                withSponsoredLink: false
            });
        });

        test('should replace multiple occurrences of <i> and </i>', () => {
            expect(
                setItalicText({
                    text: 'This is <i>italic</i> and <i>emphasized</i> text.',
                    withSponsoredLink: true
                })
            ).toEqual({
                content:
                    'This is <em>italic</em> and <em>emphasized</em> text.',
                withSponsoredLink: true
            });
        });

        test('should handle empty text', () => {
            expect(
                setItalicText({
                    text: '',
                    withSponsoredLink: true
                })
            ).toEqual({
                content: '',
                withSponsoredLink: true
            });
        });

        test('should handle null text', () => {
            expect(
                setItalicText({
                    text: null,
                    withSponsoredLink: false
                })
            ).toEqual({
                content: '',
                withSponsoredLink: false
            });
        });

        test('should not modify text without <i> or </i> tags', () => {
            expect(
                setItalicText({
                    text: 'This text does not contain italic tags.',
                    withSponsoredLink: true
                })
            ).toEqual({
                content: 'This text does not contain italic tags.',
                withSponsoredLink: true
            });
        });
    });

    describe('Tests function transformLinks', () => {
        test('should set title attribute and replace target for internal link', () => {
            expect(
                transformLinks({
                    content:
                        '<a href="https://lanacion.com.ar" target="_blank">La Nacion</a>',
                    withSponsoredLink: true
                })
            ).toBe(
                '<a href="https://lanacion.com.ar" target="_self" title="La Nacion" class="link foodit-link" data-variant="secondary">La Nacion</a>'
            );
        });

        test('should set rel="nofollow" for external link without sponsored link', () => {
            expect(
                transformLinks({
                    content: '<a href="https://example.com">External Link</a>',
                    withSponsoredLink: false
                })
            ).toBe(
                '<a href="https://example.com" title="External Link" class="link foodit-link" data-variant="secondary" rel="nofollow">External Link</a>'
            );
        });

        test('should set title attribute, replace target, and add rel="nofollow" for external link without sponsored link', () => {
            expect(
                transformLinks({
                    content:
                        '<a href="https://example.com" target="_blank">External Link</a>',
                    withSponsoredLink: false
                })
            ).toBe(
                '<a href="https://example.com" target="_blank" title="External Link" class="link foodit-link" data-variant="secondary" rel="nofollow">External Link</a>'
            );
        });

        test('should handle empty content', () => {
            expect(
                transformLinks({
                    content: '',
                    withSponsoredLink: true
                })
            ).toBe('');
        });

        test('should handle null content', () => {
            expect(
                transformLinks({
                    content: null,
                    withSponsoredLink: false
                })
            ).toBe('');
        });

        test('should not modify content without <a> tags', () => {
            expect(
                transformLinks({
                    content: 'This text does not contain anchor tags.',
                    withSponsoredLink: true
                })
            ).toBe('This text does not contain anchor tags.');
        });
    });

    describe('Tests functiojn transformElementText', () => {
        test('should replace the <i> tag with <em> and <b> with <strong>', () => {
            const element = {
                type: 'text',
                content:
                    '<b>Texto en negrita</b> <i>Texto en cursiva</i> <a href="https://example.com">Enlace</a>'
            };

            const result = transformElementText({ element });

            expect(result).toEqual({
                ...element,
                content: expect.stringContaining(
                    '<strong>Texto en negrita</strong> <em>Texto en cursiva</em>'
                )
            });
        });

        test('should add the rel=nofollow attribute when the withSponsoredLink attribute is false', () => {
            const element = {
                type: 'text',
                content: '<a href="https://externo.com">Enlace externo</a>'
            };

            const result = transformElementText({
                element,
                withSponsoredLink: false
            });

            expect(result).toEqual({
                ...element,
                content: expect.stringContaining('rel="nofollow"')
            });
        });

        test('should add the title attribute with the content of the tag in case the anchor does not have it', () => {
            const element = {
                type: 'text',
                content: '<a href="https://lanacion.com.ar">Enlace interno</a>'
            };

            const result = transformElementText({
                element,
                withSponsoredLink: false
            });

            expect(result).toEqual({
                ...element,
                content: expect.stringContaining('title="Enlace interno"')
            });
        });
    });

    describe('getArticleSubtype', () => {
        test('Should return STORYTELLING for an invalid subtype', () => {
            expect(getArticleSubtype('1')).toBe(STORYTELLING);
        });

        test('Should return the subtype given for STORYTELLING', () => {
            expect(getArticleSubtype(STORYTELLING)).toBe(STORYTELLING);
        });

        test('Should return the subtype given for RECETA', () => {
            expect(getArticleSubtype(RECETA)).toBe(RECETA);
        });

        test('Should return STORYTELLING for a null subtype', () => {
            expect(getArticleSubtype(null)).toBe(STORYTELLING);
        });

        test('Should return STORYTELLING for an undefined subtype', () => {
            expect(getArticleSubtype(undefined)).toBe(STORYTELLING);
        });
    });

    describe('transform Data Source Function', () => {
        let mockInputResult;
        let mockQuery;
        let mockCachedCall;
        let mockSiteProperties;

        let mockedGetProperties;
        let mockedValidateSponsoredLink;
        let mockedTransformElementsBasedOnType;
        let mockedTransformPromoItems;
        let mockedTransformAuthors;
        let mockedFilterSections;

        beforeEach(() => {
            jest.clearAllMocks();

            mockedGetProperties = getProperties;
            mockedValidateSponsoredLink = validateSponsoredLink;
            mockedTransformElementsBasedOnType = transformElementsBasedOnType;
            mockedTransformPromoItems = transformPromoItems;
            mockedTransformAuthors = transformAuthors;
            mockedFilterSections = filterSections;

            mockSiteProperties = mockResults;

            mockedValidateSponsoredLink.mockReturnValue(false);

            mockedTransformElementsBasedOnType.mockReturnValue([
                { type: 'text', content: 'Transformed Element 1' },
                { type: 'image', url: 'transformed-image.jpg' }
            ]);

            mockedTransformPromoItems.mockResolvedValue({
                basic: {
                    type: 'image',
                    url: 'transformed-promo.jpg',
                    caption: 'Transformed Promo'
                }
            });

            mockedTransformAuthors.mockImplementation((authors = []) =>
                authors.map(author => ({ ...author, transformed: true }))
            );

            mockedFilterSections.mockImplementation((resultData = {}) => ({
                ...(resultData.taxonomy || {}),
                filtered: true
            }));

            mockInputResult = {
                _id: 'XYZ123',
                type: 'story',
                subtype: STORYTELLING,
                headlines: { basic: 'Test Headline' },
                promo_items: {
                    basic: { type: 'image', url: 'original-promo.jpg' }
                },
                content_elements: [
                    { type: 'text', content: 'Original Element 1' },
                    { type: 'image', url: 'original-image.jpg' },
                    { type: 'oembed', subtype: 'youtube' }
                ],
                credits: {
                    by: [
                        { type: 'author', name: 'John Doe', _id: 'johndoe' },
                        { type: 'author', name: 'Jane Smith', _id: 'janesmith' }
                    ]
                },
                taxonomy: {
                    primary_section: {
                        _id: '/food',
                        type: 'section',
                        name: 'Food'
                    },
                    sections: [
                        { _id: '/food', type: 'section', name: 'Food' },
                        { _id: '/recipes', type: 'section', name: 'Recipes' }
                    ],
                    tags: [
                        { name: 'easy', slug: 'easy', description: 'Easy tag' }
                    ]
                },
                related_content: {
                    basic: []
                }
            };

            mockQuery = {
                'arc-site': 'foodit',
                meteringVariant: 'PREMIUM',
                paywallEnabled: 'true'
            };

            mockCachedCall = jest.fn();
        });

        it('should call dependencies with correct parameters and return transformed data for STORYTELLING', async () => {
            const result = await transform(
                mockInputResult,
                mockQuery,
                mockCachedCall
            );

            expect(mockedValidateSponsoredLink).toHaveBeenCalledWith(
                mockInputResult
            );
            expect(mockedTransformPromoItems).toHaveBeenCalledTimes(1);
            expect(mockedTransformElementsBasedOnType).toHaveBeenCalledTimes(1);
            expect(mockedTransformAuthors).toHaveBeenCalledWith(
                mockInputResult.credits.by
            );
            expect(mockedFilterSections).toHaveBeenCalledWith(mockInputResult);

            const aditionalPropsMatcher = expect.objectContaining({
                withSponsoredLink: false,
                siteProperties: mockSiteProperties,
                cachedCall: mockCachedCall,
                subtype: STORYTELLING,
                arcSite: 'foodit'
            });

            expect(mockedTransformPromoItems).toHaveBeenCalledWith({
                cachedCall: mockCachedCall,
                arcSite: 'foodit',
                configCallbacks: configPromoItems,
                promoItemObject: mockInputResult.promo_items
            });
            expect(mockedTransformElementsBasedOnType).toHaveBeenCalledWith({
                arrayElements: mockInputResult.content_elements,
                configCallbacks: configCallbackContentElements,
                searchPropertyOnElem: 'type',
                aditionalProps: aditionalPropsMatcher
            });
            expect(result).toBeDefined();
            expect(result._id).toBe('XYZ123');
            expect(result.subtype).toBe(STORYTELLING);
            expect(result.paywallEnabled).toBe('true');
            expect(result.subscription).toBe('PREMIUM');
            expect(result.promo_items).toEqual({
                basic: {
                    type: 'image',
                    url: 'transformed-promo.jpg',
                    caption: 'Transformed Promo'
                }
            });
            expect(result.content_elements).toEqual([
                { type: 'text', content: 'Transformed Element 1' },
                { type: 'image', url: 'transformed-image.jpg' }
            ]);
            expect(result.credits.by).toEqual([
                {
                    type: 'author',
                    name: 'John Doe',
                    _id: 'johndoe',
                    transformed: true
                },
                {
                    type: 'author',
                    name: 'Jane Smith',
                    _id: 'janesmith',
                    transformed: true
                }
            ]);
            expect(result.taxonomy).toEqual({
                primary_section: {
                    _id: '/food',
                    type: 'section',
                    name: 'Food'
                },
                sections: [
                    { _id: '/food', type: 'section', name: 'Food' },
                    { _id: '/recipes', type: 'section', name: 'Recipes' }
                ],
                tags: [{ name: 'easy', slug: 'easy', description: 'Easy tag' }],
                filtered: true
            });
            expect(result.category).toBe('Food');
            expect(result.related_content).toBeDefined();
            expect(result.related_content.basic).toBeUndefined();
        });

        it('should set subtype to RECETA if input subtype is RECETA', async () => {
            mockInputResult.subtype = RECETA;
            const result = await transform(
                mockInputResult,
                mockQuery,
                mockCachedCall
            );
            expect(result.subtype).toBe(RECETA);
            expect(mockedTransformElementsBasedOnType).toHaveBeenCalledWith(
                expect.objectContaining({
                    aditionalProps: expect.objectContaining({ subtype: RECETA })
                })
            );
        });

        it('should set subtype to RECETA_CERRADA if input is RECETA and isExclusiveSuscriptor is true', async () => {
            mockInputResult.subtype = RECETA;
            const customCallbacksConfig = { isExclusiveSuscriptor: true };
            const result = await transform(
                mockInputResult,
                mockQuery,
                mockCachedCall,
                customCallbacksConfig
            );
            expect(result.subtype).toBe(RECETA_CERRADA);
            expect(mockedTransformElementsBasedOnType).toHaveBeenCalledWith(
                expect.objectContaining({
                    aditionalProps: expect.objectContaining({
                        subtype: RECETA_CERRADA
                    })
                })
            );
        });

        it('should default subtype to STORYTELLING if input subtype is unknown', async () => {
            mockInputResult.subtype = 'SOME_OTHER_TYPE';
            const result = await transform(
                mockInputResult,
                mockQuery,
                mockCachedCall
            );
            expect(result.subtype).toBe(STORYTELLING);
            expect(mockedTransformElementsBasedOnType).toHaveBeenCalledWith(
                expect.objectContaining({
                    aditionalProps: expect.objectContaining({
                        subtype: STORYTELLING
                    })
                })
            );
        });

        it('should use customConfigCallbackContentElements if provided', async () => {
            const mockCustomConfig = { text: jest.fn() };
            const customCallbacksConfig = {
                customConfigCallbackContentElements: mockCustomConfig
            };

            await transform(
                mockInputResult,
                mockQuery,
                mockCachedCall,
                customCallbacksConfig
            );

            expect(mockedTransformElementsBasedOnType).toHaveBeenCalledWith(
                expect.objectContaining({
                    configCallbacks: mockCustomConfig
                })
            );
        });

        it('should handle missing optional fields in the input result gracefully', async () => {
            const minimalResult = {
                _id: 'MIN123',
                type: 'story',
                subtype: STORYTELLING,
                headlines: { basic: 'Minimal Headline' }
            };

            mockedTransformPromoItems.mockResolvedValue({});
            mockedTransformElementsBasedOnType.mockReturnValue([]);
            mockedTransformAuthors.mockImplementation(() => []);
            mockedFilterSections.mockImplementation(() => ({ filtered: true }));

            const result = await transform(
                minimalResult,
                mockQuery,
                mockCachedCall
            );

            expect(result).toBeDefined();
            expect(result._id).toBe('MIN123');
            expect(result.subtype).toBe(STORYTELLING);
            expect(result.promo_items).toEqual({});
            expect(result.content_elements).toEqual([]);
            expect(result.credits.by).toEqual([]);
            expect(result.taxonomy).toEqual({ filtered: true });
            expect(result.category).toBe('');
            expect(result.related_content).toEqual({ basic: undefined });
            expect(result.paywallEnabled).toBe('true');
            expect(mockedTransformPromoItems).toHaveBeenCalledWith(
                expect.objectContaining({
                    promoItemObject: {}
                })
            );
            expect(mockedTransformElementsBasedOnType).toHaveBeenCalledWith(
                expect.objectContaining({
                    arrayElements: []
                })
            );
            expect(mockedTransformAuthors).toHaveBeenCalledWith([]);
            expect(mockedFilterSections).toHaveBeenCalledWith(minimalResult);
        });

        it('should correctly pass withSponsoredLink=true to aditionalProps if validate returns true', async () => {
            mockedValidateSponsoredLink.mockReturnValue(true);
            await transform(mockInputResult, mockQuery, mockCachedCall);

            expect(mockedTransformElementsBasedOnType).toHaveBeenCalledWith(
                expect.objectContaining({
                    aditionalProps: expect.objectContaining({
                        withSponsoredLink: true
                    })
                })
            );
        });
    });
});
