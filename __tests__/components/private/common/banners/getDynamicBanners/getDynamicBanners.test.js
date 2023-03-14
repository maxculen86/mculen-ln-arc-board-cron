import React from 'react';
import DivBannerSSR from '../../../../../../components/private/common/banners/DivBannerSSR';
import getDynamicBanners from '../../../../../../components/private/common/banners/dynamicBanners/getDynamicBanners';
import getRenderables from '../../../../../../__mocks__/data/renderables/banners/dynamicBannersRenderables';
describe('Components -  Chains - Utils - DynamicBanner', () => {
    it('should return dynamic banners mobile', () => {
        expect(
            getDynamicBanners({
                renderables: getRenderables(),
                featureId: 'c0fGd77HYFVoaAh'
            })
        ).toStrictEqual({
            bannerMob: (
                <DivBannerSSR
                    bannerConfiguration={{
                        isStatic: true,
                        lazyClass: 'lazy',
                        slotId: 'caja3_mob',
                        withoutHide: true
                    }}
                />
            ),
            bannerDsk: false
        });
    });
    it('should return dynamic banners dsk', () => {
        expect(
            getDynamicBanners({
                renderables: getRenderables(),
                featureId: 'c0f95SICwdxY3BP'
            })
        ).toStrictEqual({
            bannerMob: false,
            bannerDsk: (
                <DivBannerSSR
                    bannerConfiguration={{
                        classes: 'billboard_dsk',
                        isStatic: true,
                        lazyClass: 'lazy',
                        slotId: 'billboard_dsk',
                        withoutHide: true
                    }}
                />
            )
        });
    });
});
