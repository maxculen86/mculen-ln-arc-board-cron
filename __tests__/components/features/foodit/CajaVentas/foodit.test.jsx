import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useGetUserConfig from '../../../../../components/features/foodit-global/hooks/useGetUserConfig';
import HtmlFeature from '../../../../../components/features/foodit/CajaVentas/foodit';

jest.mock(
    '../../../../../components/features/foodit-global/hooks/useGetUserConfig',
    () => jest.fn()
);

jest.mock(
    '../../../../../components/features/foodit-global/common/saleBox/foodit',
    () => ({
        SaleBox: ({ id }) => <div data-testid="sale-box">SaleBox {id}</div>
    })
);

describe('Components - Features - Foodit - CajaVentas - HtmlFeature', () => {
    const mockFeatureId = 'testFeatureId';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render SaleBox when user is not subscribed', () => {
        useGetUserConfig.mockReturnValue({ isSubscribed: false });

        render(<HtmlFeature id={mockFeatureId} />);

        const saleBoxElement = screen.getByTestId('sale-box');
        expect(saleBoxElement).toBeInTheDocument();
        expect(saleBoxElement).toHaveTextContent(`SaleBox ${mockFeatureId}`);
    });

    it('should not render SaleBox when user is subscribed', () => {
        useGetUserConfig.mockReturnValue({ isSubscribed: true });

        render(<HtmlFeature id={mockFeatureId} />);

        const saleBoxElement = screen.queryByTestId('sale-box');
        expect(saleBoxElement).not.toBeInTheDocument();
    });

    it('should render SaleBox by default (before useEffect runs)', () => {
        useGetUserConfig.mockReturnValue({ isSubscribed: undefined });

        render(<HtmlFeature id={mockFeatureId} />);

        const saleBoxElement = screen.getByTestId('sale-box');
        expect(saleBoxElement).toBeInTheDocument();
        expect(saleBoxElement).toHaveTextContent(`SaleBox ${mockFeatureId}`);
    });

    it('should handle null or undefined featureId gracefully', () => {
        useGetUserConfig.mockReturnValue({ isSubscribed: false });

        render(<HtmlFeature id={undefined} />);

        const saleBoxElement = screen.getByTestId('sale-box');
        expect(saleBoxElement).toBeInTheDocument();
        expect(saleBoxElement).toHaveTextContent('SaleBox');
    });

    it('should re-render correctly when subscription status changes', () => {
        const { rerender } = render(<HtmlFeature id={mockFeatureId} />);

        useGetUserConfig.mockReturnValue({ isSubscribed: false });
        rerender(<HtmlFeature id={mockFeatureId} />);

        const saleBoxElement = screen.getByTestId('sale-box');
        expect(saleBoxElement).toBeInTheDocument();

        useGetUserConfig.mockReturnValue({ isSubscribed: true });
        rerender(<HtmlFeature id={mockFeatureId} />);

        expect(screen.queryByTestId('sale-box')).not.toBeInTheDocument();
    });
});
