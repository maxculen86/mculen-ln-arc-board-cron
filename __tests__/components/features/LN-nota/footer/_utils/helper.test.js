import React from 'react';
import { render, screen } from '@testing-library/react';
import getSignatureRenderOptions from '../../../../../../components/features/LN-nota/footer/_utils/helper';

jest.mock(
    '../../../../../../components/private/common/com-partner',
    () =>
        ({ children }) => <span>{children}</span>
);
jest.mock('@ln/contenidos-ui-text', () => ({
    Text: ({ children, ...rest }) => (
        <strong data-testid="text-component" {...rest}>
            {children}
        </strong>
    )
}));
jest.mock(
    '../../../../../../components/private/common/com-link',
    () =>
        ({ link, children }) => <a href={link}>{children}</a>
);

describe('components - feature - LN-nota - footer - _utils - helper ', () => {
    describe('getSignatureRenderOptions', () => {
        it('renders correct content when isHtmlLibre is true', () => {
            const options = getSignatureRenderOptions({
                isHtmlLibre: true,
                name: 'Distributor'
            });

            expect(options[0].shouldRender).toBe(true);
            const { container } = render(options[0].signatureContent);
            expect(container.textContent).toBe('Distributor');
        });

        it('renders LA NACION recetas when isReceta is true and hasAuthor is false', () => {
            const options = getSignatureRenderOptions({
                isReceta: true,
                hasAuthor: false
            });

            expect(options[1].shouldRender).toBe(true);
            const { container } = render(options[1].signatureContent);
            expect(container.textContent).toBe('Por LA NACION recetas');
        });

        it('renders Text when isLaNacion is true', () => {
            const options = getSignatureRenderOptions({
                isLaNacion: true,
                withFirmaDistributor: false,
                name: 'name'
            });

            expect(options[2].shouldRender).toBe(true);
            const { getByTestId } = render(options[2].signatureContent);

            const textComponent = getByTestId('text-component');
            expect(textComponent.textContent).toBe('name');
        });

        it('renders ComLink when isCustomDistributor is false and isLaNacion is false', () => {
            const options = getSignatureRenderOptions({
                isCustomDistributor: false,
                isLaNacion: false,
                withFirmaDistributor: false,
                name: 'xinhua'
            });

            expect(options[2].shouldRender).toBe(true);
            const { container } = render(options[2].signatureContent);
            expect(container.textContent).toBe('xinhua');
        });

        it('does not render when withFirmaDistributor is true', () => {
            const options = getSignatureRenderOptions({
                isCustomDistributor: true,
                withFirmaDistributor: true,
                name: 'custom'
            });

            expect(options[2].shouldRender).toBe(false);
        });

        it('renders subcategory label when name is "EL PAIS" and subcategory is provided', () => {
            const options = getSignatureRenderOptions({
                isCustomDistributor: false,
                isLaNacion: false,
                withFirmaDistributor: false,
                name: 'EL PAIS',
                subcategory: 'Internacional'
            });

            expect(options[2].shouldRender).toBe(true);
            render(options[2].signatureContent);
            const link = screen.getByRole('link', { name: /EL PAIS/i });
            expect(link).toBeInTheDocument();
            expect(screen.getByText('Internacional')).toBeInTheDocument();
        });
    });
});
