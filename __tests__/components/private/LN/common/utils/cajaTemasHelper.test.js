import renderables1 from '../../../../../../__mocks__/data/renderables/data1';
import getRenderables from '../../../../../../__mocks__/data/renderables/banners/dynamicBannersRenderables';

import {
    getChildrenFromAperturaHome,
    hastVariant,
    validateoutItem
} from '../../../../../../components/private/LN/common/utils/cajaTemasHelper';
import getChildrenFromSectionHome from '../../../../../../components/private/LN/common/utils/cajaTemasHelperLN10-WebApi';

describe('cajaTemasHelper functions', () => {
    const childProps = [
        { name: 'x', variants: { color: 'red' } },
        { name: 'y' },
        { name: 'z', variants: { fontSize: '16px' } }
    ];

    it('hastVariant returns false when childProps is an empty array', () => {
        const result = hastVariant([]);
        expect(result).toBe(false);
    });

    it('hastVariant returns false when childProps do not contain any element with variants', () => {
        const childProps = [{ name: 'x' }, { name: 'y' }, { name: 'z' }];
        const result = hastVariant(childProps);
        expect(result).toBe(false);
    });

    it('hastVariant returns true when childProps contain at least one element with variants', () => {
        const result = hastVariant(childProps);
        expect(result).toBe(true);
    });

    it('getChildrenFromSectionHome with no renderables', () => {
        const result = getChildrenFromSectionHome();
        expect(result).toHaveLength(0);
    });

    it('getChildrenFromAperturaHome returns the children when there is a variant', () => {
        const result = getChildrenFromAperturaHome(renderables1, childProps);
        expect(result).toHaveLength(1);
    });

    it('getChildrenFromAperturaHome returns the children when there is no variant', () => {
        const childProps = [{ name: 'x' }, { name: 'y' }, { name: 'z' }];

        const result = getChildrenFromAperturaHome(renderables1, childProps);
        expect(result).toHaveLength(3);
    });

    it('validateoutItem returns false for url containing "/video/"', () => {
        const itemNota = {
            url_nota: 'https://example.com/video/123'
        };

        const result = validateoutItem(itemNota);
        expect(result).toBe(false);
    });

    it('validateoutItem returns true for url not containing "/video/"', () => {
        const itemNota = {
            url_nota: 'https://example.com/article/123'
        };

        const result = validateoutItem(itemNota);
        expect(result).toBe(true);
    });
});

describe('cajaTemas webApi', () => {
    it('getChildrenFromSectionHome', () => {
        const result = getChildrenFromSectionHome(getRenderables(), 'Bomba', 2);
        expect(result).toHaveLength(2);
    });
});
