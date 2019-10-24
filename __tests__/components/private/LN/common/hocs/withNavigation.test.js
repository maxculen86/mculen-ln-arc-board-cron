import Consumer from 'fusion:consumer';
import React from 'react';
import { mount } from 'enzyme';
import WithNavigation from '../../../../../../components/private/LN/common/hocs/WithNavigation';

describe('components - private - LN - common - hocs - withNavigation', () => {
    const sectionId = '/recetas';
    const testProps = {
        testProp: 'test'
    };
    const component = mount(
        <WithNavigation sectionId={sectionId} {...testProps} />
    );
    it('Testeo que la propiedad pasada corresponda', () => {
        expect(component.prop('testProp')).toBe(testProps.testProp);
        expect(component.prop('sectionId')).toBe(sectionId);
    });
});
