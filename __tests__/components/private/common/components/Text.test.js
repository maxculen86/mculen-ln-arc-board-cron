import React from 'react';
import { render, mount } from 'enzyme';
import Text from '../../../../../components/private/common/components/Text';

describe('Prueba de componente Text', () => {
    const children = 'Este es un texto';
    const tag = 'h1';
    const font = '--font-Sueca';
    const size = '--3xs';
    const component = mount(
        <Text children={children} tag={tag} font={font} size={size} />
    );
    test('Render del componente', () => {
        expect(component.length).toEqual(1);
    });
    test('Espero que venga contenido', () => {
        expect(children || text).toBeDefined();
    });
    test('Espero que el componente "Text" traiga su propiedad "tag".', () => {
        expect(tag).toBeDefined();
    });
    test('Busco la Clase para comparar contenido', () => {
        expect(component.find('.--font-arial')).to.have.lengthOf(1);
    });
    test('Espero que la propiedad "size" traiga los tamaños con "--" delante.', () => {
        expect(size).toMatch(/--/);
    });
    test('Espero que la propiedad "weight" traiga los tamaños con "--" delante.', () => {
        expect(size).toMatch(/--/);
    });
});

describe('Component snapShot', () => {
    test('Crear componente', () => {
        const children = 'Este es un texto';
        const tag = 'h1';
        const font = '--font-sueca';
        const size = '--3xs';
        const component = render(
            <Text children={children} tag={tag} font={font} size={size} />
        );
        expect(component).toMatchSnapshot();
    });
});
