import React from 'react';

import { SITE_FOODIT } from 'fusion:environment';
import { useAppContext } from 'fusion:context';

import transformSocial from '../../private-global/common/utils/transformSocial';
import SnippetRender from '../../../private/common/snippet/snippetRender';

export const ChefSchema = ({ globalContent = {} }) => {
    const {
        byline = '',
        bio_page = '',
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

    const { contextPath, deployment } = useAppContext();
    const chefUrl = deployment(
        `${SITE_FOODIT}${contextPath}${bio_page.replace(
            'author',
            'chefs-protagonistas'
        )}`
    );

    const chefSchema = {
        '@context': 'http://schema.org',
        '@type': 'Person',
        name: byline,
        url: bio_page,
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
