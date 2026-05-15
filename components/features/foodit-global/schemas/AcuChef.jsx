import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_FOODIT } from 'fusion:environment';

import { fooditSchemaLogo } from './_helpers';

import SnippetRender from '../../../private/common/snippet/snippetRender';
import { BreadcrumbSchema } from './Breadcrumb';

export function AcuChefSchema() {
    const { contextPath, deployment } = useAppContext();

    const acuSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `Acumulado - Chefs Protagonistas`,
        url: `${SITE_FOODIT}/chefs-protagonistas/`,
        publisher: {
            '@type': 'Organization',
            name: 'Foodit',
            url: `${SITE_FOODIT}/`,
            logo: fooditSchemaLogo(deployment, contextPath)
        }
    };

    return (
        <>
            <SnippetRender key="acu-schema" id="acu-schema" data={acuSchema} />
            <BreadcrumbSchema
                sections={[
                    {
                        name: 'Foodit',
                        url: `${SITE_FOODIT}/`
                    },
                    {
                        name: 'Recetas',
                        url: `${SITE_FOODIT}/recetas/`
                    }
                ]}
            />
        </>
    );
}
