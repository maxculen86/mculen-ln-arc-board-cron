jest.mock(
    '../../../components/chains/Ln_Caja_Manual/Ln_Caja_Manual_json',
    () => 'mock-component'
);
import article1 from '../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';
import article2 from '../../../../__mocks__/data/articles/3SHTRO3NKBCN7L3JITCDQYSJLM.json';
import article3 from '../../../../__mocks__/data/articles/3THDAILWTVHARHBYA5AEVL7OAU.json';
import React from 'react';
import { mount } from 'enzyme';
import CajaManual from '../../../components/chains/Ln_Caja_Manual/Ln_Caja_Manual_json';

describe('Test del Chain - CajaManual', () => {
    const hideCaja = false;
    const hideTitle = true;
    const initialPosition = 1;
    const layout = 'focalLeft3';
    const chapita = 'Chapa Custom Field';
    const propMock = {};
    const customFields = {
        hideTitle,
        initialPosition,
        layout
    };

    const children = [];
    children.push(article1);
    children.push(article2);
    children.push(article3);

    const component = mount(
        <CajaManual
            customFields={{ hideTitle, initialPosition, layout }}
            childrens={[...children]}
        ></CajaManual>
    );

    const mock = component.find('mock-component');
    it('Montaje del componente', () => {
        expect(mock.length).toBe(1);
    });

    it('Recibe customFields', () => {
        expect(mock.props('customFields').customFields).toEqual(customFields);
    });

    it('Recibe articulos', () => {
        expect(mock.props('childrens').childrens).toEqual(children);
    });
    it('Recibe de customFields el campo obligatorio hideTitle', () => {
        expect(mock.props('customFields').customFields.hideTitle).toBeTruthy();
        expect(mock.props('customFields').customFields.hideTitle).toBe(true);
    });

    it('Recibe de customFields el campo obligatorio initialPosition', () => {
        expect(mock.props('customFields').customFields.initialPosition).toBe(1);
    });
    it('Recibe de customFields el campo obligatorio layout', () => {
        expect(mock.props('customFields').customFields.layout).toBeTruthy();
        expect(mock.props('customFields').customFields.layout).toBe(layout);
    });
});
