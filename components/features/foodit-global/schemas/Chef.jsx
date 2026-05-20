import React from 'react';

import { SITE_FOODIT } from 'fusion:environment';

import { transformSocial } from '../../private-global/common/utils/transformSocial';
import SnippetRender from '../../../private/common/snippet/snippetRender';

export function ChefSchema({ globalContent = {} }) {
    const {
        byline = '',
        bio_page: bioPage = '',
        image: { url: imageUrl = '' } = {},
        email = '',
        location = '',
        role = '',
        instagram = '',
        youtube = '',
        pinterest = '',
        twitter = ''
    } = globalContent;

    const socialNetworks = [
        transformSocial('instagram', instagram),
        transformSocial('youtube', youtube),
        transformSocial('pinterest', pinterest),
        transformSocial('twitter', twitter)
    ]
        .filter(social => Boolean(social.name))
        .map(social => social?.href || '');

    const chefUrl = `${SITE_FOODIT}${bioPage.replace(
        'autor',
        'chefs-protagonistas'
    )}`;

    const chefSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: byline,
        url: chefUrl,
        image: imageUrl,
        jobTitle: role,
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: role,
            url: chefUrl,
            email
        },
        sameAs: socialNetworks,
        nationality: location
    };

    return <SnippetRender id="chef-schema" data={chefSchema} />;
}
