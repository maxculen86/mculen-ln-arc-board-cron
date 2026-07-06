import React from 'react';

function GTM(props) {
    const { id, layerName = 'dataLayer', location = 'head' } = props;
    const domainGtm = 'https://www.googletagmanager.com';
    const script = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    '${domainGtm}/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','${layerName}','${id}');`;

    let nodes;
    switch (location) {
        case 'head':
            nodes = [<script dangerouslySetInnerHTML={{ __html: script }} />];
            break;
        case 'body-top':
            nodes = [
                <noscript>
                    <iframe
                        title="Google Tag Manager"
                        src={`${domainGtm}/ns.html?id=${id}`}
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
            ];
            break;
        default:
            nodes = [];
            break;
    }

    if (!nodes.length) return null;

    return <>{nodes}</>;
}

export default GTM;
