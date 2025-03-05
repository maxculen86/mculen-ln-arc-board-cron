import React from 'react';
import { render } from '@testing-library/react';
import DiagramationCard from '../../../../../components/features/LN-common/Juego/diagramationCard';
import { cardDiagramationVariant } from '../../../../../components/features/LN-common/Juego/styles';

jest.mock('../../../../../components/features/LN-common/Juego/styles', () => ({
    cardDiagramationVariant: jest.fn()
}));

const variants = {
    oneLargeFourSmall: 'grid-cols-12_m grid-rows_m gap-24 oneLargeFourSmall',
    twoHorizontal: 'grid-cols-2_m grid-col-2_m gap-24',
    fourVertical: 'grid-cols-8 grid-cols-12_sm gap-16 mb-32',
    oneHorizontalThreeVertical: 'grid-cols-12_m gap-24'
};
describe('Component - Features - LN Common - juego - DiagramationCard', () => {
    beforeEach(() => {
        cardDiagramationVariant.mockImplementation(
            ({ variant }) => variants[variant] || variants.fourVertical
        );
    });
    it('should match the snapshot', () => {
        const { asFragment } = render(
            <DiagramationCard variant="fourVertical">
                <div>Children</div>
            </DiagramationCard>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('should apply the corresponding class according to the provided variant', () => {
        const variant = 'oneLargeFourSmall';
        render(
            <DiagramationCard variant={variant}>Contenido</DiagramationCard>
        );

        expect(cardDiagramationVariant).toHaveBeenCalledWith({ variant });
    });

    it('should apply the default variant when none is provided', () => {
        render(<DiagramationCard>Contenido</DiagramationCard>);

        expect(cardDiagramationVariant).toHaveBeenCalledWith({
            variant: 'fourVertical'
        });
    });

    it.each([
        ['oneLargeFourSmall', 'oneLargeFourSmall'],
        ['twoHorizontal', 'grid-cols-2_m grid-col-2_m gap-24'],
        ['fourVertical', 'grid-cols-8 grid-cols-12_sm gap-16 mb-32'],
        ['oneHorizontalThreeVertical', 'grid-cols-12_m gap-24']
    ])(
        'should apply the correct class when the variant is %s',
        (variant, expectedClass) => {
            const { container } = render(
                <DiagramationCard variant={variant}>Contenido</DiagramationCard>
            );
            expect(container.firstChild).toHaveClass(expectedClass);
        }
    );
});
