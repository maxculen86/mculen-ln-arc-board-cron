import React from 'react';
import Consumer from 'fusion:consumer';
import colecction from '../../../../../__mocks__/data/collection/IZK32Y5I6BF4PNU6E3R2IBMZZI.json';
import get from '../../../../../components/private/common/utils/get';
import Editoriales from '../../../../../components/features/LN-common/editoriales/json';
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
    layout: 'editoriales2',
    initialPosition: 1,
    hideTitle: true,
    idCollection: 'IZK32Y5I6BF4PNU6E3R2IBMZZI'
};
const articleList = colecction;
const props = {};
props.customFields = customFields;

describe('components - features - LN-common - editoriales -json.js', () => {
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
    test('Test props into class', () => {
        const editorial = new Editoriales(props);
        expect(Object.keys(editorial).sort()).toEqual(
            ['articulos', 'props'].sort()
        );
    });

    test('Test results render into class OK', () => {
        props.articles = articleList;
        const editorial = new Editoriales(props);
        const result = editorial.render();

        expect(result.information).toMatchObject({
            layout: 'editoriales2',
            initialPosition: 1,
            hideTitle: true,
            idCollection: 'IZK32Y5I6BF4PNU6E3R2IBMZZI'
        });
        expect(result.articles[0].additionalProperties).toMatchObject({
            subtype: 2
        });
    });
    test('Test OK properties article', () => {
        expect('IZK32Y5I6BF4PNU6E3R2IBMZZI').toMatch(
            results.information.idCollection
        );
        expect('46P7NCPKIZAE5CY2LULAHCIMFQ').toMatch(results.articles[0]._id);
    });

    test('Test results render into class when articles is null', () => {
        try {
            props.articles = null;
            const editorial = new Editoriales(null);
            const result = editorial.render();
            expect(result).toBe(null);
        } catch (err) {
            expect(err.message).toBe(`Cannot read property 'articles' of null`);
        }
    });
    test('Test results render into class when articles is null', () => {
        props.articles = null;
        const editorial = new Editoriales(props);
        const result = editorial.render();
        expect(result).toBe(null);
    });
});
