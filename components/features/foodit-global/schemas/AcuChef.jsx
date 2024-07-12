import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_FOODIT } from 'fusion:environment';

import { fooditSchemaLogo } from './_helpers';
import { getFooditAcuTitle } from '../common/breadcrumb/_helpers';

import SnippetRender from '../../../private/common/snippet/snippetRender';
import { BreadcrumbSchema } from './Breadcrumb';

export const AcuChefSchema = ({ globalContent = {} }) => {
    const { _id = '' } = globalContent;
    const title = getFooditAcuTitle(globalContent);

    const { contextPath, deployment } = useAppContext();

    const acuSchema = {
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        name: `Acumulado - ${title}`,
        url: `${SITE_FOODIT}${_id}`,
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
                        name: 'Chefs protagonistas',
                        url: `/chefs-protagonistas/`
                    }
                ]}
            />
        </>
    );
};
