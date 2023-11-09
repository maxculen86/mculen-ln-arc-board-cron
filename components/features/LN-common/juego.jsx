import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import { Cardgames } from '@ln/contenidos-ui-cardgames';

import StaticContent from '../../private/common/staticContent';
import get from '../../private/common/utils/get';
import getGameProperties from '../../private/LN/common/utils/getGameProperties';
import PageBuilderMessage from '../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import checkSection from '../../private/LN/common/utils/checkSection';
import { addInitialSlash } from '../../private/LN/common/utils/addInitialSlash';

const Game = ({ id: featureId, customFields, isAdmin }) => {
    const { contextPath, deployment, arcSite, globalContent } =
        useAppContext() || {};

    const { sectionId, gameType } = customFields;
    const primarySection = checkSection(globalContent, '/juegos');

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

    const GameCard = (props = {}) => (
        <StaticContent className="col-span-4 col-span-3_sm">
            <Cardgames {...props} isHomeGames={primarySection} />
        </StaticContent>
    );

    if (gameType === 'Externo') {
        return <GameCard {...gameProperties} href={sectionId} />;
    }

    const articleData =
        useContent({
            source: 'acuArticlesSource',
            query: {
                sectionId,
                size: 1,
                website: arcSite
            },
            staticMode: true
        }) || {};

    const articleLink = get(articleData, 'content_elements[0].website_url', '');

    return <GameCard {...gameProperties} href={articleLink} />;
};

Game.label = 'LN Juego';

Game.propTypes = {
    customFields: PropTypes.shape({
        sectionId: PropTypes.string.tag({
            name: 'sectionId',
            description: 'Ingrese aquí el id de la seccion',
            defaultValue: ''
        }),
        gameType: PropTypes.oneOf(['Interno', 'Externo']).tag({
            defaultValue: 'Interno',
            name: 'Interno/Externo'
        }).isRequired
    })
};

export default Game;
