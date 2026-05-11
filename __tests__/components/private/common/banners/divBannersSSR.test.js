import React from 'react';
import DivBannerSSR from '../../../../../components/private/common/banners/DivBannerSSR';
import { render } from '@testing-library/react';
import Context from 'fusion:context';

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

describe('Private - Common - Banners - Div Banners SSR', () => {
    Context.useAppContext = jest.fn(() => ({
        layout: 'LN10-Home_Main'
    }));
    it('should return div banner with correct tags', () => {
        const { container } = render(
            <DivBannerSSR bannerConfiguration={bannerConfig} />
        );
        expect(container).toMatchSnapshot();
    });
    it('should show lazy class in div banner', () => {
        const { container } = render(
            <DivBannerSSR bannerConfiguration={lazyStaticBannerConfig} />
        );
        expect(container.getElementsByClassName('lazy').length).toBe(1);
    });
    it('always renders --no-app class for a legacy slot (cabezal_dsk)', () => {
        const { container } = render(
            <DivBannerSSR bannerConfiguration={legacySlotConfig} />
        );
        expect(container.firstChild).toHaveClass('--no-app');
    });
    it('always renders --no-app class for a non-legacy slot (caja1_dsk)', () => {
        const { container } = render(
            <DivBannerSSR bannerConfiguration={nonLegacySlotConfig} />
        );
        expect(container.firstChild).toHaveClass('--no-app');
    });
});

const bannerConfig = {
    slotId: 'random_banner',
    classes: '--random_banner --fixed --close',
    hideForSubscriptor: true,
    closeButton: true
};

const lazyStaticBannerConfig = {
    slotId: 'random_banner',
    classes: '--random_banner --fixed --close',
    hideForSubscriptor: true,
    closeButton: true,
    isStatic: true,
    lazyClass: 'lazy'
};

const legacySlotConfig = {
    slotId: 'cabezal_dsk',
    classes: '',
    hideForSubscriptor: false,
    closeButton: false
};

const nonLegacySlotConfig = {
    slotId: 'caja1_dsk',
    classes: '',
    hideForSubscriptor: false,
    closeButton: false
};
