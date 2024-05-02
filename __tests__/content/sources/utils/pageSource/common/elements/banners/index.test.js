import 'regenerator-runtime/runtime';
import * as banners from '../../../../../../../../content/sources/utils/pageSource/common/elements/banners/index';
import layoutLN10 from '../../../../../../../../__mocks__/data/pages/layouts/LN10-Home_Main.json';

describe('Test Methods Banners sources-utils-pageSource-common-elements-banners-index.js ', () => {
    test('setBannersBySection Ok', () => {
        const elements = Object.assign([], layoutLN10.content_elements);
        const pageWithBannersbySection = banners.setBannersBySection(
            elements,
            'LN10-Home_Main'
        );
        const objBanner = {
            id: 502,
            type: 1,
            sectionAliasMobile: 'Banner',
            position: 'bottom',
            sectionWeb: 'Apertura'
        };
        expect(pageWithBannersbySection.length).toEqual(33);
        expect(pageWithBannersbySection[3]).toEqual(
            expect.objectContaining(objBanner)
        );
    });

    test('setBannersBySection without param LayoutName', () => {
        try {
            const elements = Object.assign([], layoutLN10.content_elements);
            const pageWithBannersbySection = banners.setBannersBySection(
                elements,
                null
            );
        } catch (error) {
            expect(error.message).toMatch(
                'Cannot convert undefined or null to object'
            );
        }
    });

    test('setBannersByConfig Ok', () => {
        const elements = Object.assign([], layoutLN10.content_elements);
        const pageWithBannersbyConfig = banners.setBannersByConfig(
            elements,
            'LN10-Home_Main'
        );
        expect(pageWithBannersbyConfig.length).toEqual(37);
        expect(pageWithBannersbyConfig[2].id).toBe(402);
        expect(pageWithBannersbyConfig[4].id).toBe(403);
        expect(pageWithBannersbyConfig[7].id).toBe(404);
        expect(pageWithBannersbyConfig[9].id).toBe(405);
        expect(pageWithBannersbyConfig[11].id).toBe(406);
    });

    test('setBannersByConfig without param LayoutName', () => {
        try {
            const elements = Object.assign([], layoutLN10.content_elements);
            const pageWithBannersbySection = banners.setBannersByConfig(
                elements,
                null
            );
        } catch (error) {
            expect(error.message).toMatch(
                "Cannot read properties of undefined (reading '0')"
            );
        }
    });
});
