import React from 'react';
import { render, screen } from '@testing-library/react';
import DsBanner from '../../../../../components/features/LN/DS-Banner/default';
import {
    getBannerConfiguration,
    shouldHideBannerForSubscriberOnlyContent
} from '../../../../../components/private/LN/common/utils/bannerHelper';

const mockBanner = jest.fn(({ bannerConfiguration }) => (
    <div data-testid={`dynamic-${bannerConfiguration.slotId}`} />
));
const mockBannerPlaceholder = jest.fn(({ slotName }) => (
    <div data-testid={`placeholder-${slotName}`} />
));
const mockCabezalScript = jest.fn(() => <div data-testid="sticky-script" />);

jest.mock('fusion:consumer', () => component => component);

jest.mock(
    '../../../../../components/private/LN/common/utils/bannerHelper',
    () => ({
        getBannerConfiguration: jest.fn(),
        shouldHideBannerForSubscriberOnlyContent: jest.fn()
    })
);

jest.mock(
    '../../../../../components/private/common/banners/bannersRules',
    () => ({
        __esModule: true,
        default: {
            nota: {
                desktop: {
                    cabezal_dsk: {
                        customScript: () => mockCabezalScript()
                    }
                }
            }
        }
    })
);

jest.mock(
    '../../../../../components/features/ui/ln/banner/default',
    () => props => mockBanner(props)
);
jest.mock(
    '../../../../../components/features/LN/DS-Banner/components/BannerPBPlaceholder',
    () => props => mockBannerPlaceholder(props)
);

describe('LN/DS-Banner', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        getBannerConfiguration.mockImplementation(
            (_gc, _cf, _gcc, bannerConfig) => ({
                slotId: bannerConfig.slotId,
                device: bannerConfig.device,
                slotGroup: 'nota',
                dfpId: 133919216,
                slotName: `la_nacion_${bannerConfig.device}/Nota/${bannerConfig.slotId}`,
                targeting: { sitio: 'lanacion', seccion: 'nota' },
                dimensions: [[320, 50]],
                withoutHide: bannerConfig.slotId !== 'sticky2_mob',
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            })
        );
        shouldHideBannerForSubscriberOnlyContent.mockReturnValue(false);
    });

    it('renders placeholders in admin', () => {
        render(
            <DsBanner
                isAdmin
                customFields={{
                    group: 'nota',
                    desktop: 'cabezal_dsk',
                    mobile: 'sticky2_mob'
                }}
                globalContent={{}}
                globalContentConfig={{}}
            />
        );

        expect(
            screen.getByTestId('placeholder-la_nacion_desktop/Nota/cabezal_dsk')
        ).toBeInTheDocument();
        expect(
            screen.getByTestId('placeholder-la_nacion_mobile/Nota/sticky2_mob')
        ).toBeInTheDocument();
        expect(mockBannerPlaceholder).toHaveBeenCalledTimes(2);
        expect(mockBanner).not.toHaveBeenCalled();
    });

    it('renders dynamic banner in template mode and custom sticky script', () => {
        mockCabezalScript.mockClear();

        render(
            <DsBanner
                customFields={{
                    group: 'nota',
                    sticky: true,
                    desktop: 'cabezal_dsk',
                    mobile: 'sticky2_mob',
                    tablet: 'cabezal_tab'
                }}
                globalContent={{}}
                globalContentConfig={{}}
            />
        );

        expect(screen.getByTestId('dynamic-cabezal_dsk')).toBeInTheDocument();
        expect(screen.getByTestId('dynamic-sticky2_mob')).toBeInTheDocument();
        expect(screen.getByTestId('dynamic-cabezal_tab')).toBeInTheDocument();

        expect(mockBanner).toHaveBeenCalledTimes(3);
        expect(mockBannerPlaceholder).not.toHaveBeenCalled();
        expect(mockBanner.mock.calls[0][0]).toMatchObject({
            bannerConfiguration: expect.objectContaining({
                slotId: 'cabezal_dsk'
            })
        });
        expect(mockCabezalScript).toHaveBeenCalled();
    });
});
