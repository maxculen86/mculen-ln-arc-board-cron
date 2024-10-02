import React from 'react';
import { SITE_FOODIT } from 'fusion:environment';
import SnippetRender from '../../../private/common/snippet/snippetRender';

export const HomeSchema = () => {
    return (
        <>
            <SnippetRender
                id="website-schema"
                data={{
                    '@context': 'http://schema.org',
                    '@type': 'WebSite',
                    name: 'Foodit',
                    url: `${SITE_FOODIT}/`
                }}
            />
        </>
    );
};
