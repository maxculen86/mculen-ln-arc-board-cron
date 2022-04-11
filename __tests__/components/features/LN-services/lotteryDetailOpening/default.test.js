import React from 'react';
import Context from 'fusion:context';
import LotteryDetailOpening from '../../../../../components/features/LN-services/lotteryDetailOpening/default';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import brincoExample from '../../../../../__mocks__/data/lottery/brincoExample.json';

jest.mock(
    '../../../../../components/private/common/staticValidation.jsx',
    () => 'mock-static-validation'
);

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

Context.useAppContext = jest.fn(() => ({
    globalContent: {
        dataService: {
            lotteryDetail: brincoExample
        }
    }
}));

describe('Features - LN-servicios - LN Loteria Detalle =>', () => {
    const { container } = render(<LotteryDetailOpening id="QWERTYUIOP" />);
    const StaticValidation = container.querySelector('mock-static-validation');
    it('should be wrapped by StaticValidation component', () => {
        expect(
            screen.getByText(
                (content, element) =>
                    element.tagName.toLowerCase() === 'mock-static-validation'
            )
        ).toBeVisible();
    });
    it('should return a lottery detail', () => {
        render(<LotteryDetailOpening id="QWERTYUIOP" />);
        expect(
            StaticValidation.getElementsByClassName('lottery-detail-box').length
        ).toBe(1);
        expect(StaticValidation.firstChild.textContent).toContain(
            'Últimos resultados'
        );
        expect(screen.getAllByRole('row').length).toBe(7);
        expect(screen.getByText('$73.000.000')).toBeDefined();
        expect(screen.getAllByRole('table')[0]).toHaveClass(
            'table --winners-table'
        );
    });
});
