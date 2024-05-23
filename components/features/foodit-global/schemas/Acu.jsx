import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_FOODIT } from 'fusion:environment';
import { fooditSchemaLogo } from './_helpers';
import SnippetRender from '../../../private/common/snippet/snippetRender';

export const AcuSchema = ({ id = '', title = '' }) => {
    const { contextPath, deployment } = useAppContext();

    const acuSchema = {
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        name: `Acumulado - ${title}`,
        url: `${SITE_FOODIT}${id}`,
        publisher: {
            '@type': 'Organization',
            name: 'Foodit',
            logo: fooditSchemaLogo(deployment, contextPath)
        }
    };

    return <SnippetRender id="acu-schema" data={acuSchema} />;
};
