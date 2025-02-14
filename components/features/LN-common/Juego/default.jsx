import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import { CardGame } from '@ln/contenidos-ui-cardgames';
import get from '../../../private/common/utils/get';
import getGameProperties from '../../../private/LN/common/utils/getGameProperties';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import { addInitialSlash } from '../../../private/LN/common/utils/addInitialSlash';
import { addForwardSlash } from '../../../private/LN/common/utils/addForwardSlash';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import {
    getCardPosition,
    getClassName,
    getDescriptionData,
    getFirstCard,
    getParent,
    getParentLayout
} from './helper';

function Game({ id: featureId, customFields, isAdmin }) {
    const { contextPath, deployment, arcSite, renderables } =
        useAppContext() || {};

    const {
        sectionId: originalSectionId = '',
        gameType,
        subscriber,
        isNewGame,
        description
    } = customFields;

    const sectionId = originalSectionId?.endsWith('/')
        ? originalSectionId.slice(0, -1)
        : originalSectionId || '';

    const { name: sectionTitle = '' } =
        useContent({
            source: 'sectionSource',
            query: {
                id: addInitialSlash(sectionId),
                website: arcSite
            }
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
            }
        }) || {};

    const articleLink = get(articleData, 'content_elements[0].website_url', '');

    const parent = getParent(featureId, renderables);

    const cardPosition = getCardPosition(parent, featureId);

    const parentLayout = getParentLayout(parent);

    const isFirstCard = getFirstCard(cardPosition, parentLayout);

    const badge = newGame ? 'Nuevo' : null;
    const ribbon = forSubscriber ? (
        <IconSprite name="ribbonColor" color />
    ) : null;

    const isSpecialLayout =
        parentLayout === 'oneHorizontalThreeVertical' && !isFirstCard;

    const hrefLink =
        gameType === 'Externo'
            ? addForwardSlash(sectionId)
            : addForwardSlash(articleLink);

    const slotsProps = {
        title: {
            className: isSpecialLayout ? 'min-h-54_md' : null
        },
        description: {
            className: 'text-18 sm-none'
        }
    };

    const slotsClasses = {
        icon: isSpecialLayout ? 'mt-14_m' : ''
    };

    return (
        <CardGame
            title={title}
            badge={badge}
            ribbon={ribbon}
            imageProps={{
                alt: title,
                src: logo.src
            }}
            linkProps={{
                target: '_self',
                href: hrefLink
            }}
            game={game}
            diagramation={parentLayout}
            firstChild={isFirstCard}
            description={getDescriptionData(
                isFirstCard,
                parentLayout,
                description
            )}
            className={getClassName(parentLayout, isFirstCard)}
            slotsProps={slotsProps}
            classnames={slotsClasses}
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
