import { suffixDevice } from '../../../LN/common/utils/bannerHelper';
import { getDynamicBannerSettingsBySubtype } from '../dynamicBanners/dynamicBannersHelper';

export const getDynamicSlotIdsByDevice = (device, subtype = '') => {
    const suffix = suffixDevice[device];
    if (!suffix) return [];

    const base = device === 'desktop' ? 'cinturon' : 'caja';
    const { maxBanners } = getDynamicBannerSettingsBySubtype(subtype);

    return Array.from(
        { length: maxBanners },
        (_, i) => `${base}${i + 1}${suffix}`
    );
};
