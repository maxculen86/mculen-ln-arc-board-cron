import React from 'react';
import { useAppContext } from 'fusion:context';

const BuildScriptForZoom = ({ mediaData, subtype }) => {
    const { deployment, contextPath } = useAppContext();
    const { width = 0, _id: idMedia, type } = mediaData || {};
    return (
        (type === 'image' && idMedia && (
            <script
                id="script-build-zoom"
                defer
                data-subtype={subtype}
                data-width={width}
                data-id-media={idMedia}
                src={deployment(
                    `${contextPath}/resources/js/LN/buildScriptForZoom.min.js`
                )}
            />
        )) ||
        undefined
    );
};

export default BuildScriptForZoom;
