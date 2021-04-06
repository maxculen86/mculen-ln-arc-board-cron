jest.mock(
    '../../../components/chains/cajaManual/cajaManual',
    () => 'mock-component'
);

import React from 'react';
import { mount } from 'enzyme';
import CajaManual from '../../../components/chains/cajaManual/cajaManual';

describe('Test del Chain - <CajaManual />', () => {
    const idCollection = 'KHDMT2RDBFD2BNJM3W6GSAAWXE';
    const title = 'Caja Tema';
    const notesQuantity = '3 Notas';
    const hideCaja = false;
    const layout = 'grilla3';
    const propMock = {};
    const customFields = {
        hideCaja,
        layout
    };

    const childProps = [
        { collection: 'features', type: 'LN-common/articulo' },
        { collection: 'features', type: 'LN-common/articulo' },
        { collection: 'features', type: 'LN-common/articulo' }
    ];
    propMock.customFields = customFields;
    propMock.childProps = childProps;
    propMock.title = title;

    const component = mount(
        <CajaManual customFields={customFields}></CajaManual>
    );

    const mock = component.find('mock-component');
    it('Montaje del componente', () => {
        expect(mock.length).toBe(1);
    });

    it('Recibe customFields', () => {
        expect(mock.props('customFields').customFields).toBeTruthy();
        expect(mock.props('customFields').customFields).toEqual(customFields);
    });

    it('Recibe de customFields el campo obligatorio idCollection', () => {
        expect(mock.props('customFields').customFields.hideCaja).toBeFalsy();
        expect(mock.props('customFields').customFields.hideCaja).toBe(false);
    });

    it('Recibe de customFields el campo obligatorio notesQuantity', () => {
        expect(mock.props('customFields').customFields.layout).toBeTruthy();
        expect(mock.props('customFields').customFields.layout).toBe(layout);
    });
});
