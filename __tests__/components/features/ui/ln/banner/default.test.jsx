import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Banner from '../../../../../../components/features/ui/ln/banner/default';
import { createDynamicBannerConfig } from '../../../../../../components/private/common/banners/dynamicBanners/dynamicBannersHelper';

describe('components - features - ui - ln - banner', () => {
    it('renders required GPT data attributes from helper configuration', () => {
        const globalContent = {
            subtype: '3'
        };
        const bannerConfiguration = createDynamicBannerConfig(
            globalContent,
            'desktop',
            1
        );

        const { container } = render(
            <Banner bannerConfiguration={bannerConfiguration} />
        );

        const bannerDiv = container.querySelector('#cinturon1_dsk');
        expect(bannerDiv).toBeInTheDocument();
        expect(bannerDiv).toHaveAttribute('data-slot-group', 'nota');
        expect(bannerDiv).toHaveAttribute('data-device', 'desktop');
        expect(bannerDiv).toHaveAttribute(
            'data-ad-unit-path',
            '/133919216/la_nacion_desktop/Nota/cinturon1_dsk'
        );
        expect(bannerDiv).toHaveAttribute(
            'data-targeting',
            JSON.stringify({ sitio: 'lanacion', seccion: 'nota' })
        );
        expect(bannerDiv).toHaveAttribute('data-without-hide', 'true');
        expect(bannerDiv).toHaveAttribute(
            'data-size',
            JSON.stringify(bannerConfiguration.dimensions)
        );
        expect(bannerDiv).toHaveAttribute('data-sizemap', JSON.stringify([]));
        expect(bannerDiv).toHaveAttribute('data-prebid-enabled', 'true');
        expect(bannerDiv).toHaveAttribute('data-subscription', 'false');
    });
});
