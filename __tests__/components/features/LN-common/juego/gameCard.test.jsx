import React from 'react';
import { render } from '@testing-library/react';
import GameCard from '../../../../../components/features/LN-common/Juego/gameCard';

describe('Component - Features - LN Common - juego - GameCard', () => {
    it('should match the snapshot', () => {
        const restProps = {
            title: 'Criptograma',
            logo: { src: '/pf/assets/games/criptograma.svg' },
            borderColor: 'bg-criptograma',
            href: '/juegos/criptograma/'
        };

        const { asFragment } = render(
            <GameCard
                forSubscriber={false}
                newGame={false}
                isHomeGames={false}
                {...restProps}
            />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
