import React from 'react';
import { render } from '@testing-library/react';
import RenderManualBox from '../../../../../../components/chains/foodit-global/common/RenderManualBox/foodit';
import { LAYOUTS } from '../../../../../../components/chains/foodit-global/common/utils/helper-WebApi';

const generateCards = num => {
    return Array.from({ length: num }, (_, index) => (
        <div key={index}>Card {index + 1}</div>
    ));
};

describe('RenderManualBox', () => {
    it('should render a single card when layout is BN_FOCAL_1 with 1 card', () => {
        const cards = generateCards(1);

        const { container } = render(
            <RenderManualBox layout={LAYOUTS.BN_FOCAL_1} cards={cards} />
        );

        expect(container).toMatchSnapshot();
    });

    it('should render the cards inside a grid layout when layout is BN_2_GRID with 2 cards', () => {
        const cards = generateCards(2);

        const { container } = render(
            <RenderManualBox layout={LAYOUTS.BN_2_GRID} cards={cards} />
        );

        const gridContainer = container.querySelector('div.grid');

        expect(gridContainer).toBeInTheDocument();
        expect(gridContainer).toHaveClass(
            'grid-cols-8',
            'grid-cols-12_md',
            'grid-cols-16_lg',
            'gap-32'
        );
        expect(gridContainer.children).toHaveLength(cards.length);
    });

    it('should render FocalOnePlusFour component correctly with 5 cards for layout BN_FOCAL_1_MAS_4', () => {
        const cards = generateCards(5);

        const { container } = render(
            <RenderManualBox layout={LAYOUTS.BN_FOCAL_1_MAS_4} cards={cards} />
        );

        const section = container.querySelector('section.flex');

        expect(section).toBeInTheDocument();

        const firstGroup = section.querySelectorAll(
            'div.col-span-6_md.col-span-8_lg'
        )[0];
        expect(firstGroup.children).toHaveLength(1);

        const secondGroup = section.querySelectorAll(
            'div.col-span-6_md.col-span-8_lg'
        )[1];
        expect(secondGroup.children).toHaveLength(2);

        const [firstChild, secondChild] = secondGroup.children;
        expect(firstChild.children).toHaveLength(2);
        expect(secondChild.children).toHaveLength(2);
    });
});
