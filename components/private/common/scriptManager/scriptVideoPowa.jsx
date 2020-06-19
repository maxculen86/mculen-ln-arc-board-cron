import React from 'react';
import PropTypes from 'fusion:prop-types';

const ScriptVideoPowa = ({ promoItems, contentElements }) => {
    const { basic, storytelling } = promoItems || {};
    const { type: typeBasic } = basic || {};
    const { type: typeStorytelling } = storytelling || {};
    const videosBody = contentElements.filter(
        element => element.type === 'video'
    ).length;
    const RenderScriptVideo = () => {
        return videosBody > 0 ||
            typeBasic === 'video' ||
            typeStorytelling === 'video' ? (
            <script src="https://lanacionar.video-player.arcpublishing.com/prod/powaBoot.js" />
        ) : (
            <></>
        );
    };
    return <RenderScriptVideo />;
};

ScriptVideoPowa.propTypes = {
    contentElements: PropTypes.node.isRequired,
    promoItems: PropTypes.shape({
        basic: PropTypes.shape({
            type: PropTypes.string
        }),
        storytelling: PropTypes.shape({
            type: PropTypes.string
        })
    })
};

export default ScriptVideoPowa;
