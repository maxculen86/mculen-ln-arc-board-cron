import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_FOODIT } from 'fusion:environment';

import { fooditSchemaLogo } from './_helpers';

import SnippetRender from '../../../private/common/snippet/snippetRender';
import { BreadcrumbSchema } from './Breadcrumb';

export function ListaComprasSchema() {
    const { contextPath, deployment } = useAppContext();

    const listaComprasSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `Lista de compras`,
        url: `${SITE_FOODIT}/lista-de-compras/`,
        publisher: {
            '@type': 'Organization',
            name: 'Foodit',
            url: `${SITE_FOODIT}/`,
            logo: fooditSchemaLogo(deployment, contextPath)
        }
    };

    return (
        <>
            <SnippetRender
                key="listado-compras-schema"
                id="listado-compras-schema"
                data={listaComprasSchema}
            />
            <BreadcrumbSchema
                sections={[
                    {
                        name: 'Foodit',
                        url: `${SITE_FOODIT}/`
                    }
                ]}
            />
        </>
    );
}
