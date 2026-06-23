import { getDynamicSlotIdsByDevice } from '../../../../../../components/private/common/banners/utils/getDynamicSlotIdsByDevice';
import { OPINION } from '../../../../../../components/private/common/utils/subtypes/subtypeHelper';

const MAX_DYNAMIC_BANNERS = 5;

jest.mock(
    '../../../../../../components/private/LN/common/utils/bannerHelper',
    () => ({
        suffixDevice: {
            desktop: '_dsk',
            mobile: '_mob'
        }
    })
);

describe('getDynamicSlotIdsByDevice', () => {
    it('returns desktop dynamic slot ids', () => {
        const result = getDynamicSlotIdsByDevice({ device: 'desktop' });

        expect(result).toEqual(
            Array.from(
                { length: MAX_DYNAMIC_BANNERS },
                (_, i) => `cinturon${i + 1}_dsk`
            )
        );
    });

    it('returns mobile dynamic slot ids', () => {
        const result = getDynamicSlotIdsByDevice({ device: 'mobile' });

        expect(result).toEqual(
            Array.from(
                { length: MAX_DYNAMIC_BANNERS },
                (_, i) => `caja${i + 1}_mob`
            )
        );
    });

    it('returns an empty list for opinion layout without max banner limit', () => {
        const result = getDynamicSlotIdsByDevice({
            device: 'desktop',
            subtype: OPINION,
            layout: 'LN-Nota-Opinion'
        });

        expect(result).toEqual([]);
    });

    it('returns an empty array for unsupported device', () => {
        expect(getDynamicSlotIdsByDevice({ device: 'tablet' })).toEqual([]);
        expect(getDynamicSlotIdsByDevice({ device: undefined })).toEqual([]);
        expect(getDynamicSlotIdsByDevice({ device: null })).toEqual([]);
    });

    it('respects MAX_DYNAMIC_BANNERS limit', () => {
        const result = getDynamicSlotIdsByDevice({ device: 'desktop' });

        expect(result).toHaveLength(MAX_DYNAMIC_BANNERS);
    });
});
