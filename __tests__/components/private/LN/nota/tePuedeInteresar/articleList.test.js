jest.mock(
    '../../../../../../components/private/LN/nota/tePuedeInteresar/article',
    () => 'mocked-article'
);

import Context from 'fusion:context';
import Consumer from 'fusion:consumer';

import React from 'react';
import { mount } from 'enzyme';
import ArticleList from '../../../../../../components/private/LN/nota/tePuedeInteresar/articleList';
import article from '../../../../../../components/private/LN/nota/tePuedeInteresar/article';

describe('components - private - LN - nota - tePuedeInteresar - articleList', () => {
    const articles = [
        {
            type: 'story',
            subtype: 1,
            by: {},
            website_url: '/recetas/platos-principales/soy-una-nota',
            _id: 'TWKFZQ6FCNF3ZKPHGGZPMSSOGQ',
            headlines: {
                basic: 'Soy una nota'
            },
            promo_items: {
                type: 'image',
                url:
                    'https://arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/YL34KDWR5BAODJ6GW2YUHBU7BU.jpg'
            }
        },
        {
            type: 'story',
            subtype: 1,
            by: {},
            website_url: '/recetas/platos-principales/soy-una-nota',
            _id: 'TWKFZQ6FCNF3ZKPHGGZPMSSOGQ',
            headlines: {
                basic: 'Soy una nota'
            },
            promo_items: {
                type: 'image',
                url:
                    'https://arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/YL34KDWR5BAODJ6GW2YUHBU7BU.jpg'
            }
        },
        {
            type: 'story',
            subtype: 1,
            by: {},
            website_url: '/recetas/platos-principales/soy-una-nota',
            _id: 'TWKFZQ6FCNF3ZKPHGGZPMSSOGQ',
            headlines: {
                basic: 'Soy una nota'
            },
            promo_items: {
                type: 'image',
                url:
                    'https://arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/YL34KDWR5BAODJ6GW2YUHBU7BU.jpg'
            }
        },
        {
            type: 'story',
            subtype: 1,
            by: {},
            website_url: '/recetas/platos-principales/soy-una-nota',
            _id: 'TWKFZQ6FCNF3ZKPHGGZPMSSOGQ',
            headlines: {
                basic: 'Soy una nota'
            },
            promo_items: {
                type: 'image',
                url:
                    'https://arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/YL34KDWR5BAODJ6GW2YUHBU7BU.jpg'
            }
        }
    ];

    const component = mount(<ArticleList articles={articles} />);
    const articlesComponents = component.find('mocked-article');
    it('Chequeo que contenga todos los articulos que le pase', () => {
        expect(articlesComponents.length).toBe(articles.length);
    });
    it('Chequeo que el primer articulo componente tenga las mismas props que el primer articulo dato', () => {
        const firstArticleComponentData = articlesComponents
            .first()
            .prop('articleData');
        const firstArticleData = articles[0];
        expect(firstArticleComponentData.website_url).toBe(
            firstArticleData.website_url
        );
        expect(firstArticleComponentData.promo_items.url).toBe(
            firstArticleData.promo_items.url
        );
        expect(firstArticleComponentData.headlines.basic).toBe(
            firstArticleData.headlines.basic
        );
        expect(firstArticleComponentData._id).toBe(firstArticleData._id);
    });
});
