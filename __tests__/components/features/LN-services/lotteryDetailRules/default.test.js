import React from 'react';
import Context from 'fusion:context';
import LotteryDetailRules from '../../../../../components/features/LN-services/lotteryDetailRules/default';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

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
            lotteryDetail: [
                {
                    id: 'Quiniela_de_Cordoba'
                }
            ]
        }
    }
}));
describe('Features - LN-servicios - LN Loteria Reglas =>', () => {
    const { container } = render(<LotteryDetailRules id="QWERTYUIOP" />);
    const StaticValidation = container.querySelector('mock-static-validation');
    it('should be wrapped by StaticValidation component', () => {
        expect(
            screen.getByText(
                (content, element) =>
                    element.tagName.toLowerCase() === 'mock-static-validation'
            )
        ).toBeVisible();
    });
    /*  it('should return a list of lotteries', () => {
        expect(
            StaticValidation.getElementsByClassName('lottery-rules-box').length
        ).toBe(1);
        expect(StaticValidation.firstChild.children.length).toBe(2);
    }); */
});
