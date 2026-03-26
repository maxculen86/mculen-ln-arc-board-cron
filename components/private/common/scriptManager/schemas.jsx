import React from 'react';
import { ARC_STATIC, SITE_LANACION } from 'fusion:environment';
import { useAppContext } from 'fusion:context';
import { addForwardSlash } from '../../LN/common/utils/addForwardSlash';
import buildNewsMediaOrganizationSchema from './newsMediaOrganizationMetadata';
import getOrganizationId from '../utils/getOrganizationId';
import get from '../utils/get';

function Schemas({ section = '', siteProperties = {} }) {
    const { contextPath, deployment } = useAppContext();
    const logoPath = `${contextPath}/resources/images/placeholderLN-1280x1280.jpg`;
    const logoUrl = `${ARC_STATIC}${deployment(logoPath)}`;
    const canonicalHost = get(siteProperties, 'host', SITE_LANACION);
    const siteUrl = addForwardSlash(canonicalHost);
    const organizationId =
        getOrganizationId(siteProperties) ||
        `${siteUrl.replace(/\/+$/, '')}/#organization`;
    const organizationUrl = addForwardSlash(
        organizationId.replace(/\/?#organization$/, '')
    );

    const newsMedia = JSON.stringify(
        buildNewsMediaOrganizationSchema({
            organizationId,
            organizationUrl,
            logoUrl
        })
    );
    const webSite = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'LA NACION',
        url: siteUrl
    });

    const createScript = childrens =>
        childrens.map(({ id, schema }) => (
            <script
                key={id}
                dangerouslySetInnerHTML={{ __html: schema }}
                type="application/ld+json"
            />
        ));

    const nodes = createScript([
        { id: 'news-media-organization', schema: newsMedia },
        { id: 'website', schema: webSite }
    ]);

    return section === 'nota' || section === 'home' ? nodes : null;
}

export default Schemas;
