import React from 'react';
import PropTypes from 'prop-types';
// import scriptVideoValidator from './scriptVideoValidator';

// TODO: Validar cuantas veces renderiza este componente
const ScriptCripto = ({ location, globalContent }) => {
    console.log(
        '🚀 ~ file: scriptCripto.jsx ~ line 7 ~ ScriptCripto ~ globalContent',
        globalContent
    );
    const isEconomyOrCrypto = location === 'body-bottom';

    return (
        isEconomyOrCrypto && (
            <script
                async
                src="https://www.livecoinwatch.com/static/lcw-widget.js"
            />
        )
    );
};

ScriptCripto.propTypes = {
    globalContent: PropTypes.shape({
        content_elements: PropTypes.node.isRequired,
        promo_items: PropTypes.shape({
            basic: PropTypes.shape({
                type: PropTypes.string
            }),
            storytelling: PropTypes.shape({
                type: PropTypes.string
            })
        })
    }).isRequired
};

export default ScriptCripto;
