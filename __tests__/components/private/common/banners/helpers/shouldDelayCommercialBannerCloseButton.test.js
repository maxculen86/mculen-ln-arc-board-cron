import shouldDelayCommercialBannerCloseButton from '../../../../../../components/private/common/banners/helpers/shouldDelayCommercialBannerCloseButton';

describe('private - common - banners - helpers - shouldDelayCommercialBannerCloseButton', () => {
    it('returns true for lifestyle notes commercial banners', () => {
        expect(
            shouldDelayCommercialBannerCloseButton({
                slotId: 'comercial_dsk',
                requestUri: '/lifestyle/nota-prueba'
            })
        ).toBe(true);
    });

    it('returns true for lifestyle accumulated commercial banners', () => {
        expect(
            shouldDelayCommercialBannerCloseButton({
                slotId: 'comercial_mob',
                requestUri: '/lifestyle/'
            })
        ).toBe(true);
    });

    it('returns false for non lifestyle commercial banners', () => {
        expect(
            shouldDelayCommercialBannerCloseButton({
                slotId: 'comercial_dsk',
                requestUri: '/politica/'
            })
        ).toBe(false);
    });

    it('returns false for non commercial banners', () => {
        expect(
            shouldDelayCommercialBannerCloseButton({
                slotId: 'caja1_dsk',
                requestUri: '/lifestyle/'
            })
        ).toBe(false);
    });
});
