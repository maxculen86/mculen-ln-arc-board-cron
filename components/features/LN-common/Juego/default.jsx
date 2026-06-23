import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import { CardGame } from '@ln/contenidos-ui-cardgames';
import { cx } from '@ln/cva';
import get from '../../../private/common/utils/get';
import getGameProperties from '../../../private/LN/common/utils/getGameProperties';
import checkSection from '../../../private/LN/common/utils/checkSection';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import { addInitialSlash } from '../../../private/LN/common/utils/addInitialSlash';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import {
    getButtonProps,
    getCardPosition,
    getClassName,
    getDescriptionData,
    getFirstCard,
    getHrefLink,
    getParent,
    getParentLayout
} from './helper';

function Game({ id: featureId, customFields, isAdmin }) {
    const { contextPath, deployment, arcSite, renderables, globalContent } =
        useAppContext() || {};

    const {
        sectionId: originalSectionId = '',
        gameType,
        subscriber,
        isNewGame,
        description
    } = customFields;

    const primarySection = checkSection('/juegos', globalContent);

    const sectionId = originalSectionId?.endsWith('/')
        ? originalSectionId.slice(0, -1)
        : originalSectionId || '';

    const { name: sectionTitle = '' } =
        useContent({
            source: 'sectionSource',
            query: {
                id: addInitialSlash(sectionId),
                website: arcSite
            },
            staticMode: true
        }) || {};

    const gameProperties = getGameProperties(
        sectionTitle,
        contextPath,
        deployment,
        sectionId
    );

    const { title, logo, game } = gameProperties;
    const newGame = isNewGame === 'SI';
    const forSubscriber = subscriber === 'SI';

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

    const articleData =
        useContent({
            source: 'lnAcuSource',
            query: {
                sectionId,
                size: 1,
                website: arcSite
            },
            staticMode: true
        }) || {};

    const articleLink = get(articleData, 'content_elements[0].website_url', '');

    const parent = getParent(featureId, renderables);
    const cardPosition = getCardPosition(parent, featureId);
    const parentLayout = getParentLayout(parent);
    const isFirstCard = getFirstCard(cardPosition, parentLayout);

    const hrefLink = getHrefLink(gameType, sectionId, articleLink);
    const badge = newGame ? 'Nuevo' : null;
    const buttonProps = getButtonProps(game, isFirstCard, parentLayout);
    const ribbon = forSubscriber ? (
        <IconSprite name="ribbonColor" color />
    ) : null;

    const slotsProps = {
        description: { className: 'text-18 sm-none' }
    };

    return (
        <CardGame
            sizeCard={primarySection ? 24 : 18}
            title={title}
            badge={badge}
            ribbon={ribbon}
            imageProps={{
                alt: title,
                src: logo.src
            }}
            linkProps={{
                target: '_self',
                href: hrefLink,
                'data-game-link': 'true'
            }}
            game={game}
            buttonProps={buttonProps}
            diagramation={parentLayout}
            firstChild={isFirstCard}
            description={getDescriptionData(
                isFirstCard,
                parentLayout,
                description
            )}
            className={cx(getClassName(parentLayout, isFirstCard))}
            slotsProps={slotsProps}
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
        description: PropTypes.string.tag({
            name: 'Texto',
            description: 'Ingrese aquí la descripción del juego',
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
