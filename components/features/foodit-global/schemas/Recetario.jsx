import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_FOODIT } from 'fusion:environment';

import { fooditSchemaLogo } from './_helpers';

import SnippetRender from '../../../private/common/snippet/snippetRender';
import { BreadcrumbSchema } from './Breadcrumb';

export function RecetarioSchema() {
    const { contextPath, deployment } = useAppContext();

    const recetarioSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `Recetario`,
        url: `${SITE_FOODIT}/recetario/`,
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
                key="recetario-schema"
                id="recetario-schema"
                data={recetarioSchema}
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
