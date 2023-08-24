import React from 'react';
import CssLinksRecetas from './Helper/cssLinksRecetas';
import CriticalCSS from '../features/recetas-global/common/CriticalCss/recetas';

// TODO: OutputType base, queda pendiente agregar manejo de scripts, metadatos y preload
const Recetas = ({ children, Libs, Fusion } = {}) => {
    return (
        <html lang="es">
            <head>
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1.0,minimum-scale=0.5,maximum-scale=5.0,user-scalable=yes"
                />
                <meta name="theme-color" content="#ffffff" />
                <title>Recetas</title>
                <link rel="manifest" href="/manifest.json" />
                <CriticalCSS />
                <CssLinksRecetas />
                <Libs />
            </head>
            <body>
                <div id="fusion-app">{children}</div>
                <Fusion hydrateOnly />
            </body>
        </html>
    );
};

export default Recetas;
