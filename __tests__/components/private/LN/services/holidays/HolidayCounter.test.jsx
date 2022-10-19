import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import HolidaysCounter from '../../../../../../components/private/LN/services/holidays/HolidaysCounter';

describe('components - private - holidays - HolidaysCounter', () => {
    it('snapshot HolidaysCounter', () => {
        const { container } = render(
            <HolidaysCounter
                nextHoliday={8}
                month="Enero"
                remainingDays={5}
                description="Día de la Inmaculada Concepción de María."
                typeHoliday="inamovibles"
            />
        );
        expect(container).toMatchSnapshot();
    });
});
