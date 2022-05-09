import buildBodyCustomFields from '../../../../../../components/features/LN-nota/body/_utils/_buildBodyCustomFields';
import {
    BANNERS_DESKTOP,
    BANNERS_MOBILE,
    BANNERS_TABLET
} from '../../../../../../components/private/LN/common/utils/bannerHelper';

describe('buildBodyCustomFields', () => {
    it('deberia construir los custom fields de banners correctamente', () => {
        const customFields = buildBodyCustomFields();
        expect(customFields).toBeTruthy();
        expect(customFields).toHaveProperty('desktop1.type', 'oneOf');
        expect(customFields).toHaveProperty('desktop1.args', BANNERS_DESKTOP);
        expect(customFields).toHaveProperty('desktop1.tags', {
            label: 'desktop',
            defaultValue: '',
            group: 'Banner 1'
        });

        expect(customFields).toHaveProperty('mobile15.type', 'oneOf');
        expect(customFields).toHaveProperty('mobile15.args', BANNERS_MOBILE);
        expect(customFields).toHaveProperty('mobile15.tags', {
            label: 'mobile',
            defaultValue: '',
            group: 'Banner 15'
        });

        expect(customFields).toHaveProperty('tablet14.type', 'oneOf');
        expect(customFields).toHaveProperty('tablet14.args', BANNERS_TABLET);
        expect(customFields).toHaveProperty('tablet14.tags', {
            label: 'tablet',
            defaultValue: '',
            group: 'Banner 14'
        });

        expect(customFields).toHaveProperty('sticky13.type', 'bool');
        expect(customFields).toHaveProperty('sticky13.tags', {
            label: 'sticky',
            defaultValue: false,
            group: 'Banner 13'
        });

        expect(customFields).toHaveProperty('position12.type', 'number');
        expect(customFields).toHaveProperty('position12.tags', {
            label: 'position',
            defaultValue: 0,
            max: 20,
            min: 0,
            group: 'Banner 12'
        });

        expect(customFields).toHaveProperty('background10.type', 'bool');
        expect(customFields).toHaveProperty('background10.tags', {
            label: 'background',
            defaultValue: false,
            group: 'Banner 10'
        });
    });
});
