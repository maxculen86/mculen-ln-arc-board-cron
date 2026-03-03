import React from 'react';
import { ARC_STATIC, SITE_LANACION } from 'fusion:environment';
import { useAppContext } from 'fusion:context';
import { addForwardSlash } from '../../LN/common/utils/addForwardSlash';
import {
    getEconomicIndicesMetaData,
    buildOrganizationSchema,
    buildBreadcrumbSchema,
    buildWebPageSchema,
    HOME_SCHEMA_ITEMS,
    VALID_SERVICE_ITEMS
} from '../../../../content/sources/utils/servicesSource/economicIndices/_helpers';

const INDICES_PATH = '/economia/indices/';

const useSchemaUrls = () => {
    const { contextPath, deployment } = useAppContext();
    const logoPath = `${contextPath}/resources/images/placeholderLN-1280x1280.jpg`;
    return {
        logoUrl: `${ARC_STATIC}${deployment(logoPath)}`,
        siteUrl: addForwardSlash(SITE_LANACION)
    };
};

function EconomicIndicesSchema() {
    const { siteUrl, logoUrl } = useSchemaUrls();
    const indicesUrl = `${siteUrl}economia/indices/`;
    const { title, description, breadcrumbName } = getEconomicIndicesMetaData();

    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            buildOrganizationSchema(siteUrl, logoUrl, true),
            buildBreadcrumbSchema(siteUrl, indicesUrl, breadcrumbName),
            {
                '@type': 'WebPage',
                '@id': `${indicesUrl}#webpage`,
                url: indicesUrl,
                name: title,
                description,
                publisher: { '@id': `${siteUrl}#organization` },
                mainEntity: {
                    '@type': 'ItemList',
                    name: title,
                    description,
                    itemListElement: HOME_SCHEMA_ITEMS.map((item, index) => ({
                        '@type': 'ListItem',
                        position: index + 1,
                        item: {
                            '@type': 'FinancialProduct',
                            name: item.name,
                            ...(item.tickerSymbol && {
                                tickerSymbol: item.tickerSymbol
                            }),
                            ...(item.isFirst && {
                                brand: { '@type': 'Brand', name: 'LA NACION' }
                            })
                        }
                    }))
                }
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema, null, 2)
            }}
        />
    );
}

export function EconomicIndicesDetailSchema({ serviceItem, dataService }) {
    const { siteUrl, logoUrl } = useSchemaUrls();
    const metaData = getEconomicIndicesMetaData(serviceItem);
    const pageUrl = `${siteUrl}economia/${serviceItem}/`;

    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            buildOrganizationSchema(siteUrl, logoUrl),
            buildBreadcrumbSchema(siteUrl, pageUrl, metaData.breadcrumbName),
            buildWebPageSchema(
                siteUrl,
                pageUrl,
                serviceItem,
                metaData,
                dataService
            )
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema, null, 2)
            }}
        />
    );
}

export const isEconomicIndicesHome = (requestUri = '') =>
    requestUri === INDICES_PATH ||
    requestUri.startsWith(`${INDICES_PATH}?`) ||
    requestUri === '/economia/indices';

export const isEconomicIndicesPage = (requestUri = '') => {
    if (isEconomicIndicesHome(requestUri)) return true;
    return VALID_SERVICE_ITEMS.some(item => {
        const path = `/economia/${item}/`;
        return (
            requestUri === path ||
            requestUri.startsWith(`${path}?`) ||
            requestUri === `/economia/${item}`
        );
    });
};

export default EconomicIndicesSchema;
