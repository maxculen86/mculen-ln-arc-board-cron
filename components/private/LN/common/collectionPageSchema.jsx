import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import { getOrderAndCountTags } from '../../common/utils/tags';
import SnippetRender from '../../common/snippet/snippetRender';

function CollectionPageSchema({ articlesList = [], acuName, requestUri = '' }) {
    const articlesTags = getOrderAndCountTags(articlesList);
    const tagsString = articlesTags.map(tag => tag.text).join(', ') || '';
    const sectionUri = requestUri.split('?')[0];

    const itemListElement = articlesList.map(
        ({ canonical_url: url, headlines }, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'NewsArticle',
                headline: headlines?.basic,
                url: `${SITE_LANACION}${url}`
            }
        })
    );
    const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${SITE_LANACION}${sectionUri}#collectionpage`,
        url: `${SITE_LANACION}${sectionUri}`,
        name: acuName,
        description: `Últimas noticias de ${acuName || ''}${articlesTags.length > 0 && acuName ? ', ' : ''}${tagsString}`,
        inLanguage: 'es-AR',
        copyrightYear: new Date().getFullYear(),
        isPartOf: { '@id': `${SITE_LANACION}/#website` },
        publisher: { '@id': `${SITE_LANACION}/#organization` },
        copyrightHolder: { '@id': `${SITE_LANACION}/#organization` },
        sourceOrganization: { '@id': `${SITE_LANACION}/#organization` },
        mainEntity: {
            '@type': 'ItemList',
            '@id': `${SITE_LANACION}${sectionUri}#itemlist`,
            name: acuName
                ? `Últimas noticias de ${acuName}`
                : 'Últimas noticias',
            itemListOrder: 'https://schema.org/ItemListOrderDescending',
            numberOfItems: articlesList.length,
            itemListElement
        }
    };
    return <SnippetRender data={schemaData} />;
}

export default CollectionPageSchema;
