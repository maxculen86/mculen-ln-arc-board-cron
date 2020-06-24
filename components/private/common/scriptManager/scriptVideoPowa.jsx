import React, { useEffect, useState } from 'react';
import PropTypes from 'fusion:prop-types';
import get from 'lodash.get';
import loadOTTVideoStyles from '../../OTT/ficha/ottVideoStyles';
import loadOTTVideoAnalytics from '../../OTT/ficha/ottVideoAnalytics';

const videosBody = contentElements =>
    contentElements.filter(element => element.type === 'video').length;

// TODO: Validar cuantas veces renderiza este componente
const ScriptVideoPowa = ({ globalContent }) => {
    const {
        _id,
        headlines: { basic }
    } = globalContent;
    const contentElements = get(globalContent, 'content_elements');
    const promoItems = get(globalContent, 'promo_items');
    const basicPromoItems = get(promoItems, 'basic');
    const storytellingPromoItems = get(promoItems, 'storytelling');
    const typeBasic = get(basicPromoItems, 'type');
    const typeStorytelling = get(storytellingPromoItems, 'type');

    const loadVideo =
        videosBody(contentElements) > 0 ||
        typeBasic === 'video' ||
        typeStorytelling === 'video';

    useEffect(() => {
        if (window && loadVideo) {
            loadOTTVideoStyles();
            loadOTTVideoAnalytics(basic, _id);
        }
    }, [_id, basic, loadVideo]);

    // FIXME: Cambiar parametro en url que indentifica ambiente (prod-sandbox) a dinamico
    return loadVideo ? (
        <script
            async
            src="https://lanacionar.video-player.arcpublishing.com/prod/powaBoot.js"
        />
    ) : (
        <></>
    );
};

ScriptVideoPowa.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        headlines: PropTypes.shape({ basic: PropTypes.string.isRequired }),
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
