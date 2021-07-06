import React from 'react';
import { render, mount } from 'enzyme';
import Text from '../../../../../components/private/common/components/Text';

describe('Prueba de componente Text', () => {
    const children = 'Este es un texto';
    const tag = 'h1';
    const _font = 'arial';
    const _size = '3xs';
    const _weight = 'bold';
    const expectedFont = [_font];
    const expectedSize = [_size];
    const expectedWeight = [_weight];
    const component = mount(<Text />);
    test('Render del componente', () => {
        expect(component.length).toEqual(1);
    });
    test('Espero que venga contenido', () => {
        expect(children || text).toBeDefined();
    });
    test('Espero que el componente "Text" traiga su propiedad "tag".', () => {
        expect(tag).toBeDefined();
    });

    it('Espero que la prop "_font" contenga una de las 3 tipografías', () => {
        expect(['suecas', 'arial', 'georgia']).toEqual(
            expect.arrayContaining(expectedFont)
        );
    });

    it('Espero que la prop "_weight" contenga una de las 6 medidas', () => {
        expect([
            '6xs',
            '5xs',
            '4xs',
            '3xs',
            '2xs',
            'xs',
            's',
            'm',
            'l',
            'xl',
            '2xl'
        ]).toEqual(expect.arrayContaining(expectedSize));
    });

    it('Espero que la prop "_weight" contenga una de las 6 medidas', () => {
        expect(['thin', 'light', 'regular', 'medium', 'bold', 'black']).toEqual(
            expect.arrayContaining(expectedWeight)
        );
    });
});

describe('Component snapShot', () => {
    test('Crear componente', () => {
        const children = 'Este es un texto';
        const tag = 'h1';
        const _font = '--sueca';
        const _size = '--threexs';
        const _weight = '--font-bold';
        const component = render(
            <Text
                children={children}
                tag={tag}
                font={_font}
                size={_size}
                weight={_weight}
            />
        );
        expect(component).toMatchSnapshot();
    });
});
