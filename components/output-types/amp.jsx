import React from 'react';
import PropTypes from 'fusion:prop-types';
import ScriptManager from '../private/common/scriptManager';
import GTM from '../private/common/scriptManager/googleTagManager';
import Comscore from '../private/common/scriptManager/comscore';
import Microdata from '../private/common/scriptManager/microdata';
import PostBid from '../private/common/scriptManager/postbid';
import ArcAds from '../private/common/scriptManager/arcAds';
import FacebookSDK from '../private/common/scriptManager/facebookSDK';
import Livefyre from '../private/common/scriptManager/Livefyre';
import DataLayerIndex from '../private/common/dataLayerIndex';
import SnippetIndex from '../private/common/snippetIndex';

const scriptList = {
    GTM,
    Comscore,
    Microdata,
    ArcAds,
    FacebookSDK,
    PostBid,
    Livefyre
};

const Amp = props => {
    const {
        arcSite,
        children,
        contextPath,
        deployment,
        CssLinks,
        Fusion,
        Libs,
        MetaTags,
        metaValue,
        siteProperties,
        outputType
    } = props;

    console.log('################ OUTPUT TYPE ############# ', outputType);

    const Scripts = ScriptManager(scriptList, siteProperties.scripts);

    return (
        <html amp lang="es">
            <head>
                <meta charset="utf-8" />
                <title>
                    {metaValue('title') || siteProperties.title || 'LA NACION'}
                </title>
                <DataLayerIndex {...props} />
                <SnippetIndex {...props} />
                <Scripts location="head" />
                <MetaTags />
                <Libs />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, minimum-scale=1"
                />
                <script async src="https://cdn.ampproject.org/v0.js" />
            </head>
            <body>
                <Scripts location="body-top" />
                <div id="fusion-app">{children}</div>
                <Fusion />
                <Scripts location="body-bottom" />
            </body>
        </html>
    );
};

Amp.propTypes = {
    siteProperties: PropTypes.isRequired
};

export default Amp;
