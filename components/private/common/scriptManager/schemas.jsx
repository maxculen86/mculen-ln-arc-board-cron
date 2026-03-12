import React from 'react';
import { ARC_STATIC, SITE_LANACION } from 'fusion:environment';
import { useAppContext } from 'fusion:context';
import { addForwardSlash } from '../../LN/common/utils/addForwardSlash';

function Schemas({ section = '' }) {
    const { contextPath, deployment } = useAppContext();
    const _deployment = `${contextPath}/resources/images/placeholderLN-1280x1280.jpg`;
    const logoUrl = `${ARC_STATIC}${deployment(_deployment)}`;
    const siteUrl = addForwardSlash(SITE_LANACION);

    const newsMedia = `{
        "@context": "http://schema.org",
        "@type": "NewsMediaOrganization",
        "name": "LA NACION",
        "url": "${siteUrl}",
        "description": "Últimas noticias de Argentina y el mundo – LA NACION",
        "alternateName": "LN",
        "diversityPolicy": "${siteUrl}sociedad/diversidad-redaccion-nid2413327/",
        "ethicsPolicy": "${siteUrl}sociedad/la-nacion-mision-estructura-empresarial-principios-eticos-nid2393569/",
        "masthead": "${siteUrl}sociedad/equipo-editorial-la-nacion-nid2390490/",
        "publishingPrinciples": "${siteUrl}sociedad/los-veinte-20-principios-del-periodismo-la-nid2390521/",
        "verificationFactCheckingPolicy": "${siteUrl}sociedad/verificacion-chequeo-datos-nid2406825/",
        "foundingDate": "1870-01-04",
        "logo": {
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "url": "${logoUrl}",
            "height": 1280,
            "width": 1280
          },
        "sameAs": [
          "https://www.facebook.com/lanacion/",
          "https://www.instagram.com/lanacioncom/",
          "https://x.com/LANACION/"
        ]
      }`;
    const webSite = `{
        "@context":"http://schema.org",
        "@type":"WebSite",
        "name": "LA NACION",
        "url":"${siteUrl}"
    }`;

    const createScript = childrens =>
        childrens.map(x => (
            <script
                dangerouslySetInnerHTML={{ __html: x }}
                type="application/ld+json"
            />
        ));

    const nodes = createScript([newsMedia, webSite]);

    return section === 'home' ? nodes : null;
}

export default Schemas;
