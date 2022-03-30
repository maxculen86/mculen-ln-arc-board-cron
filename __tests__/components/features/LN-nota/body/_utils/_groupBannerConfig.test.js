import groupBannerConfig from '../../../../../../components/features/LN-nota/body/_utils/_groupBannerConfig';

describe('groupBannerConfig', () => {
    it('deberia agrupar los banners del customField en un array', () => {
        const customFields = {
            desktop1: 'middle_1_dsk',
            position1: 3,
            sticky1: true,
            desktop2: 'middle_2_dsk',
            position2: 6,
            desktop3: 'caja1_amp',
            position3: 3,
            desktop4: 'caja2_amp',
            position4: 5,
            mobile5: 'caja1_mob',
            position5: 1,
            mobile6: 'caja2_mob',
            position6: 4,
            background6: true,
            mobile7: 'caja3_mob',
            position7: 7,
            mobile8: 'caja4_mob',
            position8: 9,
            mobile9: 'caja5_mob',
            position9: 11
        };

        const resultBanners = [
            { desktop: 'middle_1_dsk', position: 3, sticky: true },
            { desktop: 'middle_2_dsk', position: 6 },
            { desktop: 'caja1_amp', position: 3 },
            { desktop: 'caja2_amp', position: 5 },
            { mobile: 'caja1_mob', position: 1 },
            { mobile: 'caja2_mob', position: 4, background: true },
            { mobile: 'caja3_mob', position: 7 },
            { mobile: 'caja4_mob', position: 9 },
            { mobile: 'caja5_mob', position: 11 }
        ];

        const banners1 = groupBannerConfig(customFields);
        expect(banners1).toBeTruthy();
        expect(banners1).toEqual(resultBanners);

        const banners2 = groupBannerConfig(undefined);
        expect(banners2).toEqual([]);

        const banners3 = groupBannerConfig({});
        expect(banners3).toEqual([]);
    });
});
