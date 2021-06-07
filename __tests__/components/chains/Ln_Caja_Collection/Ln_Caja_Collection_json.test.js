import Consumer from 'fusion:consumer';
import React from 'react';
import colecction from '../../../../__mocks__/data/collection/OCTOV4V54FCFLJHOVB5IAJKHHM.json';
import get from '../../../../components/private/common/utils/get';
import GetCajaCollection from '../../../../components/private/LN/api/v1/home/chains/getCajacollection';
import filter from '../../../../content/filters/LN/acumulado/articleHomeMobile';
//import * as ChainCajaCollection from '../../../../components/chains/Ln_Caja_Collection/json';

const mockfetchContent = jest.fn();
jest.mock('../../../../content/filters/LN/acumulado/articleHomeMobile', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => {})
}));

class MockAuthService extends GetCajaCollection {
    constructor(props) {
        super(props);
    }
    fetchContent(param) {}
    isAuthenticated() {
        return 'Mocked';
    }
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
    props.fetchContent = mockfetchContent;
    test('Test props into class', () => {
        const CajaCollection = new MockAuthService(props);
        expect(Object.keys(CajaCollection).sort()).toEqual(
            ['getQueryElement', 'props', 'state'].sort()
        );
    });
});
