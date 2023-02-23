import React from 'react';
import { getStickyBanner } from '../../../../../components/private/common/banners/bannersRules';
describe('Private - Common - Banners - bannerRules', () => {
    it('should test getStickyBanner with megatop banner and cabezal', () => {
        expect(
            getStickyBanner(
                '.ln-banner-container.--megatop_dsk.--megatop',
                'div[data-section="pre-apertura"]'
            ).props.dangerouslySetInnerHTML.__html
        ).toContain(
            `const banner = document.querySelector('.ln-banner-container.--megatop_dsk.--megatop') || {};`
        );
    });
    it('should test getStickyBanner with cabezal', () => {
        expect(
            getStickyBanner('.--cabezal_dsk', '.lay-sidebar', 'header').props
                .dangerouslySetInnerHTML.__html
        ).toContain(
            `const banner = document.querySelector('.--cabezal_dsk') || {};`
        );
    });
});

const script = ``;
