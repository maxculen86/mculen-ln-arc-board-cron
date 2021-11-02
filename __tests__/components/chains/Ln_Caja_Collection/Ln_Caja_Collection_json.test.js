import Consumer from 'fusion:consumer';
import React from 'react';
import colecction from '../../../../__mocks__/data/collection/QJ3BOEZVQNEYZEVBXHF4C7KAWY.json';
import get from '../../../../components/private/common/utils/get';
import GetCajaCollection from '../../../../components/private/LN/api/global/v1/home/chains/getCajacollection';

class MockGetCajaCollection extends GetCajaCollection {
    constructor(props) {
        super(props);
    }
    fetchContent(param) {}
}

describe('components - chains - Ln_Caja_Collection - json', () => {
    const customFields = {
        backgroundColor: 'default',
        hideTitle: false,
        idCollection: 'QJ3BOEZVQNEYZEVBXHF4C7KAWY',
        initialPosition: 1,
        layout: 'focalLeft3',
        pbInternal_cloneId: 'c0ffOCwkYqcA22',
        title: 'Apertura'
    };
    const articleList = colecction;
    const renderables = [
        {
            collection: 'chains',
            type: 'Ln_Caja_Collection',
            props: {
                customFields: {
                    idCollection: 'WPDJCUD7RNAQVA4JEPFJYZMCSE',
                    layout: 'grilla3',
                    initialPosition: 1
                },
                id: 1
            }
        },
        {
            collection: 'chains',
            type: 'Ln_Caja_Collection',
            props: {
                customFields: {
                    idCollection: 'WPDJCUD7RNAQVA4JEPFJYZMCSE',
                    layout: 'grilla3',
                    initialPosition: 4
                },
                id: 2
            }
        }
    ];
    const props = {};
    props.customFields = customFields;
    props.renderables = renderables;
    test('Test props into class', () => {
        const CajaCollection = new MockGetCajaCollection(props);
        expect(Object.keys(CajaCollection).sort()).toEqual(
            ['getQueryElement', 'props', 'state'].sort()
        );
    });

    test('Test render when articleList is Ok', () => {
        try {
            const CajaCollection = new MockGetCajaCollection(props);
            CajaCollection.state.articleList = colecction;
            CajaCollection.state.containerImage = null;
            const result = CajaCollection.render();
            expect(Object.keys(result).sort()).toEqual(
                ['articles', 'information'].sort()
            );
            expect(result.articles.length).toBe(11);
        } catch (err) {
            expect(err.message).toBe(
                `Cannot read property 'additionalProperties' of null`
            );
        }
    });

    test('Test render when articleList is null', () => {
        const CajaCollection = new MockGetCajaCollection(props);
        CajaCollection.state.articleList = null;
        CajaCollection.state.containerImage = null;
        const result = CajaCollection.render();
        expect(result.Message).toBe(`Cannot read property 'length' of null`);
    });
});
