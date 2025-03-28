import React from 'react';
import { render, screen } from '@testing-library/react';
import TrustProject from '../../../../../../components/features/LN-nota/footer/_children/trustProject';

const tooltipData = {
    text: 'Noticia Original',
    label: 'Información basada en hechos y verificada de primera mano por el cronista, o reportada y verificada por fuentes expertas.'
};

describe('components - feature - LN-nota - footer - _children - trustProject', () => {
    it('renders correctly when valid', () => {
        const { asFragment } = render(
            <TrustProject isInvalid={false} tooltipData={tooltipData} />
        );

        expect(screen.getByAltText('The Trust Project')).toBeInTheDocument();
        expect(screen.getByText('Tipo de trabajo:')).toBeInTheDocument();
        expect(screen.getByText('noticia original')).toBeInTheDocument();

        expect(asFragment()).toMatchSnapshot();
    });

    it('does not render when isInvalid is true', () => {
        const { container } = render(
            <TrustProject isInvalid={true} tooltipData={tooltipData} />
        );
        expect(container.firstChild).toBeNull();
    });
});
