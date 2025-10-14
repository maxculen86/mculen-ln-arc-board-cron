import { bannerConfigurations } from './config/bannerConfigurations';
import { generateBannersObject } from './utils/bannerRenderer';
import { legacyBanners } from './config/legacyBanners';

const migratedBanners = generateBannersObject(bannerConfigurations);

const bannersHome = {
    ...legacyBanners,
    ...migratedBanners
};

export default bannersHome;
