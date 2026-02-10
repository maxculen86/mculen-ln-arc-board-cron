import { getDynamicSlotIdsByDevice } from "../../../../../../components/private/common/banners/utils/getDynamicSlotIdsByDevice";


const MAX_DYNAMIC_BANNERS = 5;

jest.mock('../../../../../../components/private/LN/common/utils/bannerHelper', () => ({
    suffixDevice: {
        desktop: '_dsk',
        mobile: '_mob'
    }
}));

describe('getDynamicSlotIdsByDevice', () => {
    it('returns desktop dynamic slot ids', () => {
        const result = getDynamicSlotIdsByDevice('desktop');

        expect(result).toEqual(
            Array.from(
                { length: MAX_DYNAMIC_BANNERS },
                (_, i) => `cinturon${i + 1}_dsk`
            )
        );
    });

    it('returns mobile dynamic slot ids', () => {
        const result = getDynamicSlotIdsByDevice('mobile');

        expect(result).toEqual(
            Array.from(
                { length: MAX_DYNAMIC_BANNERS },
                (_, i) => `caja${i + 1}_mob`
            )
        );
    });

    it('returns an empty array for unsupported device', () => {
        expect(getDynamicSlotIdsByDevice('tablet')).toEqual([]);
        expect(getDynamicSlotIdsByDevice(undefined)).toEqual([]);
        expect(getDynamicSlotIdsByDevice(null)).toEqual([]);
    });

    it('respects MAX_DYNAMIC_BANNERS limit', () => {
        const result = getDynamicSlotIdsByDevice('desktop');

        expect(result).toHaveLength(MAX_DYNAMIC_BANNERS);
    });
});
