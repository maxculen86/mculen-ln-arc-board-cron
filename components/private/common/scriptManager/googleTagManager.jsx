/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Component } from 'react';

export default class GTM extends Component {
    constructor(props) {
        super(props);

        const { id, layerName = 'dataLayer', location = 'head' } = props;
        const domanGtm = 'https://www.googletagmanager.com';
        const script = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        '${domanGtm}/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','${layerName}','${id}');`;

        switch (location) {
            case 'head':
                this.nodes = [
                    <script
                        defer
                        type="text/javascript"
                        dangerouslySetInnerHTML={{ __html: script }}
                    />
                ];
                break;
            case 'body-top':
                this.nodes = [
                    <noscript>
                        <iframe
                            src={`${domanGtm}/ns.html?id=${id}`}
                            height="0"
                            width="0"
                            style={{ display: 'none', visibility: 'hidden' }}
                        />
                    </noscript>
                ];
                break;
            default:
                break;
        }
    }

    render() {
        if (!this.nodes) return '';

        return this.nodes;
    }
}
