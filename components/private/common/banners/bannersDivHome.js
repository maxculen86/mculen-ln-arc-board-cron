import React from 'react';
import DivBannerSSR from './DivBannerSSR';

const logoNone = '--logo none';

const bannersHome = {
    megatopDsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'megatop_dsk',
                classes: '--megatop',
                isStatic: true
            }}
        />
    ),
    megatopTab: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'megatop_tab',
                classes: '--megatop',
                isStatic: true
            }}
        />
    ),
    cabezal: (
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
                classes: '--comercial none',
                closeButton: true
            }}
        />
    ),
    comercialMob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'comercial_mob',
                classes: '--comercial none',
                closeButton: true
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
    billboard: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'billboard_dsk',
                classes: 'billboard_dsk',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
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
    caja2Mob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja2_mob',
                classes: '--caja2_mob',
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
    caja6Mob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja6_mob',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    caja7Mob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja7_mob',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    caja8Mob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja8_mob',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    caja9Mob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja9_mob',
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
    cinturon3Dsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'cinturon3_dsk',
                withoutHide: true,
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    cinturon4Dsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'cinturon4_dsk',
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
                classes: '--megalateral_dsk --sticky',
                isStatic: true
            }}
        />
    ),
    megalateral2Dsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'megalateral2_dsk',
                classes: '--megalateral2_dsk --sticky',
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    megalateral3Dsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'megalateral3_dsk',
                classes: '--megalateral3_dsk --sticky',
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    megalateral4Dsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'megalateral4_dsk',
                classes: '--megalateral4_dsk --sticky',
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    megalateral5Dsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'megalateral5_dsk',
                classes: '--megalateral4_dsk --sticky',
                isStatic: true,
                lazyClass: 'lazy'
            }}
        />
    ),
    adhesionDsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'adhesion_dsk',
                classes: '--adhesion_dsk --fixed --close none',
                hideForSubscriptor: true,
                closeButton: true
            }}
        />
    ),
    adhesionMob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'adhesion_mob',
                classes: '--adhesion_mob --fixed --close none',
                hideForSubscriptor: true,
                closeButton: true
            }}
        />
    ),
    adhesionTab: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'adhesion_tab',
                classes: '--adhesion_tab --fixed --close none',
                hideForSubscriptor: true,
                closeButton: true
            }}
        />
    ),
    suscriptor: (
        <>
            <DivBannerSSR
                bannerConfiguration={{
                    slotId: 'cajasuscriptores_dsk',
                    isStatic: true,
                    lazyClass: 'lazy'
                }}
            />
            <DivBannerSSR
                bannerConfiguration={{
                    slotId: 'cajasuscriptores_mob',
                    isStatic: true,
                    lazyClass: 'lazy'
                }}
            />
            <DivBannerSSR
                bannerConfiguration={{
                    slotId: 'cajasuscriptores_tab',
                    isStatic: true,
                    lazyClass: 'lazy'
                }}
            />
        </>
    ),
    logoHeader: (
        <>
            <DivBannerSSR
                bannerConfiguration={{
                    classes: logoNone,
                    slotId: 'logo_header_dsk',
                    withoutHide: true
                }}
            />
            <DivBannerSSR
                bannerConfiguration={{
                    classes: '--logo --logo_sticky_dsk none',
                    slotId: 'logo_header_dsk_sticky',
                    withoutHide: true
                }}
            />
            <DivBannerSSR
                bannerConfiguration={{
                    classes: logoNone,
                    slotId: 'logo_header_tab',
                    withoutHide: true
                }}
            />
            <DivBannerSSR
                bannerConfiguration={{
                    classes: logoNone,
                    slotId: 'logo_header_mob',
                    withoutHide: true
                }}
            />
        </>
    )
};

export default bannersHome;
