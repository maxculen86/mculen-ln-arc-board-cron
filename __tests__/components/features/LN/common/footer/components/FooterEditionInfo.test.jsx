import React from 'react';
import { render, screen } from '@testing-library/react';
import { FooterEditionInfo } from '../../../../../../../components/features/LN/common/footer/components/FooterEditionInfo';

describe('FooterEditionInfo', () => {
    const mockEditionDetails = {
        edNumber: 10000,
        edDate: {
            date: '30 de enero de 2026',
            year: '2026'
        }
    };

    it('should render edition details', () => {
        render(<FooterEditionInfo editionDetails={mockEditionDetails} />);

        expect(screen.getByText(/Fernán Saguier/i)).toBeInTheDocument();
        expect(screen.getByText(/30 de enero de 2026/i)).toBeInTheDocument();
        expect(screen.getByText(/10000/i)).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(
            <FooterEditionInfo editionDetails={mockEditionDetails} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
