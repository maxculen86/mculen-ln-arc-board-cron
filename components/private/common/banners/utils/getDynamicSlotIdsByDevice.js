import { suffixDevice } from '../../../LN/common/utils/bannerHelper';
import { getDynamicBannerSettings } from '../dynamicBanners/dynamicBannersHelper';

export const createSlotIds = ({ prefix, max, suffix = '' }) =>
    Array.from({ length: max }, (_, index) => `${prefix}${index + 1}${suffix}`);

export const getDynamicSlotIdsByDevice = ({
    device,
    subtype = '',
    layout
} = {}) => {
    const suffix = suffixDevice[device];
    if (!suffix) return [];

    const base = device === 'desktop' ? 'cinturon' : 'caja';
    const { maxBanners } = getDynamicBannerSettings({ subtype, layout });
    if (maxBanners === undefined) return [];

    return createSlotIds({ prefix: base, max: maxBanners, suffix });
};
