import React from 'react';
import LotteryMeanings from '../../../../../components/features/LN-services/lotteryMeanings/default';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock(
    '../../../../../components/private/common/staticValidation.jsx',
    () => 'mock-static-validation'
);
jest.mock(
    '../../../../../components/private/common/mod-headerSection.jsx',
    () => 'mock-mod-header-section'
);

describe('Features - LN-servicios - LN Loteria Significado de Números =>', () => {
    const { container } = render(<LotteryMeanings id="QWERTYUIOP" />);
    const StaticValidation = container.querySelector('mock-static-validation');
    /* it('should be wrapped by StaticValidation component', () => {
        expect(
            screen.getByText(
                (content, element) =>
                    element.tagName.toLowerCase() === 'mock-static-validation'
            )
        ).toBeVisible();
    });
    it('should return a list of topics about number meanings', () => {
        expect(
            StaticValidation.getElementsByClassName('number-meanings-box')
                .length
        ).toBe(1);
        expect(StaticValidation.firstChild.children.length).toBe(4);
    }); */
    it('should', () => {});
});
