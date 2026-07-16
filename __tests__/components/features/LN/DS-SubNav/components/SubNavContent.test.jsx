import React from 'react';
import { render, screen } from '@testing-library/react';
import SubNavContent from '../../../../../../components/features/LN/DS-SubNav/components/SubNavContent';
import useGetLogoImage from '../../../../../../components/private/common/hooks/useGetLogoImage';
import { buildSubNavContentData } from '../../../../../../components/features/LN/DS-SubNav/_helpers';

jest.mock(
    '../../../../../../components/private/common/hooks/useGetLogoImage',
    () => jest.fn(() => ({ width: 264, height: 48, url: '/logo.png' }))
);

jest.mock(
    '../../../../../../components/features/LN/DS-SubNav/hooks/useNavigationCategories',
    () => jest.fn(() => ({ navigation: [], isPrimarySection: false }))
);

jest.mock(
    '../../../../../../components/features/LN/DS-SubNav/_helpers',
    () => ({
        buildSubNavContentData: jest.fn(() => ({
            sectionId: '/economia/campo',
            titleText: 'Campo',
            url: '/economia/campo/',
            categories: [],
            hasLogo: true,
            isJuegosSection: false,
            imageProps: { src: '/logo.png', width: 264, height: 48 }
        })),
        getBrandFromSection: jest.fn(() => 'campo')
    })
);

jest.mock(
    '../../../../../../components/features/LN/DS-SubNav/components/SubNavHeader',
    () =>
        function MockHeader({ imageProps }) {
            return (
                <div
                    data-testid="header"
                    data-image={JSON.stringify(imageProps)}
                />
            );
        }
);

jest.mock(
    '../../../../../../components/features/LN/DS-SubNav/components/SubNavigation',
    () =>
        function MockNavigation() {
            return <div data-testid="navigation" />;
        }
);

jest.mock(
    '../../../../../../components/private/common/social-network',
    () =>
        function MockSocial() {
            return <div data-testid="social" />;
        }
);

describe('Components - features - LN - DS-SubNav - SubNavContent', () => {
    const defaultProps = {
        globalContent: {},
        customFields: {},
        idLogoImage: 'LOGO_ID',
        hideCategories: 'false',
        hierarchyManual: undefined,
        socials: [],
        navigationType: 'scroll'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should resolve the logo WITHOUT staticMode, so Fusion serializes relatedImageSource and the client rehydrates the same data (staticMode:true left the client empty and collapsed the logo → CLS)', () => {
        render(<SubNavContent {...defaultProps} />);

        expect(useGetLogoImage).toHaveBeenCalledTimes(1);
        const [id, staticMode] = useGetLogoImage.mock.calls[0];
        expect(id).toBe('LOGO_ID');
        expect(staticMode).not.toBe(true);
    });

    it('should feed the resolved logo image into buildSubNavContentData so the header gets its dimensions', () => {
        render(<SubNavContent {...defaultProps} />);

        expect(buildSubNavContentData).toHaveBeenCalledWith(
            expect.objectContaining({
                idLogoImage: 'LOGO_ID',
                logoImage: { width: 264, height: 48, url: '/logo.png' }
            })
        );
    });

    it('should forward the built imageProps (with intrinsic dimensions) to the header', () => {
        render(<SubNavContent {...defaultProps} />);

        expect(screen.getByTestId('header')).toHaveAttribute(
            'data-image',
            JSON.stringify({ src: '/logo.png', width: 264, height: 48 })
        );
    });
});
