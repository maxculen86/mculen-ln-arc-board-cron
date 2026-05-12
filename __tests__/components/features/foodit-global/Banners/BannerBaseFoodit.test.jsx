import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { BannerBaseFoodit } from '../../../../../components/features/foodit-global/Banners/BannerBaseFoodit';
import { useAdManager } from '../../../../../components/features/foodit-global/Banners/hooks/useAdManager';
import { getTypeOfDevice } from '@ln/hooks';
import isSSR from '../../../../../components/private/LN/common/utils/isSSR';

jest.mock(
    '../../../../../components/features/foodit-global/Banners/hooks/useAdManager'
);
jest.mock('../../../../../components/private/LN/common/utils/isSSR');

jest.mock('@ln/hooks', () => ({
    getTypeOfDevice: jest.fn()
}));

const mockBannerType = {
    devices: {
        mobile: {
            slotId: 'test-slot-mobile',
            size: [[320, 50]],
            divId: 'test-div-mobile',
            classParent: 'test-class-mobile'
        },
        tablet: {
            slotId: 'test-slot-tablet',
            size: [[728, 90]],
            divId: 'test-div-tablet',
            classParent: 'test-class-tablet'
        },
        desktop: {
            slotId: 'test-slot-desktop',
            size: [[970, 250]],
            divId: 'test-div-desktop',
            classParent: 'test-class-desktop'
        }
    },
    getTargetings: jest.fn()
};

describe('BannerBaseFoodit', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly on SSR', () => {
        isSSR.mockReturnValue(true);
        getTypeOfDevice.mockReturnValue('desktop');

        const { container } = render(
            <BannerBaseFoodit bannerType={mockBannerType} />
        );
        expect(
            container.getElementsByClassName('test-class-desktop')
        ).toHaveLength(1);
        expect(document.getElementById('test-div-desktop')).toBeInTheDocument();
    });

    it('should render correctly on client-side', () => {
        isSSR.mockReturnValue(false);
        getTypeOfDevice.mockReturnValue('desktop');

        const { container } = render(
            <BannerBaseFoodit bannerType={mockBannerType} />
        );
        expect(
            container.getElementsByClassName('test-class-desktop')
        ).toHaveLength(1);
        expect(document.getElementById('test-div-desktop')).toBeInTheDocument();
    });

    it('should render correctly on mobile', () => {
        getTypeOfDevice.mockReturnValue('mobile');

        const { container } = render(
            <BannerBaseFoodit bannerType={mockBannerType} />
        );
        expect(
            container.getElementsByClassName('test-class-mobile')
        ).toHaveLength(1);
        expect(document.getElementById('test-div-mobile')).toBeInTheDocument();
    });

    it('should render correctly on tablet', () => {
        getTypeOfDevice.mockReturnValue('tablet');

        const { container } = render(
            <BannerBaseFoodit bannerType={mockBannerType} />
        );
        expect(
            container.getElementsByClassName('test-class-tablet')
        ).toHaveLength(1);
        expect(document.getElementById('test-div-tablet')).toBeInTheDocument();
    });

    it('should handle adManagerError', () => {
        isSSR.mockReturnValue(false);
        useAdManager.mockReturnValue('Error message');

        const { container } = render(
            <BannerBaseFoodit bannerType={mockBannerType} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('should call getTargetings only once across re-renders (useMemo)', () => {
        isSSR.mockReturnValue(false);
        getTypeOfDevice.mockReturnValue('desktop');

        const { rerender } = render(
            <BannerBaseFoodit bannerType={mockBannerType} />
        );
        rerender(<BannerBaseFoodit bannerType={mockBannerType} />);
        rerender(<BannerBaseFoodit bannerType={mockBannerType} />);

        expect(mockBannerType.getTargetings).toHaveBeenCalledTimes(1);
    });
});
