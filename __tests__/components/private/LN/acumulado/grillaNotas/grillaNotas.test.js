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
    const globalContentSection = {
        _id: 'recetas'
    };
    const child = <div>Soy un child</div>;
    const componentSection = mount(
        <GrillaNotas globalContent={globalContentSection} size={30}>
            {child}
        </GrillaNotas>
    );

    TestHelper.testDoNotRenderChildren(componentSection, 'child');

    const grillaSection = componentSection.find('grilla-mock');
    it('testeo que la grilla de section exista', () => {
        expect(grillaSection.is('grilla-mock')).toBe(true);
        expect(grillaSection.prop('sectionId')).toBe(globalContentSection._id);
        expect(grillaSection.prop('size')).toBe(30);
    });

    const globalContentAuthor = {
        _id: 'emilse-pizarro',
        author_type: 'Estandar'
    };
    const componentAuthor = mount(
        <GrillaNotas globalContent={globalContentAuthor} size={30}>
            {child}
        </GrillaNotas>
    );

    TestHelper.testDoNotRenderChildren(componentAuthor, 'child');

    const grillaAuthor = componentAuthor.find('grilla-mock');
    it('testeo que la grilla de autor exista', () => {
        expect(grillaAuthor.is('grilla-mock')).toBe(true);
        expect(grillaAuthor.prop('authorId')).toBe(globalContentAuthor._id);
        expect(grillaAuthor.prop('size')).toBe(30);
    });
});
