import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import scriptVideoValidator from './scriptVideoValidator';

// TODO: Aplicar esta funcion
/* function getResolucionDispositivo() {
    let dispositivo = '';
    switch (window.DFP.ads.deviceResolution) {
        case "_dsk":
            return dispositivo = "desktop";
        case "_tab":
            return dispositivo = "tablet";
        case "_mob":
            return dispositivo = "mobile";
        default:
            return dispositivo;
    }
} */
// TODO: Validar cuantas veces renderiza este componente
const ScriptVideoPowa = ({ globalContent }) => {
    const loadVideo = scriptVideoValidator(globalContent);

    useEffect(() => {
        // TODO: Se aplica solamente para NOTAS
        if (window && loadVideo) {
            // TODO: Armar URL
            const adUrl = `https://pubads.g.doubleclick.net/gampad/ads?slotname=/133919216/la_nacion_dsk/Nota/preroll_dsk&sz=640x480|400x300&ciu_szs=300x250&unviewed_position_start=1&output=vast&impl=s&env=vp&gdfp_req=1&ad_rule=0&vad_type=linear&vpos=preroll&pod=3&ppos=1&lip=true&min_ad_duration=0&max_ad_duration=30000&vrid=6256&cust_params=&url=${
                window.location.href
            }&description_url=${encodeURIComponent(
                window.location.href.toString()
            )}&video_doc_id=short_onecue&cmsid=496&kfa=0&tfcd=0&correlator=${new Date().getTime()}`;

            window.PoWaSettings.advertising.adTag = (function() {
                let videosPlayed = 0;
                return function({ powa, videoData }) {
                    const playAd = videosPlayed % 2 === 0;
                    videosPlayed += 1;
                    return playAd &&
                        videoData.additional_properties.advertising.playAds
                        ? adUrl
                        : 'test';
                };
            })();
        }
    }, [loadVideo]);

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
