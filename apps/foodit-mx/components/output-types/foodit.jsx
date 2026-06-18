// STUB — checkpoint 2.14: verifica que el bundle MX levanta y sirve HTTP 200.
//
// TODO(Fase 4): reemplazar este stub con el output-type completo.
//   1. Copiar los componentes de Fase 4 a components/features/ y components/chains/
//   2. Resolver los imports en _pending/output-types/foodit.full.jsx (deben dejar de marcar error en ESLint)
//   3. mv _pending/output-types/foodit.full.jsx components/output-types/foodit.jsx
//   4. Reiniciar `npm start` y verificar que /recetas devuelve HTML completo
import React from 'react';

function Foodit({ children, Libs, Fusion } = {}) {
    return (
        <html lang="es">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1.0"
                />
                <title>Foodit MX</title>
            </head>
            <body>
                <div id="fusion-app">{children}</div>
                <Fusion />
                <Libs />
            </body>
        </html>
    );
}

export default Foodit;
