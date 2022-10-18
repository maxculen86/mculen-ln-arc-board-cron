import React from 'react';
import DivBannerSSR from '../../../../../components/private/common/banners/DivBannerSSR';
import { render } from '@testing-library/react';

describe('Private - Common - Banners - Div Banners SSR', () => {
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
