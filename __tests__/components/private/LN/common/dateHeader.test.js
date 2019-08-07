import React from 'react';
import { render } from 'enzyme';
import DateHeader from '../../../../../components/private/LN/common/dateHeader';

describe('features - LaNacion - Nota - DateHeader', () => {
    const component = render(
        <DateHeader display_date="2019-07-23T20:53:57.079Z" />
    );

    it('Test de snapshot DateHeader', () => {
        expect(component).toMatchSnapshot();
    });
});
