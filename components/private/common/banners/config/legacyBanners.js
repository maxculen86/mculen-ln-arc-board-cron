/**
 * BANNERS PENDIENTES DE MIGRACIÓN
 *
 * Este archivo contiene todos los banners que AÚN NO han sido migrados
 * al nuevo sistema de configuración declarativa.
 *
 * MIGRADOS (3/43):
 *    - megatopDsk
 *    - comercialDsk
 *    - adhesionDsk
 *
 * PENDIENTES (40/43):
 *    - Todos los demás listados abajo
 *
 * INSTRUCCIONES:
 * - Cuando migres un banner, elimínalo de aquí
 * - Agrégalo a config/bannerConfigurations.js
 * - Verifica que funcione correctamente
 */

import React from 'react';
import DivBannerSSR from '../DivBannerSSR';

const logoNone = '--logo none';

export const legacyBanners = {
    // Pendiente: billboard
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
    // Pendiente: cabezal
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

    // Pendiente: b1x1
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

    // Pendiente: comercialMob
    comercialMob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'comercial_mob',
                classes: '--comercial none',
                closeButton: true
            }}
        />
    ),

    // Pendiente: sticky2Mob
    sticky2Mob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'sticky2_mob',
                classes: '--sticky2_mob --sticky',
                isStatic: true
            }}
        />
    ),

    // Pendiente: caja1Mob
    caja1Mob: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'caja1_mob',
                withoutHide: true,
                isStatic: true
            }}
        />
    ),

    // Pendiente: caja2Mob
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

    // Pendiente: caja3Mob
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

    // Pendiente: caja4Mob
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

    // Pendiente: caja5Mob
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

    // Pendiente: caja6Mob
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

    // Pendiente: caja7Mob
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

    // Pendiente: caja8Mob
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

    // Pendiente: caja9Mob
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

    // Pendiente: caja1Tab
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

    // Pendiente: caja2Tab
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

    // Pendiente: caja1Dsk
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

    // Pendiente: cajaProducto1Dsk
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

    // Pendiente: caja2Dsk
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

    // Pendiente: middle1Tab
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

    // Pendiente: cinturonDsk
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

    // Pendiente: cinturon2Dsk
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

    // Pendiente: cinturon3Dsk
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

    // Pendiente: cinturon4Dsk
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

    // Pendiente: middle2Tab
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

    // Pendiente: caja3Dsk
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

    // Pendiente: cajaProducto2Dsk
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

    // Pendiente: caja4Dsk
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

    // Pendiente: caja3Tab
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

    // Pendiente: caja4Tab
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

    // Pendiente: megalateralDsk
    megalateralDsk: (
        <DivBannerSSR
            bannerConfiguration={{
                slotId: 'megalateral_dsk',
                classes: '--megalateral_dsk --sticky',
                isStatic: true
            }}
        />
    ),

    // Pendiente: megalateral2Dsk
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

    // Pendiente: megalateral3Dsk
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

    // Pendiente: megalateral4Dsk
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

    // Pendiente: megalateral5Dsk
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

    // Pendiente: adhesionMob
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

    // Pendiente: adhesionTab
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

    // Pendiente: suscriptor
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

    // Pendiente: logoHeader
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
