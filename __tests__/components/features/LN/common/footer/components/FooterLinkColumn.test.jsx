import React from 'react';
import { render, screen } from '@testing-library/react';
import { FooterLinkColumn } from '../../../../../../../components/features/LN/common/footer/components/FooterLinkColumn';

jest.mock(
    '../../../../../../../components/features/ui/ln/link/default',
    () =>
        ({ children, ...props }) => <a {...props}>{children}</a>
);

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar',
    SITIO_SEGURO_REGISTRACION: 'https://micuenta.lanacion.com.ar'
}));

describe('FooterLinkColumn', () => {
    const mockItems = [
        {
            id: 'item1',
            text: 'Economía',
            href: '/economia/',
            target: '_self',
            type: 'SITE_LANACION'
        },
        {
            id: 'item2',
            text: 'Deportes',
            href: '/deportes/',
            target: '_self',
            type: 'SITE_LANACION'
        }
    ];

    it('should render title and items', () => {
        render(<FooterLinkColumn title="Secciones" items={mockItems} />);

        expect(screen.getByText('Secciones')).toBeInTheDocument();
        expect(screen.getByText('Economía')).toBeInTheDocument();
        expect(screen.getByText('Deportes')).toBeInTheDocument();
    });

    it('should return null when items is empty or undefined', () => {
        const { container } = render(
            <FooterLinkColumn title="Secciones" items={[]} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('should match snapshot', () => {
        const { container } = render(
            <FooterLinkColumn title="Secciones" items={mockItems} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
