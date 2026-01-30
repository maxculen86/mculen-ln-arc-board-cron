import React from 'react';
import { render, screen } from '@testing-library/react';
import { FooterCopyright } from '../../../../../../../components/features/LN/common/footer/components/FooterCopyright';

jest.mock(
    '../../../../../../../components/features/ui/ln/link/default',
    () =>
        ({ children, ...props }) => <a {...props}>{children}</a>
);

jest.mock(
    '../../../../../../../components/features/ui/ln/icon/default',
    () =>
        ({ children, ...props }) => <div {...props}>{children}</div>
);

describe('FooterCopyright', () => {
    const mockFooterIcons = {
        gdaXs: 'gda-icon',
        dataFiscal: 'data-fiscal-icon'
    };

    it('should render copyright text and links', () => {
        render(<FooterCopyright footerIcons={mockFooterIcons} />);

        expect(
            screen.getByText(/© Copyright 2023 SA LA NACION/i)
        ).toBeInTheDocument();
        expect(screen.getByTitle('Ir a Condiciones')).toBeInTheDocument();
        expect(screen.getByTitle('GDA')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(
            <FooterCopyright footerIcons={mockFooterIcons} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
