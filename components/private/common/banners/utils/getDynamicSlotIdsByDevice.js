import { suffixDevice } from '../../../LN/common/utils/bannerHelper';
import { getDynamicBannerSettingsBySubtype } from '../dynamicBanners/dynamicBannersHelper';

export const createSlotIds = ({ prefix, max, suffix = '' }) =>
    Array.from({ length: max }, (_, index) => `${prefix}${index + 1}${suffix}`);

export const getDynamicSlotIdsByDevice = (device, subtype = '') => {
    const suffix = suffixDevice[device];
    if (!suffix) return [];

    const base = device === 'desktop' ? 'cinturon' : 'caja';
    const { maxBanners } = getDynamicBannerSettingsBySubtype(subtype);

    return createSlotIds({ prefix: base, max: maxBanners, suffix });
};
