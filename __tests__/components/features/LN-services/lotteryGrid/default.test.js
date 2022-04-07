import React from 'react';
import Context from 'fusion:context';
import LotteryGrid from '../../../../../components/features/LN-services/lotteryGrid/default';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import gridLotteries from '../../../../../__mocks__/data/lottery/gridLotteries.json';

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
            lotteries: gridLotteries
        }
    }
}));

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
            StaticValidation.getElementsByClassName('header-lotteries').length
        ).toBe(12);
        expect(StaticValidation.firstChild.children.length).toBe(12);
    });
});
