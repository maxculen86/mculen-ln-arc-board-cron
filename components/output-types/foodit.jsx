import React from 'react';
import CriticalCSS from '../features/foodit-global/common/CriticalCss/foodit';
import CssLinksByArcSite from './Helper/cssLinksByArcSite';
import ObservableFoodit from './Helper/observableFoodit';

// TODO: OutputType base, queda pendiente agregar manejo de scripts, metadatos y preload
const Foodit = ({ children, Libs, Fusion } = {}) => {
    return (
        <html lang="es">
            <head>
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1.0,minimum-scale=0.5,maximum-scale=5.0,user-scalable=yes"
                />
                <meta name="robots" content="noindex, nofollow" />
                <meta name="theme-color" content="#ffffff" />
                <title>Recetas</title>
                <link rel="manifest" href="/manifest.json" />
                <CriticalCSS />
                <CssLinksByArcSite />
                <Libs />
            </head>
            <body>
                <div id="fusion-app">{children}</div>
                <Fusion hydrateOnly />
                <ObservableFoodit />
                {/* TODO: mover script a donde corresponda cuando se cree la nueva implementacion de manejo de scrips */}
                <script
                    type="text/javascript"
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.addEventListener('DOMContentLoaded', () => {
                            const buttons = document.querySelectorAll('[data-modal="open-modal"]');
                            buttons.forEach(button => {
                                button.addEventListener('click', (e) => {
                                    e.preventDefault();
                                    window.LN.observable.publish('openModal', {
                                        ids: button.dataset.id.split(',')
                                    });                                    
                                });
                            });
                        })
                    `
                    }}
                />
            </body>
        </html>
    );
};

export default Foodit;
