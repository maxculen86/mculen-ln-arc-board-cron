import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import { DOMProperty } from 'react-dom';
import PropTypes from 'fusion:prop-types';

const Amp = props => {
    const { children } = props;
    const htmlRef = useRef(null);

    /* DOMProperty.injectDOMPropertyConfig({
        Properties: {
            'amp': DOMProperty.MUST_USE_PROPERTY
        }
    }); */

    useEffect(() => {
        //ReactDOM.findDOMNode(htmlRef).setAttribute("amp", "");
        //document.getElementsByTagName('html').setAttribute('amp', true);
    }, []);

    return (
        <html
            lang="es"
            ref={htmlRef}
            dangerouslySetInnerHTML={{
                __html: `
            <head>
                <meta charset="utf-8" />
                <title>Recetas</title>
                <link rel="canonical" href="self.html" />
                <meta name="viewport" content="width=device-width,minimum-scale=1" />
                <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
                <script async src="https://cdn.ampproject.org/v0.js"></script>
                <style amp-custom>
                    h1{ color: red; }
                </style>
            </head>
            <body>
                <div id="fusion-app">${renderToString(children)}</div>
            </body>
            `
            }}
        />
    );

    /* return (
        <html amp lang="es"> 
            <head>
        <meta charset="utf-8" />
        <title>Recetas</title>
        <link rel="canonical" href="self.html" />
        <meta name="viewport" content="width=device-width,minimum-scale=1" />
        <style amp-boilerplate dangerouslySetInnerHTML={{
            __html: `
            body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
                -moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
                -ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
                animation:-amp-start 8s steps(1,end) 0s 1 normal both}

                @-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
                @-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}}
                @-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
                @-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
                @keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
                `
        }} />
        <noscript>
            <style amp-boilerplate dangerouslySetInnerHTML={{
                __html: `
                body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}
                `
            }} />
        </noscript>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <style amp-custom dangerouslySetInnerHTML={{
            __html: `
                h1{ color: red; }
            `
        }} />
        
            </head>
            <body>
                <div id="fusion-app">{props.children}</div>
            </body>
        </html>
    ); */
};

Amp.propTypes = {
    siteProperties: PropTypes.isRequired
};

export default Amp;
