import {
    filterBanners,
    getBannerConfiguration
} from '../../../../../components/private/common/banners/lazyBannersHelper';
import getProperties from 'fusion:properties';
import {
    mockSP,
    blocksBanners,
    filteredBanners,
    caja1_dsk
} from '../../../../../__mocks__/data/banners/mockBannersData';

jest.mock('fusion:properties', () => () =>
    ({
        getProperties: () => {
            return mockSP;
        }
    }.getProperties())
);

describe('Private - Common - Banners - Lazy Banners Helper', () => {
    it('should test filterBanners function', () => {
        expect(filterBanners(blocksBanners)).toStrictEqual(filteredBanners);
    });
    it('should test a single banner with getBannerConfiguration function', () => {
        expect(
            getBannerConfiguration(
                {
                    group: 'home'
                },
                { device: 'desktop', slotId: 'caja1_dsk' }
            )
        ).toStrictEqual(caja1_dsk);
    });
});
