import React, { memo } from 'react';
import PropTypes from 'prop-types';
import get from '../../../../private/common/utils/get';
import Text from '../../../../private/common/text';
import { normalizeCardColor } from '../_utils/linkedSummaryCardsHelper';

// TODO: Esto es un componente temporal. Estos componentes debe removerce para ser parte de la lib.
// TODO: Estos estilos son provisorios deben ser removidos, reemplazados por los definitivos y
//  colocados en un archivo CSS. Se dejan aquí por simplicidad y para facilitar la depuración.
const CARD_CSS = `
.linked-summary-card-small {
    background: #fff;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 0.75rem;
    border: 1px solid transparent;
}

.linked-summary-card-small:hover {
    /* TODO: Estilos provisorios - reemplazar por diseño definitivo del equipo frontend */
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.06);
    transform: translateY(-0.125rem);
    border-color: var(--card-accent, #0250C9); /* MANTENER: Variable CSS funcional */
}

.linked-summary-card-small:focus-within {
    /* TODO: Estilos provisorios - reemplazar por diseño definitivo del equipo frontend */
    box-shadow: 0 0 0 2px var(--card-accent, #0250C9); /* MANTENER: Variable CSS funcional */
}

.card-numero {
    /* TODO: Estilos provisorios - reemplazar por diseño definitivo del equipo frontend */
    display: inline-block;
    background: var(--card-accent, #0250C9); /* MANTENER: Variable CSS funcional */
    color: #fff;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.card-titulo {
    color: #272727;
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    font-weight: 700;
}

.card-texto {
    color: #5a5a5a;
    margin: 0 0 0.5rem 0;
    font-size: 0.875rem;
    overflow: hidden;
    text-overflow: ellipsis;
}

.card-boton {
    /* TODO: Estilos provisorios - reemplazar por diseño definitivo del equipo frontend */
    background: transparent;
    color: var(--card-accent, #0250C9); /* MANTENER: Variable CSS funcional */
    border: none;
    padding: 0;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: auto;
    align-self: flex-start;
    transition: color 0.3s ease, opacity 0.3s ease;
}

.card-boton:hover,
.card-boton:focus {
    /* TODO: Estilos provisorios - reemplazar por diseño definitivo del equipo frontend */
    color: var(--card-accent, #0250C9); /* MANTENER: Variable CSS funcional */
}

.card-boton:hover {
    /* TODO: Estilos provisorios - reemplazar por diseño definitivo del equipo frontend */
    opacity: 0.85;
}
.card-boton:active {
    /* TODO: Estilos provisorios - reemplazar por diseño definitivo del equipo frontend */
    opacity: 0.7;
}
.card-boton:focus {
    /* TODO: Estilos provisorios - reemplazar por diseño definitivo del equipo frontend */
    outline: 2px solid var(--card-accent, #0250C9); /* MANTENER: Variable CSS funcional para outline */
    outline-offset: 2px;
}
`;

const LinkedSummaryCardSmall = memo(({ data, onCardClick }) => {
    const cardNumber = get(data, 'embed.config.cardNumber', '');
    const title = get(data, 'embed.config.title', '');
    const description = get(data, 'embed.config.description', '');
    const buttonText = get(data, 'embed.config.buttonText', 'Ver más');
    const cardId = get(data, 'embed.config.cardId', '');
    const cardColor = normalizeCardColor(get(data, 'embed.config.cardColor'));

    return (
        <>
            <style>{CARD_CSS}</style>
            <div
                className="linked-summary-card-small"
                style={{ '--card-accent': cardColor }}
            >
                {cardNumber && (
                    <Text tag="span" className="card-numero">
                        {cardNumber}
                    </Text>
                )}
                {title && (
                    <Text tag="h3" className="card-titulo">
                        {title}
                    </Text>
                )}
                {description && (
                    <Text tag="p" className="card-texto">
                        {description}
                    </Text>
                )}

                <button
                    className="card-boton"
                    onClick={() => cardId && onCardClick?.(cardId)}
                    type="button"
                    aria-label={`Ir a ${title || 'contenido'} de la tarjeta ${cardNumber || ''}`}
                >
                    <Text tag="span">{buttonText}</Text>
                </button>
            </div>
        </>
    );
});

LinkedSummaryCardSmall.propTypes = {
    data: PropTypes.shape({
        embed: PropTypes.shape({
            config: PropTypes.shape({
                cardNumber: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ]),
                title: PropTypes.string,
                description: PropTypes.string,
                buttonText: PropTypes.string,
                cardId: PropTypes.string,
                cardColor: PropTypes.string
            })
        })
    }).isRequired,
    onCardClick: PropTypes.func
};

LinkedSummaryCardSmall.defaultProps = {
    onCardClick: undefined
};

export default LinkedSummaryCardSmall;
