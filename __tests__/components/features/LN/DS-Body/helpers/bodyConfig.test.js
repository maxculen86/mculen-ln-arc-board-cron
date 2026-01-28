import { getBodyConfigForLayout } from '../../../../../../components/features/LN/DS-Body/helpers/bodyConfig';
import { defaultRuleConditions } from '../../../../../../components/features/LN-nota/body/_utils/_bodyRules';
import { DEFAULT_BODY_COMPONENTS } from '../../../../../../components/features/LN-nota/body/_utils/_bodyElementRules';

jest.mock(
    '../../../../../../components/features/LN-nota/body/_utils/_bodyRules',
    () => ({
        defaultRuleConditions: ['default-rule']
    })
);

jest.mock(
    '../../../../../../components/features/LN-nota/body/_utils/_bodyElementRules',
    () => ({
        DEFAULT_BODY_COMPONENTS: [
            { arcType: 'text' },
            { arcType: 'list' },
            { arcType: 'image' }
        ]
    })
);

describe('components - features - LN - DS-Body - helpers - bodyConfig', () => {
    it('should return default config for unknown layout', () => {
        const result = getBodyConfigForLayout('unknown-layout');

        expect(result.bodyComponents).toBe(DEFAULT_BODY_COMPONENTS);
        expect(result.ruleConditions).toBe(defaultRuleConditions);
    });

    const knownLayouts = ['LN-nota-storytelling-v2', 'LN-Nota-Opinion'];

    knownLayouts.forEach(layout => {
        it(`should return custom config for known layout (${layout})`, () => {
            const result = getBodyConfigForLayout(layout);

            expect(Array.isArray(result.bodyComponents)).toBe(true);
            expect(result.bodyComponents.length).toBeGreaterThan(0);
            expect(Array.isArray(result.ruleConditions)).toBe(true);
        });
    });
});
