import React from 'react';
import PropTypes from 'prop-types';
import get from '../../../../private/common/utils/get';
import Text from '../../../../private/common/text';

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
}

.linked-summary-card-small:hover {
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.06);
    transform: translateY(-0.125rem);
    border-color: #0250c9;
}

.linked-summary-card-small:focus-within {
    box-shadow: 0 0 0 2px #0250c9;
}

.card-numero {
    display: inline-block;
    background: #0250c9;
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
    background: transparent;
    color: #0250c9;
    border: none;
    padding: 0;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: auto;
    align-self: flex-start;
}

.card-boton:hover { background: #006998; }
.card-boton:active { background: #00547a; }
.card-boton:focus { outline: 2px solid #0250c9; outline-offset: 2px; }
`;

function LinkedSummaryCardSmall({ data, onCardClick }) {
    const numero = get(data, 'embed.config.numero', '');
    const titulo = get(data, 'embed.config.titulo', '');
    const texto = get(data, 'embed.config.texto', '');
    const botonTexto = get(data, 'embed.config.botonTexto', 'Ver más');
    const cardId = get(data, 'embed.config.cardId', '');

    return (
        <>
            <style>{CARD_CSS}</style>
            <div className="linked-summary-card-small">
                {numero && (
                    <Text tag="span" className="card-numero">
                        {numero}
                    </Text>
                )}
                {titulo && (
                    <Text tag="h3" className="card-titulo">
                        {titulo}
                    </Text>
                )}
                {texto && (
                    <Text tag="p" className="card-texto">
                        {texto}
                    </Text>
                )}

                <button
                    className="card-boton"
                    onClick={() => cardId && onCardClick?.(cardId)}
                    type="button"
                >
                    <Text tag="span">{botonTexto}</Text>
                </button>
            </div>
        </>
    );
}

LinkedSummaryCardSmall.propTypes = {
    data: PropTypes.shape({
        embed: PropTypes.shape({
            config: PropTypes.shape({
                numero: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ]),
                titulo: PropTypes.string,
                texto: PropTypes.string,
                botonTexto: PropTypes.string,
                cardId: PropTypes.string
            })
        })
    }).isRequired,
    onCardClick: PropTypes.func
};

LinkedSummaryCardSmall.defaultProps = {
    onCardClick: undefined
};

export default LinkedSummaryCardSmall;
