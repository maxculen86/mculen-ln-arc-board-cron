import {
    getImageConfig,
    deleteTagsForTitle,
    addAttribute,
    setOtherChar,
    replaceClassForMark,
    setBoldText,
    setItalicText,
    setExternalLinks,
    transformElementText,
    getArticleSubtype
} from '../../../../../../content/sources/utils/fooditSources/fooditArticleSource';
import {
    STORYTELLING,
    RECETA
} from '../../../../../../components/private/common/utils/subtypes/subtypeHelper';
import getProperties from 'fusion:properties';

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

jest.mock('fusion:properties', () => () =>
    ({ getProperties: () => mockResults }.getProperties())
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
        const nameAttribute = 'class';
        const valueAttribute = 'pollito';

        test('should add attribute to the text', () => {
            expect(
                addAttribute({
                    nameAttribute,
                    valueAttribute,
                    text: '<div>Hello World</div>'
                })
            ).toBe('<div class="pollito">Hello World</div>');
        });

        test('should add attribute with spaces around existing attributes', () => {
            expect(
                addAttribute({
                    nameAttribute,
                    valueAttribute,
                    text: '<div id="container">Content</div>'
                })
            ).toBe('<div id="container" class="pollito">Content</div>');
        });

        test('should handle multiple spaces in the text', () => {
            expect(
                addAttribute({
                    nameAttribute,
                    valueAttribute,
                    text: '<p>   Some   Text   </p>'
                })
            ).toBe('<p class="pollito">   Some   Text   </p>');
        });

        test('should handle empty text', () => {
            expect(
                addAttribute({ nameAttribute, valueAttribute, text: '' })
            ).toBe('');
        });

        test('should return the value of text as received, if the text is null', () => {
            expect(
                addAttribute({ nameAttribute, valueAttribute, text: null })
            ).toBeNull();
        });

        test('should handle null nameAttribute and valueAttribute', () => {
            expect(addAttribute({ text: '<span>Some Text</span>' })).toBe(
                '<span>Some Text</span>'
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
                text:
                    'This is <strong>bold</strong> and <strong>strong</strong> text.',
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

    describe('Tests function setExternalLinks', () => {
        test('should set title attribute and replace target for internal link', () => {
            expect(
                setExternalLinks({
                    content:
                        '<a href="https://lanacion.com.ar" target="_blank">La Nacion</a>',
                    withSponsoredLink: true
                })
            ).toBe(
                '<a href="https://lanacion.com.ar" target="_self" title="La Nacion">La Nacion</a>'
            );
        });

        test('should set rel="nofollow" for external link without sponsored link', () => {
            expect(
                setExternalLinks({
                    content: '<a href="https://example.com">External Link</a>',
                    withSponsoredLink: false
                })
            ).toBe(
                '<a href="https://example.com" title="External Link" rel="nofollow">External Link</a>'
            );
        });

        test('should set title attribute, replace target, and add rel="nofollow" for external link without sponsored link', () => {
            expect(
                setExternalLinks({
                    content:
                        '<a href="https://example.com" target="_blank">External Link</a>',
                    withSponsoredLink: false
                })
            ).toBe(
                '<a href="https://example.com" target="_blank" title="External Link" rel="nofollow">External Link</a>'
            );
        });

        test('should handle empty content', () => {
            expect(
                setExternalLinks({
                    content: '',
                    withSponsoredLink: true
                })
            ).toBe('');
        });

        test('should handle null content', () => {
            expect(
                setExternalLinks({
                    content: null,
                    withSponsoredLink: false
                })
            ).toBe('');
        });

        test('should not modify content without <a> tags', () => {
            expect(
                setExternalLinks({
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
});
