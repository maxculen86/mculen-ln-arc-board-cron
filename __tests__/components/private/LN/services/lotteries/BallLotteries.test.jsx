import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import BallLotteries from '../../../../../../components/private/LN/services/lotteries/BallLotteries';

describe('Components - private - BallLotteries =>', () => {
    it('Test snapshot and check className', () => {
        const { container } = render(
            <BallLotteries number="3" color="blue" size="small" />
        );
        expect(container).toMatchSnapshot();
        expect(
            container.getElementsByClassName(
                '--twoxs --font-bold ball --small --blue'
            ).length
        ).toBe(1);
    });

    it('testing components ballLoteries without params', () => {
        const { container } = render(<BallLotteries />);
        expect(container).toMatchSnapshot();
        expect(
            container.getElementsByClassName('--twoxs --font-bold ball').length
        ).toBe(1);
    });
});
