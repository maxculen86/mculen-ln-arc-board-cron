import React from 'react';
import DivBannerSSR from '../../../../../../components/private/common/banners/DivBannerSSR';
import {
    validateInterval,
    hasBomba,
    validateBanner,
    getSectionId,
    filterChildrenWithNoRoof
} from '../../../../../../components/private/common/banners/dynamicBanners/getDynamicBannersHelper';
import getRenderables from '../../../../../../__mocks__/data/renderables/banners/dynamicBannersRenderables';
import { getViewport } from '../../../../../../components/private/LN/common/utils/homeHelper';
import getChildrenFromSectionHome from '../../../../../../components/private/LN/common/utils/cajaTemasHelperLN10-WebApi';

jest.mock(
    '../../../../../../components/private/LN/common/utils/homeHelper',
    () => ({
        ...jest.requireActual(
            '../../../../../../components/private/LN/common/utils/homeHelper'
        ),
        getViewport: jest.fn()
    })
);

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
        expect(hasBomba(getRenderables())).toStrictEqual(true);
        expect(hasBomba(getRenderables(true))).toStrictEqual(undefined);
        expect(hasBomba([])).toStrictEqual(undefined);
    });
    it('should test getSectionId func', () => {
        expect(getSectionId(getRenderables(), 'f0fS1oFDXlHk93q')).toStrictEqual(
            1
        );
    });
    it('should test validateBanner func', () => {
        expect(
            validateBanner(
                1,
                getRenderables(),
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
                getRenderables(),
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
                    classes: 'billboard_dsk',
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
                getRenderables(),
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
    it('should test filterChildrenWithNoRoof', () => {
        getViewport.mockReturnValueOnce({
            device: 'mobile'
        });
        expect(filterChildrenWithNoRoof(getRenderables())).toStrictEqual(
            getRenderables()
        );
        getViewport.mockReturnValueOnce({
            device: 'desktop'
        });
        expect(
            filterChildrenWithNoRoof(
                getChildrenFromSectionHome(getRenderables(), 'Breaking_1', '3')
            )
        ).toStrictEqual(elementWithoutHideTitle);
    });
});

const elementWithoutHideTitle = [
    {
        children: [
            {
                collection: 'features',
                props: {
                    collection: 'features',
                    contentConfig: {
                        contentConfigValues: {},
                        contentService: '',
                        inherit: true
                    },
                    customFields: {
                        layout: 'grillaVideo1',
                        noteId: 'TZB4LFHEQVAANDWWQOH5FPJUBY'
                    },
                    displayProperties: {},
                    id: 'f0fM09sKP3loaEU',
                    localEdits: {},
                    name: null,
                    type: 'LN-common/articulo',
                    variants: {}
                },
                type: 'LN-common/articulo'
            }
        ],
        collection: 'chains',
        props: {
            collection: 'chains',
            customFields: {
                hideTitle: false,
                idCollection: '',
                imageId: '',
                initialPosition: 1,
                layout: 'grillaVideo1',
                title: 'Multimedia',
                url: ''
            },
            displayProperties: {},
            id: 'c0f33MAKOxlDyp',
            name: null,
            type: 'Ln_Caja_Manual'
        },
        type: 'Ln_Caja_Manual'
    },
    {
        collection: 'features',
        props: {
            collection: 'features',
            contentConfig: {
                contentConfigValues: {},
                contentService: '',
                inherit: true
            },
            customFields: {
                heightDesktop: 174,
                heightMobile: 236,
                heightTablet: 174,
                hideByUrl: true,
                html:
                    '<style>iframe.iframe_anexoAnuario21{height:390px}@media(max-width:850px){iframe.iframe_anexoAnuario21{height:360px}}@media(max-width:700px){iframe.iframe_anexoAnuario21{height:345px}}@media(max-width:650px){iframe.iframe_anexoAnuario21{height:535px}}@media(max-width:550px){iframe.iframe_anexoAnuario21{height:840px}}@media(max-width:450px){iframe.iframe_anexoAnuario21{height:770px}}@media(max-width:400px){iframe.iframe_anexoAnuario21{height:745px}}@media(max-width:350px){iframe.iframe_anexoAnuario21{height:690px}}</style> <iframe class="iframe_anexoAnuario21" frameborder="0" width="100%" height="390" scrolling="no" src="https://especialess3.lanacion.com.ar/21/11/anexo-anuario-2021/"></iframe>',
                url:
                    'https://especialess3.lanacion.com.ar/interactivos/22/08/anexos-calculadora-mundial-2022-v07/?v=13'
            },
            displayProperties: {},
            id: 'f0f7L1jCKXiv19v',
            localEdits: {},
            name: null,
            type: 'LN-common/anexo',
            variants: {}
        },
        type: 'LN-common/anexo'
    }
];
