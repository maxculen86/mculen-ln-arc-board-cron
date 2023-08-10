import React from 'react';
import Context from 'fusion:context';
import LotteryDetailRules from '../../../../../components/features/LN-services/lotteryDetailRules/default';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock(
    '../../../../../components/private/common/staticContent.jsx',
    () => 'mock-static-content'
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
    const StaticContent = container.querySelector('mock-static-content');
    it('should be wrapped by StaticContent component', () => {
        expect(
            screen.getByText(
                (content, element) =>
                    element.tagName.toLowerCase() === 'mock-static-content'
            )
        ).toBeVisible();
    });
    it('should return a list of lotteries', () => {
        expect(
            StaticContent.getElementsByClassName('lottery-rules-box').length
        ).toBe(1);
        expect(StaticContent.firstChild.children.length).toBe(2);
    });
});
