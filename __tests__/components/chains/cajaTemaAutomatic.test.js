jest.mock(
    '../../../components/chains/cajaTemaAutomatic.jsx',
    () => 'mock-component'
);

import React from 'react';
import { mount } from 'enzyme';
import CajaTemaAutomatic from '../../../components/chains/cajaTemaAutomatic.jsx';
import {
    calculateSizeOfCollection,
    getIdsArticlesFromOtherCollections
} from '../../../components/private/LN/common/utils/cajaTemasHelper.js';
import { getArticlesToShow } from '../../../content/sources/utils/collectionsHelper.js';

describe('Test del Chain - <CajaTema />', () => {
    const idCollection = 'WPDJCUD7RNAQVA4JEPFJYZMCSE';
    const title = 'Caja Tema';
    const collectionsInPage = [
        {
            idCollection: 'WPDJCUD7RNAQVA4JEPFJYZMCSE',
            articles: [
                {
                    _id: 'LX2MDOW4NZF6DONWUQZPS4AHKM'
                },
                {
                    _id: 'VNGGPUOJQNE4BEIRXOF36Q34K4'
                },
                {
                    _id: 'QONFVVZ7FZECXHNW2EKEUKOIXQ'
                },
                {
                    _id: 'FUO2YR3EABBAFOMSI2BBS6J7FM'
                },
                {
                    _id: 'AVYWDWDAVVESZGD7HXMW46GTYA'
                },
                {
                    _id: 'VD7B5NVJQFEVDP4CACDCKLACFQ'
                },
                {
                    _id: 'C5FCAISVEBE5BH5SLWSAWB2VKI'
                },
                {
                    _id: 'ZZZZ'
                },
                {
                    _id: 'XXXX'
                }
            ]
        },
        {
            idCollection: 'QJ3BOEZVQNEYZEVBXHF4C7KAWY',
            articles: []
        }
    ];
    const articlesFromAutomatic = [
        {
            _id: 'LX2MDOW4NZF6DONWUQZPS4AHKM'
        },
        {
            _id: 'C5FCAISVEBE5BH5SLWSAWB2VKI'
        },
        {
            _id: 'BBB',
            label: {}
        },
        {
            _id: 'DDD',
            label: { recomendar: { text: 'No' } }
        },
        {
            _id: 'CCC',
            label: { recomendar: { text: 'Si' } }
        }
    ];

    const customFields = {
        idCollection: idCollection,
        title: title,
        layout: 'grilla3',
        backgroundColor: '--pink',
        initialPosition: 1,
        hideTitle: false
    };

    const renderables = [
        {
            collection: 'chains',
            type: 'cajaTemaCollections',
            props: {
                customFields: {
                    idCollection: 'WPDJCUD7RNAQVA4JEPFJYZMCSE',
                    layout: 'grilla3',
                    initialPosition: 1
                }
            }
        },
        {
            collection: 'chains',
            type: 'cajaTemaCollections',
            props: {
                customFields: {
                    idCollection: 'WPDJCUD7RNAQVA4JEPFJYZMCSE',
                    layout: 'grilla3',
                    initialPosition: 4
                }
            }
        }
    ];

    const childProps = [
        { collection: 'features', type: 'LN-home/noteFeature' },
        { collection: 'features', type: 'LN-home/noteFeature' },
        { collection: 'features', type: 'LN-home/noteFeature' }
    ];

    const component = mount(
        <CajaTemaAutomatic customFields={customFields}></CajaTemaAutomatic>
    );

    const mock = component.find('mock-component');
    it('Montaje del componente', () => {
        expect(mock.length).toBe(1);
    });

    it('Recibe customFields', () => {
        expect(mock.props('customFields').customFields).toBeTruthy();
        expect(mock.props('customFields').customFields).toEqual(customFields);
    });

    it('Recibe de customFields el campo obligatorio idCollection', () => {
        expect(
            mock.props('customFields').customFields.idCollection
        ).toBeTruthy();
        expect(mock.props('customFields').customFields.idCollection).toBe(
            idCollection
        );
    });

    it('Recibe de customFields el campo obligatorio initialPosition', () => {
        expect(
            mock.props('customFields').customFields.initialPosition
        ).toBeTruthy();
        expect(mock.props('customFields').customFields.initialPosition).toBe(1);
    });

    it('Recibe de customFields el campo opcional title', () => {
        expect(mock.props('customFields').customFields.title).toBeTruthy();
        expect(mock.props('customFields').customFields.title).toBe(title);
    });

    it('Deberia setear el size de la collection en 7', () => {
        const size1 = calculateSizeOfCollection(collectionsInPage, 3);
        expect(size1).toBe(12);
    });

    it('Deberia setear el size de la collection en 20', () => {
        const size1 = calculateSizeOfCollection(collectionsInPage, 30);
        expect(size1).toBe(20);
    });

    it('Deberia traer un array de ids de articulos a excluir', () => {
        const idsArticlesToExclude = getIdsArticlesFromOtherCollections(
            renderables,
            collectionsInPage
        );
        expect(idsArticlesToExclude.length).toBe(6);
    });

    it('Deberia filtrar 1 nota de la collection automatica que ya esta en la manual', () => {
        const idsArticlesToExclude = getIdsArticlesFromOtherCollections(
            renderables,
            collectionsInPage
        );

        const articles1 = getArticlesToShow(
            articlesFromAutomatic,
            idsArticlesToExclude,
            0,
            2
        );
        expect(articles1.length).toBe(2);
        expect(articles1[0]._id).toBe('C5FCAISVEBE5BH5SLWSAWB2VKI');
    });

    it('Deberia filtrar 1 nota que ya esta en la manual', () => {
        const idsArticlesToExclude = getIdsArticlesFromOtherCollections(
            renderables,
            collectionsInPage
        );

        const articles2 = getArticlesToShow(
            articlesFromAutomatic,
            idsArticlesToExclude,
            0,
            3
        );
        expect(articles2.length).toBe(3);
        expect(articles2[0]._id).toBe('C5FCAISVEBE5BH5SLWSAWB2VKI');
        expect(articles2[1]._id).toBe('BBB');
        expect(articles2[2]._id).toBe('DDD');
    });

    it('Deberia traer un array vacio cuando sobrepasa la posicion de la colleccion', () => {
        const articles2 = getArticlesToShow(
            articlesFromAutomatic,
            collectionsInPage,
            5,
            3
        );
        expect(articles2.length).toBe(0);
    });
});
