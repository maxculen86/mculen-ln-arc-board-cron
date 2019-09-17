import Consumer from 'fusion:consumer';
import Context from 'fusion:context';

jest.mock(
    '../../../../../../components/private/LN/acumulado/grillaNotas/grillaNotas',
    () => 'grilla-mock'
);

import React from 'react';
import { mount } from 'enzyme';
import TestHelper from '../../../../../utils/testHelper';
import GrillaNotas from '../../../../../../components/private/LN/acumulado/grillaNotas';

describe('components - private - LN - acumulado - grillaNotas', () => {
    const globalContent = {
        _id: 'recetas'
    };
    const child = <div>Soy un child</div>;
    const component = mount(
        <GrillaNotas globalContent={globalContent}>{child}</GrillaNotas>
    );

    TestHelper.testDoNotRenderChildren(component, 'child');

    const grilla = component.find('grilla-mock');
    it('testeo que la grilla exista', () => {
        expect(grilla.is('grilla-mock')).toBe(true);
        expect(grilla.prop('sectionId')).toBe(globalContent._id);
        expect(grilla.prop('size')).toBe(30);
    });
});
