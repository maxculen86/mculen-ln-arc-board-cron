import React from 'react';
import LotteryMeanings from '../../../../../components/features/LN-services/lotteryMeanings/default';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock(
    '../../../../../components/private/common/mod-headerSection.jsx',
    () => 'mock-mod-header-section'
);

describe('Features - LN-servicios - LN Loteria Significado de Números =>', () => {
    it('should return a list of topics about number meanings', () => {
        const { container } = render(<LotteryMeanings id="QWERTYUIOP" />);
        const list = container.getElementsByTagName('h2');
        expect(list.length).toBe(4);
    });
    it('snapshot test', () => {
        const { container } = render(<LotteryMeanings id="QWERTYUIOP" />);
        expect(container).toMatchSnapshot();
    });
});
