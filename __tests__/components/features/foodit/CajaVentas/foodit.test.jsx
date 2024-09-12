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

describe('HtmlFeature Component', () => {
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
});
