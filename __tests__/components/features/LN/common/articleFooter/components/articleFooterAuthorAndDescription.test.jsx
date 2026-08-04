import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthorAndDescription from '../../../../../../../components/features/LN/common/articleFooter/components/articleFooterAuthorAndDescription';

describe('AuthorAndDescription', () => {
    describe('when neither distributor nor complementaryText are provided', () => {
        it('should render null when both are undefined', () => {
            const { container } = render(<AuthorAndDescription />);

            expect(container).toBeEmptyDOMElement();
        });
    });

    describe('when both distributor and complementaryText are provided', () => {
        it('should render the distributor text', () => {
            render(
                <AuthorAndDescription
                    distributor="Distributor"
                    complementaryText="Texto complementario"
                />
            );

            expect(screen.getByText('Distributor')).toBeInTheDocument();
        });

        it('should render the complementary text', () => {
            render(
                <AuthorAndDescription
                    distributor="Distributor"
                    complementaryText="Texto complementario"
                />
            );

            expect(
                screen.getByText('Texto complementario')
            ).toBeInTheDocument();
        });
    });

    describe('when href is provided and distributorMode is not custom', () => {
        it('should render the distributor as a link', () => {
            render(
                <AuthorAndDescription
                    distributor="REUTERS"
                    href="https://www.lanacion.com.ar/distributor/reuters/"
                />
            );

            const link = screen.getByText('REUTERS');
            expect(link.tagName).toBe('A');
            expect(link).toHaveAttribute(
                'href',
                'https://www.lanacion.com.ar/distributor/reuters/'
            );
        });
    });

    describe('when distributorMode is custom', () => {
        it('should render the distributor as plain text even when href is provided', () => {
            render(
                <AuthorAndDescription
                    distributor="lanacion.ar"
                    distributorMode="custom"
                    href="https://www.lanacion.com.ar/distributor/lanacion.ar/"
                />
            );

            const distributorNode = screen.getByText('lanacion.ar');
            expect(distributorNode.tagName).toBe('SPAN');
        });
    });

    describe('when href is not provided', () => {
        it('should render the distributor as plain text', () => {
            render(<AuthorAndDescription distributor="LA NACION" />);

            const distributorNode = screen.getByText('LA NACION');
            expect(distributorNode.tagName).toBe('SPAN');
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with both props', () => {
            const { asFragment } = render(
                <AuthorAndDescription
                    distributor="Distributor"
                    complementaryText="Texto complementario"
                />
            );

            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with custom distributor mode', () => {
            const { asFragment } = render(
                <AuthorAndDescription
                    distributor="lanacion.ar"
                    distributorMode="custom"
                    complementaryText="Texto complementario"
                    href="https://www.lanacion.com.ar/distributor/lanacion.ar/"
                />
            );

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
