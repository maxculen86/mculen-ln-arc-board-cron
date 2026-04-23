/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';

function FacebookPixel({ location = 'head', id }) {
    if (!id || location !== 'head') return null;

    const initScript = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${id}');
        fbq('track', 'PageView');
    `;

    const scriptViewContent = `
        function viewContentEvent() {
            var is_suscriber = 'false';
            if ({{Usuarios - LS Payuser - Normalizado}} == 'yes') is_suscriber = 'true';
            fbq('trackSingle','492459597522335', 'ViewContent', {
            tipo_pagina: {{Pantallas - Tipo de pantalla LN9}},
            seccion: {{Notas - DL seccion}},
            main_tag: {{Notas - NewsArticle - Keywords}},
            notas_leidas: {{Sesiones - Contador de notas}},
            tipo_suscripcion:{{Usuarios - Suscriptor Type}},
            registrado: {{Usuarios - Usuario Registrado - Normalizado}},
            suscriptor: {{Usuarios - Payuser - Normalizado}},
            credencial: {{Usuarios - Credential Type}},
            main_tag: {{Notas - NewsArticle - Keywords}},
            logueado: {{Sesiones - Cookie - Usuario Logueado - Normalizado}},
            autor: {{Notas - NewsArticle - Author}},
            valor: {{Notas - DL valor}},
            content_ids: {{Notas - URL - ID de nota LN9}},
            content_name: {{Navegador - Doc Title}},
            nota_seccion: {{Notas - NewsArticle - articleSection}},
            content_type: 'product',
            article_content_tier: 'metered',
            is_subscriber: is_suscriber
        });
        }
        viewContentEvent();
    `;

    return (
        <>
            <script
                id="facebookpixel"
                defer
                type="text/javascript"
                dangerouslySetInnerHTML={{ __html: initScript }}
            />
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
                    alt=""
                />
            </noscript>
            <script
                id="viewContentEvent"
                defer
                type="text/javascript"
                dangerouslySetInnerHTML={{ __html: scriptViewContent }}
            />
        </>
    );
}

FacebookPixel.propTypes = {
    location: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default FacebookPixel;
