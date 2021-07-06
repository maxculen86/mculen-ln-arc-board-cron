import React from 'react';
import Consumer from 'fusion:consumer';
import colecction from '../../../../../__mocks__/data/collection/WM5DMXURZJBZZASUK356FPQNUI.json';
import get from '../../../../../components/private/common/utils/get';
import Opinion from '../../../../../components/features/LN-common/opinion/json';
import * as CajaCollection from '../../../../../components/chains/Ln_Caja_Collection/json';

jest.mock(
    '../../../../../components/chains/Ln_Caja_Collection/json',
    component => {
        return function(component) {
            return {
                state: {
                    articleList: component.articles
                }
            };
        };
    }
);

const customFields = {
    layout: 'opinion4',
    initialPosition: 1,
    hideTitle: true,
    idCollection: 'WM5DMXURZJBZZASUK356FPQNUI'
};
const articleList = colecction;
const props = {};
props.customFields = customFields;

describe('components - features - LN-common - opinion -json.js', () => {
    const elements = get(articleList, 'content_elements', []);
    const articles = elements.map(e => {
        return {
            ...e,
            additionalProperties: {
                subtype: 1
            }
        };
    });
    const results = {
        information: customFields,
        articles
    };
    const results2 = {
        information: customFields
    };
    test('Test props into class', () => {
        const opinion = new Opinion(props);
        expect(Object.keys(opinion).sort()).toEqual(
            ['articulos', 'props'].sort()
        );
    });

    test('Test results render into class OK', () => {
        props.articles = articleList;
        const opinion = new Opinion(props);
        const result = opinion.render();

        expect(result.information).toMatchObject({
            layout: 'opinion4',
            initialPosition: 1,
            hideTitle: true,
            idCollection: 'WM5DMXURZJBZZASUK356FPQNUI'
        });
        expect(result.articles[0].additionalProperties).toMatchObject({
            subtype: 1
        });
    });
    test('Test OK properties article', () => {
        expect('WM5DMXURZJBZZASUK356FPQNUI').toMatch(
            results.information.idCollection
        );
        expect('4QYCKI34WZBHXIWYHE236U663A').toMatch(results.articles[0]._id);
    });

    test('Test results render into class when articles is null', () => {
        try {
            props.articles = null;
            const opinion = new Opinion(null);
            const result = opinion.render();
            expect(result).toBe(null);
        } catch (err) {
            expect(err.message).toBe(`Cannot read property 'articles' of null`);
        }
    });
    test('Test results render into class when articles is null', () => {
        props.articles = null;
        const opinion = new Opinion(props);
        const result = opinion.render();
        expect(result).toBe(null);
    });
});
