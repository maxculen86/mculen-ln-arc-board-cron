import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardDetails from '../../../../../../components/private/LN/services/lotteries/CardDetails';

describe('Components - private - CardDetails =>', () => {
    it('Test snapshot and check className', () => {
        const { container } = render(<CardDetails />);
        expect(container).toMatchSnapshot();
        expect(
            container.getElementsByClassName(
                '--twoxs --font-bold ball --small --blue'
            ).length
        ).toBe(1);
    });

    it('testing components ballLoteries without params', () => {
        const { container } = render(<CardDetails />);
        expect(container).toMatchSnapshot();
        expect(
            container.getElementsByClassName('--twoxs --font-bold ball').length
        ).toBe(1);
    });
});
