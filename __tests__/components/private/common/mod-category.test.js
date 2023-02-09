import React from 'react';
import Consumer from 'fusion:consumer';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModCategory from '../../../../components/private/common/mod-category';

describe('components - private - common - mod-category', () => {
    const props = {
        revista: 'QJFKLBWXHVGUFA3O65BIHPFILA',
        category: 'Economía',
        style: {
            color: '#d83e2c'
        },
        navigation: [
            {
                key: 'link-E7JA39MVEN0QQC4TM0UVGEM6JW',
                link: 'https://www.lanacion.com.ar/dolar-hoy/',
                textname: 'Dólar hoy',
                title: 'Ir a Dólar hoy',
                style: {
                    color: '#d83e2c'
                }
            },
            {
                key: 'link-2HHC4226W90FBE7W248NEFNDVC',
                link: 'https://www.lanacion.com.ar/economia/indices/',
                textname: 'Índices',
                title: 'Ir a Índices',
                style: {
                    color: '#d83e2c'
                }
            },
            {
                key: '/economia/campo',
                link: '/economia/campo/',
                textname: 'Campo',
                title: 'Ir a Campo',
                style: {
                    color: '#d83e2c'
                }
            },
            {
                key: '/economia/negocios',
                link: '/economia/negocios/',
                textname: 'Negocios',
                title: 'Ir a Negocios',
                style: {
                    color: '#d83e2c'
                }
            },
            {
                key: 'link-HBNZD3H8FH1516540X8ZY6WY8G',
                link:
                    'https://www.lanacion.com.ar/tema/emprendedores-tid53673/',
                textname: 'Emprendedores',
                title: 'Ir a Emprendedores',
                style: {
                    color: '#d83e2c'
                }
            },
            {
                key: '/propiedades',
                link: '/propiedades/',
                textname: 'Propiedades',
                title: 'Ir a Propiedades',
                style: {
                    color: '#d83e2c'
                }
            }
        ],
        image: {
            _id: 'QJFKLBWXHVGUFA3O65BIHPFILA',
            additional_properties: {
                fullSizeResizeUrl:
                    '/resizer/_MmFmAPC_WuvOYwLGZF6WDHtTrk=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/QJFKLBWXHVGUFA3O65BIHPFILA.png',
                ingestionMethod: 'manual',
                mime_type: 'image/png',
                originalName: 'Negocios.png',
                originalUrl:
                    'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/QJFKLBWXHVGUFA3O65BIHPFILA.png',
                owner: 'fcaino@lanacion.com.ar',
                proxyUrl:
                    '/resizer/_MmFmAPC_WuvOYwLGZF6WDHtTrk=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/QJFKLBWXHVGUFA3O65BIHPFILA.png',
                published: true,
                resizeUrl:
                    '/resizer/_MmFmAPC_WuvOYwLGZF6WDHtTrk=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/QJFKLBWXHVGUFA3O65BIHPFILA.png',
                restricted: false,
                thumbnailResizeUrl:
                    '/resizer/4k0wAlN5ZAi_AL9oO-9Kj8AWjZw=/300x0/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/QJFKLBWXHVGUFA3O65BIHPFILA.png',
                version: 0,
                template_id: 770
            },
            alt_text: 'Comunidad de Negocios',
            auth: {
                '1':
                    'b1f465d487636a7dae933cad88352b2ce5132e417f87dd5a7f09c917aa463bc5'
            },
            caption: 'Comunidad de Negocios',
            copyright: 'LA NACION',
            created_date: '2021-01-18T18:18:49Z',
            credits: {
                affiliation: []
            },
            height: 90,
            image_type: 'photograph',
            last_updated_date: '2021-01-18T18:18:49Z',
            licensable: false,
            owner: {
                id: 'sandbox.lanacionar',
                sponsored: false
            },
            source: {
                additional_properties: {
                    editor: 'photo center'
                },
                edit_url:
                    'https://sandbox.lanacionar.arcpublishing.com/photo/QJFKLBWXHVGUFA3O65BIHPFILA',
                system: 'photo center'
            },
            taxonomy: {
                associated_tasks: []
            },
            type: 'image',
            url:
                'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/QJFKLBWXHVGUFA3O65BIHPFILA.png',
            version: '0.10.3',
            width: 285,
            syndication: {}
        },
        outputType: 'default',
        url: 'https://www.lanacion.com.ar/economia/'
    };
    describe('Mod category snapshot test', () => {
        const { container } = render(<ModCategory {...props} />);
        test('Snapshot and check values from attributos loading and getchPriority', () => {
            expect(container).toMatchSnapshot();
            expect(
                screen.getByRole('img').getAttribute('fetchpriority')
            ).toEqual('high');
            expect(screen.getByRole('img').getAttribute('loading')).toEqual(
                'eager'
            );
        });
    });
});
