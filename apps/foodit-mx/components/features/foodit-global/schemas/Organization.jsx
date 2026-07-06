import React from 'react';
import { SITE_FOODIT } from 'fusion:environment';
import SnippetRender from '../../../private/common/snippet/snippetRender';
import { fooditSchemaLogo } from './_helpers';

export function OrganizationSchema(props) {
    const { contextPath, deployment } = props;

    return (
        <SnippetRender
            id="foodit-organization-schema"
            data={{
                '@context': 'https://schema.org',
                '@type': 'Organization',
                '@id': `${SITE_FOODIT}/#organization`,
                name: 'Foodit',
                url: `${SITE_FOODIT}/`,
                logo: fooditSchemaLogo(deployment, contextPath),
                email: 'atencionfoodit@lanacion.com.ar',
                parentOrganization: {
                    '@id': 'https://www.lanacion.com.ar/#organization'
                },
                sameAs: [
                    'https://www.instagram.com/foodit_ar/',
                    'https://x.com/FOODIT_AR',
                    'https://www.facebook.com/people/Fooditar/61558653507465/',
                    'https://www.tiktok.com/@fooditar?lang=es'
                ]
            }}
        />
    );
}
