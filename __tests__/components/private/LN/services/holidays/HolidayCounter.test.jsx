import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import HolidaysCounter from '../../../../../../components/private/LN/services/holidays/HolidaysCounter';

describe('components - private - holidays - HolidaysCounter', () => {
    it('snapshot HolidaysCounter', () => {
        const { container } = render(<HolidaysCounter />);
        expect(container).toMatchSnapshot();
    });
});
