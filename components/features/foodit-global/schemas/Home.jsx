import React from 'react';
import { useAppContext } from 'fusion:context';
import { fooditSchemaLogo } from './_helpers';
import SnippetRender from '../../../private/common/snippet/snippetRender';

export const HomeSchema = () => {
    const { contextPath, deployment } = useAppContext();

    const data = {
        '@context': 'http://schema.org',
        '@type': 'NewsMediaOrganization',
        name: 'Foodit',
        url: 'https://www.foodit.lanacion.com.ar/',
        description: 'Tu aliado en la cocina - FOODIT',
        alternateName: 'Foodit',
        diversityPolicy:
            'https://www.lanacion.com.ar/sociedad/diversidad-redaccion-nid2413327/',
        ethicsPolicy:
            'https://www.lanacion.com.ar/sociedad/la-nacion-mision-estructura-empresarial-principios-eticos-nid2393569/',
        masthead:
            'https://www.lanacion.com.ar/sociedad/equipo-editorial-la-nacion-nid2390490/',
        publishingPrinciples:
            'https://www.lanacion.com.ar/sociedad/los-veinte-20-principios-del-periodismo-la-nid2390521/',
        verificationFactCheckingPolicy:
            'https://www.lanacion.com.ar/sociedad/verificacion-chequeo-datos-nid2406825/',
        foundingDate: '2024-05-01',
        logo: fooditSchemaLogo(deployment, contextPath),
        sameAs: [
            'https://www.tiktok.com/@fooditar?lang=es',
            'https://www.instagram.com/foodit_ar/',
            'https://x.com/FOODIT_AR',
            'https://ar.pinterest.com/foodit_ar/'
        ]
    };

    return (
        <>
            <SnippetRender id="home-schema" data={data} />
            <SnippetRender
                id="website-schema"
                data={{
                    '@context': 'http://schema.org',
                    '@type': 'WebSite',
                    url: 'https://www.foodit.lanacion.com.ar/'
                }}
            />
        </>
    );
};
