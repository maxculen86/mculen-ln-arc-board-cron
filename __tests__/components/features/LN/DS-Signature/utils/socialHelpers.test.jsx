import { buildSocialItems } from '../../../../../../components/features/LN/DS-Signature/utils/socialHelpers';
import { transformSocial } from '../../../../../../components/features/private-global/common/utils/transformSocial';

jest.mock(
    '../../../../../../components/features/private-global/common/utils/transformSocial',
    () => ({
        transformSocial: jest.fn()
    })
);

describe('components - features - LN - DS-Signature - utils - socialHelpers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('maps email links to mailto format', () => {
        transformSocial.mockReturnValue({
            name: 'autor@lanacion.com.ar',
            href: 'https://email.com/autor@lanacion.com.ar/',
            icon: 'email'
        });

        const result = buildSocialItems([
            { site: 'email', url: 'autor@lanacion.com.ar' }
        ]);

        expect(result).toEqual([
            {
                icon: 'mail',
                url: 'mailto:autor@lanacion.com.ar',
                label: 'autor@lanacion.com.ar'
            }
        ]);
        expect(transformSocial).toHaveBeenCalledWith(
            'email',
            'autor@lanacion.com.ar'
        );
    });

    it('keeps existing behavior for non-email socials', () => {
        transformSocial.mockReturnValue({
            name: '@autorx',
            href: 'https://twitter.com/autorx/',
            icon: 'twitter'
        });

        const result = buildSocialItems([{ site: 'twitter', url: '@autorx' }]);

        expect(transformSocial).toHaveBeenCalledWith('twitter', '@autorx');
        expect(result).toEqual([
            {
                icon: 'x',
                url: 'https://twitter.com/autorx/',
                label: '@autorx'
            }
        ]);
    });
});
