import React from 'react';
import { render } from 'enzyme';
import DateHeader from '../../../../../components/private/LN/nota/apertura/dateHeader';

describe('features - LaNacion - Nota - DateHeader', () => {
    const props = {
        date: '26 de julio de 2019',
        time: '19:12'
    };
    const component = render(<DateHeader {...props} />);
    it('Test de snapshot DateHeader', () => {
        expect(component).toMatchSnapshot();
    });
});
