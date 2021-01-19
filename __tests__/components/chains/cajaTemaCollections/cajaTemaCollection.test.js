jest.mock(
    '../../../components/chains/cajaTemaCollections.js',
    () => 'mock-component'
);

import React from 'react';
import { mount } from 'enzyme';
import CajaTemaCollections from '../../../components/chains/cajaTemaCollections.js';

describe('Test del Chain - <CajaTema />', () => {
    const idCollection = 'KHDMT2RDBFD2BNJM3W6GSAAWXE';
    const title = 'Caja Tema';
    const notesQuantity = '3 Notas';

    const customFields = {
         idCollection: 'AA',
         title: 'Titulo',
         layout: 'grilla3',
         backgroundColor: '--pink',
         initialPosition: '1',
         hideTitle: false
    };

    const childProps = [
        { collection: 'features', type: 'LN-home/noteFeature' },
        { collection: 'features', type: 'LN-home/noteFeature' },
        { collection: 'features', type: 'LN-home/noteFeature' }
    ];

    const component = mount(<CajaTemaCollections customFields={customFields}></CajaTemaCollections>);

    const mock = component.find('mock-component');
    it('Montaje del componente', () => {
        expect(mock.length).toBe(1);
    });

    it('Recibe customFields', () => {
        expect(mock.props('customFields').customFields).toBeTruthy();
        expect(mock.props('customFields').customFields).toEqual(customFields);
    });

    it('Recibe de customFields el campo obligatorio idCollection', () => {
        expect(
            mock.props('customFields').customFields.idCollection
        ).toBeTruthy();
        expect(mock.props('customFields').customFields.idCollection).toBe(
            idCollection
        );
    });

    it('Recibe de customFields el campo obligatorio notesQuantity', () => {
        expect(
            mock.props('customFields').customFields.notesQuantity
        ).toBeTruthy();
        expect(mock.props('customFields').customFields.notesQuantity).toBe(
            notesQuantity
        );
    });

    it('Recibe de customFields el campo opcional title', () => {
        expect(mock.props('customFields').customFields.title).toBeTruthy();
        expect(mock.props('customFields').customFields.title).toBe(title);
    });
});