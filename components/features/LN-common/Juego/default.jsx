import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import get from '../../../private/common/utils/get';
import getGameProperties from '../../../private/LN/common/utils/getGameProperties';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import checkSection from '../../../private/LN/common/utils/checkSection';
import { addInitialSlash } from '../../../private/LN/common/utils/addInitialSlash';
import addForwardSlash from '../../../private/LN/common/utils/addForwardSlash';
import GameCard from './gameCard';

function Game({ id: featureId, customFields, isAdmin }) {
    const { contextPath, deployment, arcSite, globalContent } =
        useAppContext() || {};

    const {
        sectionId: originalSectionId = '',
        gameType,
        subscriber,
        isNewGame
    } = customFields;
    const primarySection = checkSection(globalContent, '/juegos');

    const sectionId = originalSectionId.endsWith('/')
        ? originalSectionId.slice(0, -1)
        : originalSectionId;

    const { name: sectionTitle } =
        useContent({
            source: 'sectionSource',
            query: {
                id: addInitialSlash(sectionId),
                website: arcSite
            }
        }) || {};

    const gameProperties = getGameProperties(
        sectionTitle,
        sectionId,
        contextPath,
        deployment
    );

    const newGame = isNewGame === 'SI';

    if (!sectionId && isAdmin) {
        return (
            <div
                style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    width: '100%'
                }}
            >
                <PageBuilderMessage
                    key={featureId}
                    type="warning"
                    message="El sectionId es un campo obligatorio"
                />
            </div>
        );
    }

    const forSubscriber = subscriber === 'SI';

    if (gameType === 'Externo') {
        return (
            <GameCard
                {...gameProperties}
                href={addForwardSlash(sectionId)}
                forSubscriber={forSubscriber}
                newGame={newGame}
                isHomeGames={primarySection}
            />
        );
    }

    const articleData =
        useContent({
            source: 'lnAcuSource',
            query: {
                sectionId,
                size: 1,
                website: arcSite
            }
        }) || {};

    const articleLink = get(articleData, 'content_elements[0].website_url', '');

    return (
        <GameCard
            {...gameProperties}
            href={addForwardSlash(articleLink)}
            forSubscriber={forSubscriber}
            newGame={newGame}
            isHomeGames={primarySection}
        />
    );
}

Game.label = 'LN Juego';

Game.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    customFields: PropTypes.shape({
        sectionId: PropTypes.string.tag({
            name: 'sectionId',
            description: 'Ingrese aquí el id de la seccion',
            defaultValue: ''
        }),
        gameType: PropTypes.oneOf(['Interno', 'Externo']).tag({
            defaultValue: 'Interno',
            name: 'Interno/Externo'
        }).isRequired,
        subscriber: PropTypes.oneOf(['SI', 'NO']).tag({
            defaultValue: 'NO',
            name: 'Es cerrada?'
        }).isRequired,
        isNewGame: PropTypes.oneOf(['SI', 'NO']).tag({
            defaultValue: 'NO',
            name: 'Es nuevo?'
        }).isRequired
    }).isRequired
};

export default Game;
