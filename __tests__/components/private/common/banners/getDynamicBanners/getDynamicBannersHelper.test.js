import React from 'react';
import DivBannerSSR from '../../../../../../components/private/common/banners/DivBannerSSR';
import {
    validateInterval,
    hasBomba,
    validateBanner,
    getSectionId
} from '../../../../../../components/private/common/banners/dynamicBanners/getDynamicBannersHelper';
import renderables from '../../../../../../__mocks__/data/renderables/banners/dynamicBannersRenderables.json';
describe('Components - Private - Common - Banners - getDynamicBannersHelper', () => {
    it('should test validateInterval func', () => {
        expect(validateInterval(2, 0)).toStrictEqual(false);
        expect(validateInterval(2, 1)).toStrictEqual(true);
        expect(validateInterval(2, 2)).toStrictEqual(false);
        expect(validateInterval(3, 0)).toStrictEqual(false);
        expect(validateInterval(3, 1)).toStrictEqual(false);
        expect(validateInterval(3, 2)).toStrictEqual(true);
    });
    it('should test hasBomba func', () => {
        expect(hasBomba(renderables)).toStrictEqual(true);
        expect(hasBomba([])).toStrictEqual(undefined);
    });
    it('should test getSectionId func', () => {
        expect(getSectionId(renderables, 'f0fS1oFDXlHk93q')).toStrictEqual(1);
    });
    it('should test validateBanner func', () => {
        expect(
            validateBanner(
                1,
                renderables,
                '',
                {
                    position: 2,
                    max: 8,
                    min: 4,
                    bannersMob: ['caja3Mob', 'caja4Mob', 'caja5Mob'],
                    bannersDsk: ['billboard'],
                    intervalMob: 2,
                    intervalDsk: 3
                },
                0,
                true
            )
        ).toStrictEqual(
            <DivBannerSSR
                bannerConfiguration={{
                    isStatic: true,
                    lazyClass: 'lazy',
                    slotId: 'caja3_mob',
                    withoutHide: true
                }}
            />
        );
        expect(
            validateBanner(
                2,
                renderables,
                '',
                {
                    position: 2,
                    max: 8,
                    min: 4,
                    bannersMob: ['caja3Mob', 'caja4Mob', 'caja5Mob'],
                    bannersDsk: ['billboard'],
                    intervalMob: 2,
                    intervalDsk: 3
                },
                0
            )
        ).toStrictEqual(
            <DivBannerSSR
                bannerConfiguration={{
                    isStatic: true,
                    lazyClass: 'lazy',
                    slotId: 'billboard_dsk',
                    withoutHide: true
                }}
            />
        );
        expect(
            validateBanner(
                1,
                renderables,
                'Apertura',
                {
                    position: 1,
                    bannersMob: ['caja1Mob'],
                    intervalMob: 2
                },
                0,
                true
            )
        ).toStrictEqual(false);
    });
});
