const NEWS_MEDIA_ORGANIZATION_METADATA = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'LA NACION',
    alternateName: ['LN', 'La Nación', 'lanacion.com.ar'],
    description: 'Últimas noticias de Argentina y el mundo – LA NACION',
    foundingDate: '1870-01-04',
    foundingLocation: {
        '@type': 'Place',
        name: 'Buenos Aires, Argentina'
    },
    legalName: 'La Nación S.A.',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ciudad Autónoma de Buenos Aires',
        addressCountry: 'AR'
    },
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'lectores@lanacion.com.ar'
    },
    sameAs: [
        'https://www.facebook.com/lanacion/',
        'https://www.instagram.com/lanacioncom/',
        'https://x.com/LANACION/'
    ]
};

const NEWS_MEDIA_ORGANIZATION_PATHS = {
    diversityPolicy: 'sociedad/diversidad-redaccion-nid2413327/',
    ethicsPolicy:
        'sociedad/la-nacion-mision-estructura-empresarial-principios-eticos-nid2393569/',
    masthead: 'sociedad/equipo-editorial-la-nacion-nid2390490/',
    publishingPrinciples:
        'sociedad/los-veinte-20-principios-del-periodismo-la-nid2390521/',
    verificationFactCheckingPolicy:
        'sociedad/verificacion-chequeo-datos-nid2406825/'
};

const buildNewsMediaOrganizationSchema = ({
    organizationId,
    organizationUrl,
    logoUrl
}) => ({
    ...NEWS_MEDIA_ORGANIZATION_METADATA,
    '@id': organizationId,
    url: organizationUrl,
    diversityPolicy: `${organizationUrl}${NEWS_MEDIA_ORGANIZATION_PATHS.diversityPolicy}`,
    ethicsPolicy: `${organizationUrl}${NEWS_MEDIA_ORGANIZATION_PATHS.ethicsPolicy}`,
    masthead: `${organizationUrl}${NEWS_MEDIA_ORGANIZATION_PATHS.masthead}`,
    publishingPrinciples: `${organizationUrl}${NEWS_MEDIA_ORGANIZATION_PATHS.publishingPrinciples}`,
    verificationFactCheckingPolicy: `${organizationUrl}${NEWS_MEDIA_ORGANIZATION_PATHS.verificationFactCheckingPolicy}`,
    logo: {
        '@type': 'ImageObject',
        url: logoUrl,
        height: 1280,
        width: 1280
    },
    image: {
        '@type': 'ImageObject',
        url: logoUrl,
        caption: 'Imagen institucional de LA NACION'
    }
});

export default buildNewsMediaOrganizationSchema;
