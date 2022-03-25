import React from 'react';
import LotteryDetailOpening from '../../../../../components/features/LN-services/lotteryDetailOpening/default';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock(
    '../../../../../components/private/common/staticValidation.jsx',
    () => 'mock-static-validation'
);

describe('Features - LN-servicios - LN Loteria Detalle =>', () => {
    const { container } = render(<LotteryDetailOpening id="QWERTYUIOP" />);
    const StaticValidation = container.querySelector('mock-static-validation');
    /* it('should be wrapped by StaticValidation component', () => {
        expect(
            screen.getByText(
                (content, element) =>
                    element.tagName.toLowerCase() === 'mock-static-validation'
            )
        ).toBeVisible();
    });
    it('should return a list of lotteries', () => {
        expect(
            StaticValidation.getElementsByClassName('lottery-detail-box').length
        ).toBe(1);
        expect(StaticValidation.firstChild.textContent).toBe(
            'Apertura Detalle Lotería'
        );
    }); */
    it('should ', () => {});
});
