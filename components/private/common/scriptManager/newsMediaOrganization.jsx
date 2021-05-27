import React from 'react';
import PropTypes from 'fusion:prop-types';

const NewsMediaOrganization = ({ section }) => {
    const script = `{"@context":"http://schema.org","@type":"NewsMediaOrganization","name":"LA NACION","url":"https://www.lanacion.com.ar/","sameAs":["https://www.facebook.com/lanacion/","https://www.instagram.com/lanacioncom/","https://twitter.com/LANACION"]}`;

    return section === 'home' ? (
        <script
            dangerouslySetInnerHTML={{ __html: script }}
            type="application/ld+json"
        ></script>
    ) : (
        <></>
    );
};

NewsMediaOrganization.propTypes = {
    section: PropTypes.string.isRequired
};

NewsMediaOrganization.defaultProps = {
    section: ''
};

export default NewsMediaOrganization;
