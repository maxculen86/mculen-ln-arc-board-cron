import bannerConfigType, {
    resolveDynamicBodyBanners,
    resolvePageBuilderBodyBanners,
    resolvePageBuilderGrillaBanners
} from '../../../../../../components/private/common/banners/helpers/loadBannersSSRHelper';
import { getDynamicSlotIdsByDevice } from '../../../../../../components/private/common/banners/utils/getDynamicSlotIdsByDevice';
import { getLiveblogDynamicSlotIdsByDevice } from '../../../../../../components/private/common/banners/liveblogEditorial/config';
import {
    LIVEBLOG_EDITORIAL,
    OPINION
} from '../../../../../../components/private/common/utils/subtypes/subtypeHelper';

jest.mock(
    '../../../../../../components/private/common/banners/utils/getDynamicSlotIdsByDevice'
);
jest.mock(
    '../../../../../../components/private/common/banners/liveblogEditorial/config',
    () => ({
        getLiveblogDynamicSlotIdsByDevice: jest.fn()
    })
);

describe('Banner resolvers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('resolveDynamicBodyBanners', () => {
        it('adds valid dynamic banners present in the DOM and not already in body', () => {
            getDynamicSlotIdsByDevice.mockReturnValue([
                'cinturon1_dsk',
                'cinturon2_dsk'
            ]);

            const bannersInBody = ['cinturon1_dsk'];

            resolveDynamicBodyBanners({
                device: 'desktop',
                bannersToLoadFromDOM: [
                    { opt_div: 'cinturon1_dsk' },
                    { opt_div: 'cinturon2_dsk' },
                    { opt_div: 'other_banner' }
                ],
                bannersInBody
            });

            expect(bannersInBody).toEqual(['cinturon1_dsk', 'cinturon2_dsk']);
        });

        it('passes subtype to dynamic slot resolver and applies subtype slot limits', () => {
            getDynamicSlotIdsByDevice.mockReturnValue([
                'cinturon1_dsk',
                'cinturon2_dsk',
                'cinturon3_dsk',
                'cinturon4_dsk'
            ]);

            const bannersInBody = [];

            resolveDynamicBodyBanners({
                device: 'desktop',
                subtype: OPINION,
                bannersToLoadFromDOM: [
                    { opt_div: 'cinturon1_dsk' },
                    { opt_div: 'cinturon2_dsk' },
                    { opt_div: 'cinturon3_dsk' },
                    { opt_div: 'cinturon4_dsk' },
                    { opt_div: 'cinturon5_dsk' }
                ],
                bannersInBody
            });

            expect(getDynamicSlotIdsByDevice).toHaveBeenCalledWith({
                device: 'desktop',
                subtype: OPINION,
                layout: undefined
            });
            expect(bannersInBody).toEqual([
                'cinturon1_dsk',
                'cinturon2_dsk',
                'cinturon3_dsk',
                'cinturon4_dsk'
            ]);
        });

        it('uses liveblog slot resolver when subtype is liveblog editorial', () => {
            getLiveblogDynamicSlotIdsByDevice.mockReturnValue([
                'middle_1_dsk',
                'middle_2_dsk'
            ]);

            const bannersInBody = [];

            resolveDynamicBodyBanners({
                device: 'desktop',
                subtype: LIVEBLOG_EDITORIAL,
                bannersToLoadFromDOM: [
                    { opt_div: 'middle_1_dsk' },
                    { opt_div: 'middle_2_dsk' },
                    { opt_div: 'cinturon1_dsk' }
                ],
                bannersInBody
            });

            expect(getLiveblogDynamicSlotIdsByDevice).toHaveBeenCalledWith(
                'desktop'
            );
            expect(getDynamicSlotIdsByDevice).not.toHaveBeenCalled();
            expect(bannersInBody).toEqual(['middle_1_dsk', 'middle_2_dsk']);
        });

        it('adds dynamic body banners present in the DOM when layout has no max limit', () => {
            getDynamicSlotIdsByDevice.mockReturnValue([]);

            const bannersInBody = [];

            resolveDynamicBodyBanners({
                device: 'desktop',
                bannersToLoadFromDOM: [
                    { opt_div: 'body_cinturon1_dsk' },
                    { opt_div: 'body_cinturon5_dsk' },
                    { opt_div: 'body_caja5_mob' },
                    { opt_div: 'other_banner' }
                ],
                bannersInBody
            });

            expect(bannersInBody).toEqual([
                'body_cinturon1_dsk',
                'body_cinturon5_dsk'
            ]);
        });

        it('does nothing when there are no dynamic slots for the device', () => {
            getDynamicSlotIdsByDevice.mockReturnValue([]);

            const bannersInBody = [];

            resolveDynamicBodyBanners({
                device: 'tablet',
                bannersToLoadFromDOM: [{ opt_div: 'body_cinturon1_dsk' }],
                bannersInBody
            });

            expect(bannersInBody).toEqual([]);
        });
    });

    describe('resolvePageBuilderBodyBanners', () => {
        it('adds PageBuilder body banners that match device, suffix and DOM', () => {
            const bannersInBody = [];

            resolvePageBuilderBodyBanners({
                bannerInPB: {
                    desktop_1: 'cuerpo1_dsk',
                    desktop_2: 'cuerpo2_dsk',
                    mobile_1: 'cuerpo1_mob'
                },
                device: 'desktop',
                suffix: '_dsk',
                bannersToLoadFromDOM: {
                    0: { opt_div: 'cuerpo1_dsk' },
                    1: { opt_div: 'cuerpo2_dsk' }
                },
                bannersInBody
            });

            expect(bannersInBody).toEqual(['cuerpo1_dsk', 'cuerpo2_dsk']);
        });

        it('does not duplicate banners already present in body', () => {
            const bannersInBody = ['cuerpo1_dsk'];

            resolvePageBuilderBodyBanners({
                bannerInPB: {
                    desktop_1: 'cuerpo1_dsk'
                },
                device: 'desktop',
                suffix: '_dsk',
                bannersToLoadFromDOM: {
                    0: { opt_div: 'cuerpo1_dsk' }
                },
                bannersInBody
            });

            expect(bannersInBody).toEqual(['cuerpo1_dsk']);
        });
    });

    describe('resolvePageBuilderGrillaBanners', () => {
        it('adds grid banners configured in PageBuilder', () => {
            const bannersInGrillaNotas = [];

            resolvePageBuilderGrillaBanners({
                bannerInPB: {
                    desktop_1: 'grilla1_dsk'
                },
                device: 'desktop',
                suffix: '_dsk',
                bannersToLoadFromDOM: {
                    0: { opt_div: 'grilla1_dsk' }
                },
                bannersInGrillaNotas
            });

            expect(bannersInGrillaNotas).toEqual(['grilla1_dsk']);
        });
    });
});

describe('bannerConfigType (dispatcher)', () => {
    it('executes resolveDynamicBodyBanners when LN/DS-Body matches', () => {
        getDynamicSlotIdsByDevice.mockReturnValue(['cinturon1_dsk']);

        const bannersInBody = [];

        bannerConfigType({
            bannerConfig: { type: 'LN/DS-Body' },
            slotGroup: 'nota',
            device: 'desktop',
            bannersToLoadFromDOM: [{ opt_div: 'cinturon1_dsk' }],
            bannersInBody
        });

        expect(bannersInBody).toEqual(['cinturon1_dsk']);
    });

    it('executes resolveDynamicBodyBanners for mobile DS-Body even when first DOM slot group is not nota', () => {
        getDynamicSlotIdsByDevice.mockReturnValue([]);

        const bannersInBody = [];

        bannerConfigType({
            bannerConfig: { type: 'LN/DS-Body' },
            slotGroup: 'header',
            device: 'mobile',
            subtype: OPINION,
            layout: 'LN-Nota-Opinion',
            bannersToLoadFromDOM: [
                { opt_div: 'body_caja1_mob' },
                { opt_div: 'body_caja5_mob' },
                { opt_div: 'body_cinturon5_dsk' }
            ],
            bannersInBody
        });

        expect(bannersInBody).toEqual(['body_caja1_mob', 'body_caja5_mob']);
    });

    it('executes resolveDynamicBodyBanners when liveblog body type matches', () => {
        getLiveblogDynamicSlotIdsByDevice.mockReturnValue(['middle_1_dsk']);

        const bannersInBody = [];

        bannerConfigType({
            bannerConfig: { type: 'LN-nota/liveblogEditorialBody' },
            slotGroup: 'nota',
            device: 'desktop',
            subtype: LIVEBLOG_EDITORIAL,
            bannersToLoadFromDOM: [{ opt_div: 'middle_1_dsk' }],
            bannersInBody
        });

        expect(getLiveblogDynamicSlotIdsByDevice).toHaveBeenCalledWith(
            'desktop'
        );
        expect(bannersInBody).toEqual(['middle_1_dsk']);
    });

    it('executes resolvePageBuilderBodyBanners when note body type matches', () => {
        const bannersInBody = [];

        bannerConfigType({
            bannerConfig: { type: 'LN-nota/body' },
            slotGroup: 'nota',
            bannerInPB: {
                desktop_1: 'cuerpo1_dsk'
            },
            device: 'desktop',
            suffix: '_dsk',
            bannersToLoadFromDOM: {
                0: { opt_div: 'cuerpo1_dsk' }
            },
            bannersInBody
        });

        expect(bannersInBody).toEqual(['cuerpo1_dsk']);
    });

    it('executes resolvePageBuilderGrillaBanners when grid type matches', () => {
        const bannersInGrillaNotas = [];

        bannerConfigType({
            bannerConfig: { type: 'LN-acumulado/grillaNotas' },
            slotGroup: 'acumulado',
            bannerInPB: {
                desktop_1: 'grilla1_dsk'
            },
            device: 'desktop',
            suffix: '_dsk',
            bannersToLoadFromDOM: {
                0: { opt_div: 'grilla1_dsk' }
            },
            bannersInGrillaNotas
        });

        expect(bannersInGrillaNotas).toEqual(['grilla1_dsk']);
    });

    it('does not execute any resolver when no match is found', () => {
        const bannersInBody = [];

        bannerConfigType({
            bannerConfig: { type: 'other-type' },
            slotGroup: 'nota',
            bannersInBody
        });

        expect(bannersInBody).toEqual([]);
    });
});
