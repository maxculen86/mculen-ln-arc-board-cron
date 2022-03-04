import React from 'react';
import LotteryGrid from '../../../../../components/features/LN-services/lotteryGrid/default';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock(
    '../../../../../components/private/common/staticValidation.jsx',
    () => 'mock-static-validation'
);

describe('Features - LN-servicios - LN Loteria Apertura Home=>', () => {
    const { container } = render(<LotteryGrid id="QWERTYUIOP" />);
    const StaticValidation = container.querySelector('mock-static-validation');
    it('should be wrapped by StaticValidation component', () => {
        expect(
            screen.getByText(
                (content, element) =>
                    element.tagName.toLowerCase() === 'mock-static-validation'
            )
        ).toBeVisible();
    });
    it('should return a list of lotteries', () => {
        expect(
            StaticValidation.getElementsByClassName('lottery-box').length
        ).toBe(1);
        expect(StaticValidation.firstChild.children.length).toBe(16);
    });
});
