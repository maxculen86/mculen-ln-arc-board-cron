import React from 'react';
import PropTypes from 'fusion:prop-types';
import scriptVideoValidator from './scriptVideoValidator';

// TODO: Validar cuantas veces renderiza este componente
const ScriptVideoPowa = ({ globalContent }) => {
    const loadVideo = scriptVideoValidator(globalContent);

    // FIXME: Cambiar parametro en url que indentifica ambiente (prod-sandbox) a dinamico
    return (
        loadVideo && (
            <script
                async
                src="https://lanacionar.video-player.arcpublishing.com/prod/powaBoot.js"
            />
        )
    );
};

ScriptVideoPowa.propTypes = {
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

export default ScriptVideoPowa;
