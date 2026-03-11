import '@testing-library/jest-dom';
import {
    customFloatingButtonConfig,
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

    it('should return null if the layout is foodit menu semanal', () => {
        const layout = 'Foodit-menu-semanal';
        expect(getConfigByLayout(layout)).toEqual({});
    });

    it('config should have the expected structure', () => {
        const layout = 'Foodit-home';
        const config = floatingButtonConfig[layout];

        expect(config).toHaveProperty('observerSelector');
        expect(config).toHaveProperty('className');
        expect(config).toHaveProperty('buttons');
        expect(config.buttons).toBeInstanceOf(Array);
    });

    it('should return empty object if the layout is not set in the config', () => {
        const layout = 'Layout desconocido';

        expect(getConfigByLayout(layout)).toEqual({});
    });
});

describe('FloatingGroupButton getCustomConfigByLayout helper', () => {
    it('config should have the expected structure', () => {
        const layout = 'Foodit-compras';
        const config = customFloatingButtonConfig[layout]();

        expect(config).toHaveProperty('observerSelector');
        expect(config).toHaveProperty('className');
        expect(config).toHaveProperty('buttons');
        expect(config.buttons).toBeInstanceOf(Array);

        const [{ onClick, title, children }] = config.buttons;

        expect(onClick).toBeInstanceOf(Function);
        expect(title).toBe('Copiar todo');
        expect(children).toHaveProperty(
            '$$typeof',
            Symbol.for('react.transitional.element')
        );
    });

    it('should return empty object if the layout is not set in the config', () => {
        const layout = 'Layout desconocido';

        expect(getConfigByLayout(layout)).toEqual({});
    });
});
