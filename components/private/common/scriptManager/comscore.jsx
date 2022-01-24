/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Component } from 'react';

export default class Comscore extends Component {
    constructor(props) {
        super(props);

        const { config, location = 'head' } = props;

        this.location = location;
        this.config = config;
    }

    render() {
        if (!this.config) return '';
        if (this.location !== 'head') return '';

        const script = `var _comscore = _comscore || [];_comscore.push(${JSON.stringify(
            this.config
        )});(function() {
                var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
                s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";el.parentNode.insertBefore(s, el);
            })();`;

        const urlConfig = Object.keys(this.config)
            .map(k => `${k}=${this.config[k]}`)
            .join('&');
        const urlNoScript = `https://sb.scorecardresearch.com/p?${urlConfig}&cv=2.0&cj=1`;

        return [
            <script
                defer
                type="text/javascript"
                dangerouslySetInnerHTML={{ __html: script }}
            />,
            <noscript
                dangerouslySetInnerHTML={{
                    __html: `<img src="${urlNoScript}" />`
                }}
            />
        ];
    }
}

Comscore.static = true;
