import React from 'react';
import PropTypes from 'fusion:prop-types';

const Schemas = ({ section }) => {
    const newsMedia = `{"@context":"http://schema.org","@type":"NewsMediaOrganization","name":"LA NACION","url":"https://www.lanacion.com.ar/","sameAs":["https://www.facebook.com/lanacion/","https://www.instagram.com/lanacioncom/","https://twitter.com/LANACION"]}`;
    const webSite = `{"@context":"http://schema.org","@type":"WebSite","url":"https://www.lanacion.com.ar/"}`;

    const createScript = childrens =>
        childrens.map(x => (
            <script
                dangerouslySetInnerHTML={{ __html: x }}
                type="application/ld+json"
            ></script>
        ));

    const nodes = createScript([newsMedia, webSite]);

    return section === 'home' ? nodes : <></>;
};

Schemas.defaultProps = {
    section: ''
};

export default Schemas;
