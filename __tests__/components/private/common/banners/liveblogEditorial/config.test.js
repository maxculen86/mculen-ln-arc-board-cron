import {
    getLiveblogDynamicBannersByCardPosition,
    getLiveblogDynamicSlotIdsByDevice
} from '../../../../../../components/private/common/banners/liveblogEditorial/config';

describe('private - common - banners - liveblogEditorial - config', () => {
    it('resolves liveblog dynamic slot ids by device', () => {
        expect(getLiveblogDynamicSlotIdsByDevice('desktop')).toEqual([
            'middle_1_dsk',
            'middle_2_dsk',
            'middle_3_dsk'
        ]);

        expect(getLiveblogDynamicSlotIdsByDevice('mobile')).toEqual([
            'caja1_mob',
            'caja2_mob',
            'caja3_mob',
            'caja4_mob',
            'caja5_mob'
        ]);

        expect(getLiveblogDynamicSlotIdsByDevice('tablet')).toEqual([]);
    });

    it('resolves dynamic banners by card position with liveblog rules', () => {
        expect(getLiveblogDynamicBannersByCardPosition(1)).toEqual([]);
        expect(getLiveblogDynamicBannersByCardPosition(2)).toEqual([
            {
                device: 'mobile',
                slotId: 'caja1_mob',
                showForSubscriber: true
            }
        ]);
        expect(getLiveblogDynamicBannersByCardPosition(4)).toEqual([
            {
                device: 'desktop',
                slotId: 'middle_1_dsk',
                showForSubscriber: false
            }
        ]);
        expect(getLiveblogDynamicBannersByCardPosition(6)).toEqual([
            {
                device: 'mobile',
                slotId: 'caja2_mob',
                showForSubscriber: true
            }
        ]);
        expect(getLiveblogDynamicBannersByCardPosition(8)).toEqual([
            {
                device: 'desktop',
                slotId: 'middle_2_dsk',
                showForSubscriber: false
            }
        ]);
        expect(getLiveblogDynamicBannersByCardPosition(16)).toEqual([]);
        expect(getLiveblogDynamicBannersByCardPosition(18)).toEqual([
            {
                device: 'mobile',
                slotId: 'caja5_mob',
                showForSubscriber: true
            }
        ]);
        expect(getLiveblogDynamicBannersByCardPosition(22)).toEqual([]);
        expect(getLiveblogDynamicBannersByCardPosition(-1)).toEqual([]);
    });
});
