import { suffixDevice } from '../../../LN/common/utils/bannerHelper';
import { MAX_DYNAMIC_BANNERS } from '../dynamicBanners/dynamicBannersHelper';

export const getDynamicSlotIdsByDevice = device => {
    const suffix = suffixDevice[device];
    if (!suffix) return [];

    const base = device === 'desktop' ? 'cinturon' : 'caja';

    return Array.from(
        { length: MAX_DYNAMIC_BANNERS },
        (_, i) => `${base}${i + 1}${suffix}`
    );
};
