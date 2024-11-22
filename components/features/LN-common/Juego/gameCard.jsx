import React from 'react';
import PropTypes from 'prop-types';
import { Cardgames } from '@ln/contenidos-ui-cardgames';

function GameCard({ forSubscriber, newGame, isHomeGames, ...restProps }) {
    return (
        <div className="col-span-4 col-span-3_sm">
            <Cardgames
                {...restProps}
                isHomeGames={isHomeGames}
                forSubscriber={forSubscriber}
                newGame={newGame}
            />
        </div>
    );
}

GameCard.propTypes = {
    forSubscriber: PropTypes.bool.isRequired,
    newGame: PropTypes.bool.isRequired,
    isHomeGames: PropTypes.bool.isRequired
};

export default GameCard;
