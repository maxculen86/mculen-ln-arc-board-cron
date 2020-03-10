jest.mock(
    '../../../components/chains/apertura/apertura.js',
    () => 'mock-component'
);

import React from 'react';
import { mount } from 'enzyme';
import Apertura from '../../../components/chains/apertura/apertura';

describe('Test del Chain - <Apertura />', () => {
    const idCollection = 'KHDMT2RDBFD2BNJM3W6GSAAWXE';

    const directionFocal = 'FocalDerecho';

    const customFields = {
        idCollection: idCollection,
        directionFocal: directionFocal
    };

    const children = ['Primer hijo', 'Segundo hijo', 'Tercer hijo'];

    const childProps = [
        { collection: 'features', type: 'LN-home/noteFeature' },
        { collection: 'features', type: 'LN-home/noteFeature' },
        { collection: 'features', type: 'LN-home/noteFeature' }
    ];

    const component = mount(
        <Apertura
            customFields={customFields}
            children={children}
            childProps={childProps}
        ></Apertura>
    );

    const mock = component.find('mock-component');
    it('Montaje del componente', () => {
        expect(mock.length).toBe(1);
    });

    it('Recibe customFields', () => {
        expect(mock.props('customFields').customFields).toBeTruthy();
        expect(mock.props('customFields').customFields).toEqual(customFields);
    });
    it('Recibe de customFields el campo obligatorio directionFocal', () => {
        expect(
            mock.props('customFields').customFields.directionFocal
        ).toBeTruthy();
        expect(mock.props('customFields').customFields.directionFocal).toBe(
            directionFocal
        );
    });

    it('Recibe children', () => {
        expect(mock.props('children').children).toBeTruthy();
        expect(mock.props('children').children).toEqual(children);
    });

    it('Recibe childProps', () => {
        expect(mock.props('childProps').childProps).toBeTruthy();
        expect(mock.props('childProps').childProps).toEqual(childProps);
    });
});
