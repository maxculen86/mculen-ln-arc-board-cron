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
    });
});
