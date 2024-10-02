import React from 'react';
import { render, screen, within } from '@testing-library/react';
import TrustProject from '../../../../../../components/features/LN-10-global/common/trustProject/default';

const mockTooltipData = {
    text: 'Opinión',
    label:
        'Basada en la interpretación y juicio de hechos y datos realizados por el autor.'
};

describe('features - LN10-global - TrustProject', () => {
    it('renders correctly with all data', () => {
        const { container } = render(
            <TrustProject tooltipData={mockTooltipData} />
        );
        const sectionElement = container.querySelector('section');
        expect(sectionElement).toBeInTheDocument();
        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute(
            'src',
            'pathDeployment/contextPath/resources/images/the-trust-project.webp'
        );
        expect(img).toHaveAttribute('fetchpriority', 'low');
        expect(img).toHaveAttribute('loading', 'lazy');
        expect(screen.getByText('Conforme a')).toBeInTheDocument();
        expect(screen.getByText('los criterios de')).toBeInTheDocument();
        expect(screen.getByText('Tipo de trabajo:')).toBeInTheDocument();
        expect(
            screen.getByText(mockTooltipData.text.toLowerCase())
        ).toBeInTheDocument();
        expect(screen.getByText(mockTooltipData.label)).toBeInTheDocument();
        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute(
            'href',
            'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/'
        );
        expect(link).toHaveAttribute('title', 'Ir a Proyecto Trust');
        expect(within(link).getByText('Conocé más')).toBeInTheDocument();
    });
    it("if don't receive props, some elements are not rendered", () => {
        render(<TrustProject tooltipData={{}} />);
        expect(screen.queryByText('Tipo de trabajo:')).toBeNull();
        expect(screen.queryByText(mockTooltipData.text)).toBeNull();
        expect(screen.queryByText(mockTooltipData.label)).toBeNull();
    });
});
