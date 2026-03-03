import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Distributor from '../../../../../../components/features/LN/DS-Signature/components/Distributor';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

jest.mock(
    '../../../../../../components/private/LN/common/utils/formatDistributorName',
    () => jest.fn(name => name.toLowerCase().replace(/\s+/g, '-'))
);

jest.mock('../../../../../../components/features/ui/ln/link/default', () =>
    jest.fn(({ href, title, children }) => (
        <a href={href} title={title} data-testid="link-ui">
            {children}
        </a>
    ))
);

describe('components - features - LN - DS-Signature - Distributor', () => {
    const baseProps = {
        name: 'REUTERS',
        mode: 'default',
        subcategory: [],
        shouldShowDistributor: true
    };

    it('returns null when shouldShowDistributor is false', () => {
        const { container } = render(
            <Distributor {...baseProps} shouldShowDistributor={false} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('renders plain span (no link) when name is LA NACION', () => {
        render(<Distributor {...baseProps} name="LA NACION" />);
        expect(screen.getByText('LA NACION')).toBeInTheDocument();
        expect(screen.queryByTestId('link-ui')).not.toBeInTheDocument();
    });

    it('renders plain span (no link) when mode is custom', () => {
        render(<Distributor {...baseProps} mode="custom" />);
        expect(screen.getByText('REUTERS')).toBeInTheDocument();
        expect(screen.queryByTestId('link-ui')).not.toBeInTheDocument();
    });

    it('renders LinkUI when name is not LA NACION and mode is not custom', () => {
        render(<Distributor {...baseProps} />);
        const link = screen.getByTestId('link-ui');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute(
            'href',
            'https://www.lanacion.com.ar/distributor/reuters/'
        );
        expect(link).toHaveAttribute('title', 'REUTERS');
    });

    it('renders subcategory when subcategory has items and name is EL PAIS', () => {
        render(
            <Distributor
                {...baseProps}
                name="EL PAIS"
                subcategory="Internacional"
            />
        );
        expect(screen.getByText('Internacional')).toBeInTheDocument();
    });

    it('does not render subcategory when subcategory is empty', () => {
        render(<Distributor {...baseProps} name="EL PAIS" subcategory="" />);
        expect(screen.queryByText('Internacional')).not.toBeInTheDocument();
    });

    it('does not render subcategory when name is not EL PAIS', () => {
        render(
            <Distributor
                {...baseProps}
                name="REUTERS"
                subcategory="Internacional"
            />
        );
        expect(screen.queryByText('Internacional')).not.toBeInTheDocument();
    });
});
