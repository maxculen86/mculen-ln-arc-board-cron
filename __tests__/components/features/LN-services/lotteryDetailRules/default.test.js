import React from 'react';
import Context from 'fusion:context';
import LotteryDetailRules from '../../../../../components/features/LN-services/lotteryDetailRules/default';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('../../../../../__mocks__/fusion:static', () => 'static');
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
    const Static = container.querySelector('static');

    it('should be wrapped by StaticContent component', () => {
        expect(
            screen.getByText(
                (content, element) => element.tagName.toLowerCase() === 'static'
            )
        ).toBeVisible();
    });

    it('should return a list of lotteries', () => {
        expect(Static.getElementsByClassName('lottery-rules-box').length).toBe(
            1
        );
        expect(Static.firstChild.children.length).toBe(2);
    });
});
