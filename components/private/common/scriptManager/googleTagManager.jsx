/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Component } from 'react';

export default class GTM extends Component {
    constructor(props) {
        super(props);

        const { id, layerName = 'dataLayer', location = 'head' } = props;
        const script = `((w,l)=>{w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});})(window,'${layerName}');`;
        const _layerName = layerName !== 'dataLayer' ? `&l=${layerName}` : '';
        const params = {
            async: 'true',
            src: `https://www.googletagmanager.com/gtm.js?id=${id}${_layerName}`
        };

        switch (location) {
            case 'head':
                this.nodes = [
                    <script
                        defer
                        type="text/javascript"
                        dangerouslySetInnerHTML={{ __html: script }}
                    />,
                    <script {...params} />
                ];
                break;
            case 'body-top':
                this.nodes = [
                    <noscript>
                        <iframe
                            src={params.src}
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

GTM.static = true;
