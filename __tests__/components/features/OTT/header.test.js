import React from 'react';
import { mount } from 'enzyme';
import Header from '../../../../components/features/OTT/header';

describe('private - common - containers - button', () => {
    const cf = { description1: 'description text 1', href1: 'href1' };
    const component = mount(<Header customFields={cf} />);
    it('Testeo que pase al componente los items recibidos por el container', () => {
        expect(component.prop('customFields')).toEqual(cf);
    });
});
