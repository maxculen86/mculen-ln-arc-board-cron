import React from 'react';
import PropTypes from 'fusion:prop-types';
import { API_ENV } from 'fusion:environment';
import scriptVideoValidator from './scriptVideoValidator';

// TODO: Validar cuantas veces renderiza este componente
const ScriptVideoPowa = ({ globalContent }) => {
    const loadVideo = scriptVideoValidator(globalContent);

    return (
        loadVideo && (
            <script
                async
                src={`https://lanacionar.video-player.arcpublishing.com/${API_ENV}/powaBoot.js`}
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
