import React from 'react';
import { render } from '@testing-library/react';
import MetaFoodit from '../../../../../../components/features/foodit-global/common/MetaFoodit/foodit';

jest.mock('fusion:environment', () => {
    return {
        SITE_FOODIT: 'https://foodit.lanacion.com.ar',
        ARC_STATIC: 'https://arc-static.glanacion.com'
    };
});

describe('components - feature - foodit-glogal - common - MetaFoodit', () => {
    it('renders title and meta tags correctly', () => {
        const globalContent = {
            type: 'story',
            publish_date: '2024-02-20T14:12:07.090Z'
        };
        const siteProperties = {
            shareConfig: {
                facebook: {
                    appID: '11111112222222333333'
                }
            }
        };
        const deployment = jest.fn(() => '/ogimage');
        const metaValue = jest.fn(name => {
            const options = {
                title: 'Arroz chaufa de mariscos',
                description:
                    'demostracion de arroz chaufa de mariscos perfectos para invierno'
            };

            return options[name];
        });

        render(
            <MetaFoodit
                globalContent={globalContent}
                siteProperties={siteProperties}
                deployment={deployment}
                metaValue={metaValue}
            />
        );
        expect(document.title).toBe('Arroz chaufa de mariscos');

        const metaTitle = document.head.querySelector(
            'meta[name="title"][content="Arroz chaufa de mariscos"]'
        );
        expect(metaTitle).toBeTruthy();

        const metaOGTitle = document.head.querySelector(
            'meta[property="og:title"][content="Arroz chaufa de mariscos"]'
        );
        expect(metaOGTitle).toBeTruthy();

        const metaDescription = document.head.querySelector(
            'meta[name="description"][content="demostracion de arroz chaufa de mariscos perfectos para invierno"]'
        );
        expect(metaDescription).toBeTruthy();

        const metaOGDescription = document.head.querySelector(
            'meta[property="og:description"][content="demostracion de arroz chaufa de mariscos perfectos para invierno"]'
        );
        expect(metaOGDescription).toBeTruthy();

        const fbApp = document.head.querySelector(
            'meta[property="fb:app_id"][content="11111112222222333333"]'
        );
        expect(fbApp).toBeTruthy();

        const OGType = document.head.querySelector(
            'meta[property="og:type"][content="article"]'
        );
        expect(OGType).toBeTruthy();

        const OGImage = document.head.querySelector(
            'meta[property="og:image"][content="https://arc-static.glanacion.com/ogimage"]'
        );
        expect(OGImage).toBeTruthy();

        const OGUrl = document.head.querySelector(
            'meta[property="og:url"][content="https://foodit.lanacion.com.ar/"]'
        );
        expect(OGUrl).toBeTruthy();

        const OGSiteName = document.head.querySelector(
            'meta[property="og:site_name"][content="Foodit"]'
        );
        expect(OGSiteName).toBeTruthy();

        const publishDate = document.head.querySelector(
            'meta[property="article:published_time"][content="2024-02-20T14:12:07.090Z"]'
        );
        expect(publishDate).toBeTruthy();
    });

    it('renders title and meta tags correctly NOT story', () => {
        const globalContent = {
            type: 'other',
            _id: '/recetas/saladas',
            publish_date: '2024-02-20T14:12:07.090Z'
        };
        const siteProperties = {
            shareConfig: {
                facebook: {
                    appID: '11111112222222333333'
                }
            }
        };
        const deployment = jest.fn(() => '/ogimage');
        const metaValue = jest.fn();

        render(
            <MetaFoodit
                globalContent={globalContent}
                siteProperties={siteProperties}
                deployment={deployment}
                metaValue={metaValue}
            />
        );
        expect(document.title).toBe('Foodit');

        const metaTitle = document.head.querySelector(
            'meta[name="title"][content="Foodit"]'
        );
        expect(metaTitle).toBeTruthy();

        const metaOGTitle = document.head.querySelector(
            'meta[property="og:title"][content="Foodit"]'
        );
        expect(metaOGTitle).toBeTruthy();

        const metaDescription = document.head.querySelector(
            'meta[name="description"][content="Foodit"]'
        );
        expect(metaDescription).toBeTruthy();

        const metaOGDescription = document.head.querySelector(
            'meta[property="og:description"][content="Foodit"]'
        );
        expect(metaOGDescription).toBeTruthy();

        const fbApp = document.head.querySelector(
            'meta[property="fb:app_id"][content="11111112222222333333"]'
        );
        expect(fbApp).toBeTruthy();

        const OGType = document.head.querySelector(
            'meta[property="og:type"][content="website"]'
        );
        expect(OGType).toBeTruthy();

        const OGImage = document.head.querySelector(
            'meta[property="og:image"][content="https://arc-static.glanacion.com/ogimage"]'
        );
        expect(OGImage).toBeTruthy();

        const OGUrl = document.head.querySelector(
            'meta[property="og:url"][content="https://foodit.lanacion.com.ar/recetas/saladas/"]'
        );
        expect(OGUrl).toBeTruthy();

        const OGSiteName = document.head.querySelector(
            'meta[property="og:site_name"][content="Foodit"]'
        );
        expect(OGSiteName).toBeTruthy();

        const publishDate = document.head.querySelector(
            'meta[property="article:published_time"][content="2024-02-20T14:12:07.090Z"]'
        );
        expect(publishDate).toBeFalsy();
    });
});
