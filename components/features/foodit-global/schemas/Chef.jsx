import React from 'react';

import { SITE_FOODIT } from 'fusion:environment';
import { useAppContext } from 'fusion:context';

import SnippetRender from '../../../private/common/snippet/snippetRender';

export const ChefSchema = ({
    name = '',
    url = '',
    imageUrl = '',
    email = '',
    socialNetworks = [],
    location = '',
    role = ''
}) => {
    const { contextPath, deployment } = useAppContext();
    const chefUrl = deployment(
        `${SITE_FOODIT}${contextPath}${url.replace(
            'author',
            'chefs-protagonistas'
        )}`
    );

    const chefSchema = {
        '@context': 'http://schema.org',
        '@type': 'Person',
        name: name,
        url: chefUrl,
        image: imageUrl,
        jobTitle: role,
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: role,
            url: chefUrl,
            email: email
        },
        sameAs: socialNetworks,
        nationality: location
    };

    return <SnippetRender id="chef-schema" data={chefSchema} />;
};
