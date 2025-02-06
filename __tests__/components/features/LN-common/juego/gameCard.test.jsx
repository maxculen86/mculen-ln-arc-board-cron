import React from 'react';
import { render } from '@testing-library/react';
import { CardGame } from '@ln/contenidos-ui-cardgames';

describe('Component - Features - LN Common - juego - GameCard', () => {
    it('should match the snapshot', () => {
        const { asFragment } = render(
            <CardGame
                title="Criptograma"
                imageProps={{
                    alt: 'Criptograma',
                    src: '/pf/assets/games/criptograma.svg'
                }}
                linkProps={{
                    target: '_self',
                    href: '/juegos/criptograma/'
                }}
                game="criptograma"
                diagramation="fourVertical"
            />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
