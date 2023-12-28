import '@testing-library/jest-dom/extend-expect';
import {
    floatingButtonConfig,
    getConfigByLayout
} from '../../../../../../components/features/foodit-global/common/floatingGroupButton/helpers';

describe('FloatingGroupButton getConfigByLayout helper', () => {
    it('getConfigByLayout should return layout config', () => {
        const layout = 'Foodit-home';
        const expectedConfig = floatingButtonConfig[layout];
        const actualConfig = getConfigByLayout(layout);
        expect(actualConfig).toEqual(expectedConfig);
    });

    it('config should have the expected structure', () => {
        const layout = 'Foodit-home';
        const config = floatingButtonConfig[layout];

        expect(config).toHaveProperty('observerSelector');
        expect(config).toHaveProperty('className');
        expect(config).toHaveProperty('buttons');
        expect(config.buttons).toBeInstanceOf(Array);
    });

    it('should return undefined if the layout is not set in the config', () => {
        const layout = 'Layout desconocido';

        expect(getConfigByLayout(layout)).toBeUndefined();
    });
});
