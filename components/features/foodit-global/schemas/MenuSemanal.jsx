import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_FOODIT } from 'fusion:environment';

import { fooditSchemaLogo } from './_helpers';

import SnippetRender from '../../../private/common/snippet/snippetRender';
import { BreadcrumbSchema } from './Breadcrumb';

export function MenuSemanalSchema() {
    const { contextPath, deployment } = useAppContext();

    const menuSemanalSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `Mi menu semanal`,
        url: `${SITE_FOODIT}/mi-menu-semanal/`,
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
                key="mi-menu-semanal-schema"
                id="mi-menu-semanal-schema"
                data={menuSemanalSchema}
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
