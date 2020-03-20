jest.mock(
    './../../../../../../../../components/private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage.jsx',
    () => 'mock-component'
);

import React from 'react';
import { mount } from 'enzyme';
import PageBuilderMessage from './../../../../../../../../components/private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage.jsx';

describe('Test del componente - <PageBuilderMessage />', () => {
    const type = 'danger';
    const message = 'Este es un mensaje de error';

    const component = mount(
        <PageBuilderMessage type={type} message={message} />
    );

    const mock = component.find('mock-component');
    it('Montaje del componente', () => {
        expect(mock.length).toBe(1);
    });
    it('Recibe type', () => {
        expect(mock.props('type')).toBeTruthy();
        expect(mock.props('type').type).toEqual(type);
    });
    it('Recibe message', () => {
        expect(mock.props('message')).toBeTruthy();
        expect(mock.props('message').message).toEqual(message);
    });
});
