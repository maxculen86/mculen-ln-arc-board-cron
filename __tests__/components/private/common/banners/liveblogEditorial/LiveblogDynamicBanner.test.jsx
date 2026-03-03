import React from 'react';
import { render, screen } from '@testing-library/react';
import LiveblogDynamicBanner from '../../../../../../components/private/common/banners/liveblogEditorial/LiveblogDynamicBanner';
import { getBannerConfiguration } from '../../../../../../components/private/LN/common/utils/bannerHelper';
import { isSubscribed } from '../../../../../../components/private/common/auth/helper/loginHelper';

jest.mock(
    '../../../../../../components/private/LN/common/utils/bannerHelper',
    () => ({
        getBannerConfiguration: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/common/auth/helper/loginHelper',
    () => ({
        SUBSCRIBED_HELPER: { LN: '2' },
        isSubscribed: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/common/banners/DivBannerSSR',
    () =>
        function DivBannerSSR({ bannerConfiguration }) {
            return (
                <div
                    data-testid="div-banner-ssr"
                    data-hide={String(bannerConfiguration.hideForSubscriptor)}
                >
                    {bannerConfiguration.slotId}
                </div>
            );
        }
);

describe('private - common - banners - liveblogEditorial - LiveblogDynamicBanner', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns null for subscribed user when banner is not for subscribers', () => {
        isSubscribed.mockReturnValue(true);

        const { container } = render(
            <LiveblogDynamicBanner
                device="desktop"
                slotId="middle_1_dsk"
                showForSubscriber={false}
            />
        );

        expect(container.firstChild).toBeNull();
        expect(getBannerConfiguration).not.toHaveBeenCalled();
    });

    it('renders banner for non-subscribed user and marks it as hidden for subscribers when showForSubscriber is false', () => {
        isSubscribed.mockReturnValue(false);
        getBannerConfiguration.mockReturnValue({
            slotId: 'middle_1_dsk',
            slotGroup: 'nota',
            device: 'desktop'
        });

        render(
            <LiveblogDynamicBanner
                device="desktop"
                slotId="middle_1_dsk"
                showForSubscriber={false}
            />
        );

        expect(getBannerConfiguration).toHaveBeenCalled();
        expect(screen.getByTestId('div-banner-ssr')).toHaveTextContent(
            'middle_1_dsk'
        );
        expect(screen.getByTestId('div-banner-ssr')).toHaveAttribute(
            'data-hide',
            'true'
        );
    });
});
