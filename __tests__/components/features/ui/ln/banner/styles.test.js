import { resolveBannerWrapperSlotId } from '../../../../../../components/features/ui/ln/banner/styles';

describe('resolveBannerWrapperSlotId', () => {
    describe('when the slotId is a dynamic body mobile slot', () => {
        it('should normalize caja1_mob to bodyGenericMob', () => {
            expect(resolveBannerWrapperSlotId('caja1_mob')).toBe(
                'bodyGenericMob'
            );
        });

        it('should normalize caja5_mob (beyond the old 4 limit) to bodyGenericMob', () => {
            expect(resolveBannerWrapperSlotId('caja5_mob')).toBe(
                'bodyGenericMob'
            );
        });

        it('should normalize a high index caja20_mob to bodyGenericMob', () => {
            expect(resolveBannerWrapperSlotId('caja20_mob')).toBe(
                'bodyGenericMob'
            );
        });
    });

    describe('when the slotId is a dynamic body desktop slot', () => {
        it('should normalize cinturon1_dsk to bodyGenericDsk', () => {
            expect(resolveBannerWrapperSlotId('cinturon1_dsk')).toBe(
                'bodyGenericDsk'
            );
        });

        it('should normalize cinturon5_dsk (beyond the old 4 limit) to bodyGenericDsk', () => {
            expect(resolveBannerWrapperSlotId('cinturon5_dsk')).toBe(
                'bodyGenericDsk'
            );
        });
    });

    describe('when the slotId has its own explicit variant', () => {
        it('should return cabezal_dsk unchanged', () => {
            expect(resolveBannerWrapperSlotId('cabezal_dsk')).toBe(
                'cabezal_dsk'
            );
        });

        it('should return cabezal_tab unchanged', () => {
            expect(resolveBannerWrapperSlotId('cabezal_tab')).toBe(
                'cabezal_tab'
            );
        });

        it('should return sticky2_mob unchanged', () => {
            expect(resolveBannerWrapperSlotId('sticky2_mob')).toBe(
                'sticky2_mob'
            );
        });
    });

    describe('when the slotId does not match the dynamic body pattern', () => {
        it('should return an unrelated slotId unchanged', () => {
            expect(resolveBannerWrapperSlotId('comercial_mob')).toBe(
                'comercial_mob'
            );
        });

        it('should return a body prefixed elementId unchanged', () => {
            expect(resolveBannerWrapperSlotId('body_caja5_mob')).toBe(
                'body_caja5_mob'
            );
        });

        it('should not match caja without a device suffix', () => {
            expect(resolveBannerWrapperSlotId('caja5')).toBe('caja5');
        });
    });

    describe('when the slotId is empty or missing', () => {
        it('should return an empty string when called without arguments', () => {
            expect(resolveBannerWrapperSlotId()).toBe('');
        });

        it('should return an empty string when given an empty string', () => {
            expect(resolveBannerWrapperSlotId('')).toBe('');
        });
    });
});
