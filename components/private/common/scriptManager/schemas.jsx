import React from 'react';
import { ARC_STATIC } from 'fusion:environment';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';

const Schemas = ({ section }) => {
    const { contextPath, deployment } = useAppContext();
    const _deployment = `${contextPath}/resources/images/placeholderLN-112_amp.jpg`;
    const logoUrl = `${ARC_STATIC}${deployment(_deployment)}`;

    const newsMedia = `{
        "@context": "http://schema.org",
        "@type": "NewsMediaOrganization",
        "name": "LA NACION",
        "url": "https://www.lanacion.com.ar/",
        "description": "Últimas noticias de Argentina y el mundo – LA NACION",
        "alternateName": "LN",
        "diversityPolicy": "https://www.lanacion.com.ar/sociedad/diversidad-redaccion-nid2413327/",
        "ethicsPolicy": "https://www.lanacion.com.ar/sociedad/la-nacion-mision-estructura-empresarial-principios-eticos-nid2393569/",
        "masthead": "https://www.lanacion.com.ar/sociedad/equipo-editorial-la-nacion-nid2390490/",
        "publishingPrinciples": "https://www.lanacion.com.ar/sociedad/los-veinte-20-principios-del-periodismo-la-nid2390521/",
        "verificationFactCheckingPolicy": "https://www.lanacion.com.ar/sociedad/verificacion-chequeo-datos-nid2406825/",
        "foundingDate": "1870-01-04",
        "logo": {
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "url": "${logoUrl}",
            "height": 112,
            "width": 112
          },
        "sameAs": [
          "https://www.facebook.com/lanacion/",
          "https://www.instagram.com/lanacioncom/",
          "https://twitter.com/LANACION"
        ]
      }`;
    const webSite = `{
        "@context":"http://schema.org",
        "@type":"WebSite",
        "url":"https://www.lanacion.com.ar/"
    }`;

    const createScript = childrens =>
        childrens.map(x => (
            <script
                dangerouslySetInnerHTML={{ __html: x }}
                type="application/ld+json"
            />
        ));

    const nodes = createScript([newsMedia, webSite]);

    return section === 'home' ? nodes : <></>;
};

Schemas.defaultProps = {
    section: ''
};

Schemas.propTypes = {
    section: PropTypes.string
};

export default Schemas;
