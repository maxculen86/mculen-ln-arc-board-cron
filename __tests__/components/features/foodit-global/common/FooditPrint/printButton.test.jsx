import React from 'react';
import { PrintButton } from '../../../../../../components/features/foodit-global/common/PrintButton/foodit';
import { render, screen, fireEvent } from '@testing-library/react';
import useGetUserConfig from '../../../../../../components/features/foodit-global/hooks/useGetUserConfig';

jest.mock(
    '../../../../../../components/features/foodit-global/hooks/useGetUserConfig',
    () => jest.fn()
);

describe('PrintButton', () => {
    it('should render the PrintButton component if user is subscribed', () => {
        useGetUserConfig.mockReturnValue({ isSubscribed: true });
        render(
            <PrintButton
                type="print"
                description="Imprimir"
                IconButton={<span>Icon</span>}
                article={{ content_elements: [] }}
            />
        );
        expect(screen.getByText('IMPRIMIR')).toBeInTheDocument();
        expect(screen.getByText('Opciones de impresión')).toBeInTheDocument();
    });

    it('should toggle the includePhotos state when checkbox is clicked', () => {
        render(
            <PrintButton
                type="print"
                description="Imprimir"
                IconButton={<span>Icon</span>}
                article={{ content_elements: [] }}
            />
        );

        const checkbox = screen.getByLabelText('Incluir fotos');
        expect(checkbox).not.toBeChecked();

        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });

    it('should add the "none" class when shouldRenderPrint is true', () => {
        render(
            <PrintButton
                type="print"
                description="Imprimir"
                IconButton={<span>Icon</span>}
                article={{ content_elements: [] }}
            />
        );

        const dropdownToggle = screen.getByTitle('Imprimir');
        fireEvent.click(dropdownToggle);

        expect(screen.queryByTestId('foodit-print')).not.toBeInTheDocument();

        const printButton = screen.getByText('IMPRIMIR');
        fireEvent.click(printButton);

        const printContainer = screen.getByTestId('foodit-print').parentElement;
        expect(printContainer).toHaveClass('none');
    });
});
