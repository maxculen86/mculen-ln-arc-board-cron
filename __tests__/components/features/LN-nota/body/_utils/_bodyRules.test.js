import {
    selectRule,
    bodyRules
} from '../../../../../../components/features/LN-nota/body/_utils/_bodyRules';
import {
    FOTOAL100,
    HTMLLIBRE,
    INFOGRAFIA,
    LIVEBLOG,
    NOTICIA,
    RECETA,
    STORYTELLING,
    VIDEO,
    AGENCIA
} from '../../../../../../components/private/common/utils/subtypes/subtypeHelper';

describe('_utils/_bodyRules.js', () => {
    describe('if subtype is "FOTOAL100"', () => {
        const attr = {
            subtype: FOTOAL100,
            componentElement: { arcType: 'blockquote' },
            subtypeElement: 'blockquote',
            type: 'blockquote'
        };

        it('should return the function FOTOAL100 from selectRule', () => {
            const component = selectRule(attr);
            expect(component).toEqual(bodyRules.fotoAl100);
        });

        it('if subtypeElement is "custom-parallax", should return the function default from selectRule', () => {
            attr.subtypeElement = 'custom-parallax';
            const component = selectRule(attr);
            expect(component).toEqual(bodyRules.default);
        });

        it('should return false when type is oembed_response', () => {
            attr.type = 'oembed_response';
            expect(bodyRules.fotoAl100(attr)).toEqual(false);
        });

        it('should return false when type is video', () => {
            attr.type = 'video';
            expect(bodyRules.fotoAl100(attr)).toEqual(false);
        });

        it('should return false when type is raw_html', () => {
            attr.type = 'raw_html';
            expect(bodyRules.fotoAl100(attr)).toEqual(false);
        });
    });

    describe('if subtype is not "FOTOAL100"', () => {
        const attr = { componentElement: { arcType: 'text' }, type: 'text' };
        const subtypes = [
            NOTICIA,
            INFOGRAFIA,
            RECETA,
            STORYTELLING,
            VIDEO,
            LIVEBLOG,
            HTMLLIBRE,
            AGENCIA
        ];

        subtypes.forEach(subtype => {
            it('should use the default selectRule function', () => {
                attr.subtype = subtype;
                const component = selectRule(attr);
                expect(component).toEqual(bodyRules.default);
            });
        });

        it('if include videoJw, should use selectRule is videoJw function', () => {
            attr.componentElement = { arcType: 'video_jw' };
            attr.subtypeElement = 'video_jw';
            attr.type = 'custom_embed';

            const component = selectRule(attr);
            expect(component).toEqual(bodyRules.videoJw);
        });

        it('if include element type "quote", should use selectRule is "quote" function', () => {
            attr.componentElement = { arcType: 'blockquote' };
            attr.subtypeElement = 'blockquote';
            attr.type = 'quote';

            const component = selectRule(attr);
            expect(component).toEqual(bodyRules.quote);
        });
    });
    describe('elements in the body of the note', () => {
        it('if the type is custom_embed and the subtype is "canchallena" should return the custom_embed function from selectRule', () => {
            const attr = {
                subtype: 'canchallena',
                componentElement: { arcType: 'canchallena' },
                subtypeElement: 'canchallena',
                type: 'custom_embed'
            };

            const component = selectRule(attr);
            expect(component).toEqual(bodyRules.custom_embed);
        });
    });

    describe('custom ruleConditions', () => {
        it('should use ruleConditions when provided', () => {
            const customRule = jest.fn();
            const attr = {
                subtype: STORYTELLING,
                componentElement: { arcType: 'canchallena' },
                subtypeElement: 'canchallena',
                type: 'custom_embed',
                ruleConditions: [{ check: () => true, rule: customRule }]
            };

            const selectedRule = selectRule(attr);
            expect(selectedRule).toEqual(customRule);
        });

        it('should fallback to type rule when ruleConditions is empty', () => {
            const attr = {
                subtype: STORYTELLING,
                componentElement: { arcType: 'blockquote' },
                subtypeElement: 'blockquote',
                type: 'quote',
                ruleConditions: []
            };

            const selectedRule = selectRule(attr);
            expect(selectedRule).toEqual(bodyRules.quote);
        });
    });
});
