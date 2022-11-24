import React from 'react';
import DivBannerSSR from './DivBannerSSR';

const bannersHome = {
    cabezal: (
        <>
            <div className="container --ads">
                <DivBannerSSR
                    bannerConfiguration={{
                        slotId: 'cabezal_dsk',
                        classes: '--dark',
                        isStatic: true
                    }}
                />
                <DivBannerSSR
                    bannerConfiguration={{
                        slotId: 'cabezal_tab',
                        classes: '--dark',
                        isStatic: true
                    }}
                />
            </div>
        </>
    ),
    b1x1: (
        <>
            <DivBannerSSR
                bannerConfiguration={{
                    slotId: '1x1_dsk',
                    hideForSubscriptor: true,
                    isStatic: true
                }}
            />
            <DivBannerSSR
                bannerConfiguration={{
                    slotId: '1x1_mob',
                    hideForSubscriptor: true,
                    isStatic: true
                }}
            />
        </>
    ),
    comercialDsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'comercial_dsk',
                classes: '--comercial hlp-none',
                closeButton: true,
                isStatic: true
            }}
        />
    ),
    comercialMob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'comercial_mob',
                classes: '--comercial hlp-none',
                closeButton: true,
                isStatic: true
            }}
        />
    ),
    sticky2Mob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'sticky2_mob',
                classes: '--sticky2_mob --sticky',
                isStatic: true
            }}
        />
    ),
    caja1Mob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja1_mob',
                withoutHide: true,
                isStatic: true
            }}
        />
    ),
    billboard: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'billboard_dsk',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    caja2Mob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja2_mob',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    caja3Mob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja3_mob',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    caja1Tab: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja1_tab',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    caja2Tab: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja2_tab',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    caja1Dsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja1_dsk',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    cajaProducto1Dsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja_producto1_dsk',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    caja2Dsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja2_dsk',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    caja4Mob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja4_mob',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    middle1Tab: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'middle1_tab',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    cinturonDsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'cinturon1_dsk',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    caja5Mob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja5_mob',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    cinturon2Dsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'cinturon2_dsk',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    middle2Tab: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'middle2_tab',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    caja3Dsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja3_dsk',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    cajaProducto2Dsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja_producto2_dsk',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    caja4Dsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja4_dsk',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    caja3Tab: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja3_tab',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    caja4Tab: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja4_tab',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    megalateralDsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'megalateral_dsk',
                classes: '--megalateral --sticky',
                isStatic: true
            }}
        />
    ),
    parallaxMob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'parallax_mob',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    parallaxDsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'parallax_dsk',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    megalateral2Dsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'megalateral2_dsk',
                classes: '--megalateral --sticky',
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    megalateral3Dsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'megalateral3_dsk',
                classes: '--megalateral --sticky',
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    adhesionDsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'adhesion_dsk',
                classes: '--adhesion_dsk --fixed --close hlp-none',
                hideForSubscriptor: true,
                closeButton: true,
                isStatic: true
            }}
        />
    ),
    adhesionMob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'adhesion_mob',
                classes: '--adhesion_mob --fixed --close hlp-none',
                hideForSubscriptor: true,
                closeButton: true,
                isStatic: true
            }}
        />
    ),
    adhesionTab: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'adhesion_tab',
                classes: '--adhesion_tab --fixed --close hlp-none',
                hideForSubscriptor: true,
                closeButton: true,
                isStatic: true
            }}
        />
    )
};

export default bannersHome;
