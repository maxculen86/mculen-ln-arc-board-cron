jest.mock(
    '../../../components/chains/cajaTemaAutomatic.jsx',
    () => 'mock-component'
);

import React from 'react';
import { mount } from 'enzyme';
import CajaTemaAutomatic from '../../../components/chains/cajaTemaAutomatic.jsx';
import { calculateSizeOfCollection, getArticlesFromMyCurrentCollection, getArticlesToShow } from '../../../components/private/LN/common/utils/cajaTemasHelper.js';

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
                }

            ]
        },
        {
            idCollection: 'QJ3BOEZVQNEYZEVBXHF4C7KAWY',
            articles: [
                
            ]
        }
    ];
    const articlesFromAutomatic = [
        {
            _id: 'LX2MDOW4NZF6DONWUQZPS4AHKM'
        },
        {
            _id: 'BBB'
        },
        {
            _id: 'CCC'
        },
        {
            _id: 'DDD'
        }
    ]

    const customFields = {
         idCollection: idCollection,
         title: title,
         layout: 'grilla3',
         backgroundColor: '--pink',
         initialPosition: 1,
         hideTitle: false
    };

    const childProps = [
        { collection: 'features', type: 'LN-home/noteFeature' },
        { collection: 'features', type: 'LN-home/noteFeature' },
        { collection: 'features', type: 'LN-home/noteFeature' }
    ];

    const component = mount(<CajaTemaAutomatic customFields={customFields}></CajaTemaAutomatic>);

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
        expect(mock.props('customFields').customFields.initialPosition).toBe(
            1
        );
    });

    it('Recibe de customFields el campo opcional title', () => {
        expect(mock.props('customFields').customFields.title).toBeTruthy();
        expect(mock.props('customFields').customFields.title).toBe(title);
    });

    it('Deberia setear el size de la collection en 7', () => {
        const size1 = calculateSizeOfCollection(collectionsInPage, 3);
        expect(size1).toBe(7);
    });
    it('Deberia setear el size de la collection en 20', () => {
        const size1 = calculateSizeOfCollection(collectionsInPage, 30);
        expect(size1).toBe(20);
    });

    it('Deberia filtrar 1 nota de la collection automatica que ya esta en la manual', () => {
        const articles1 = getArticlesToShow(
            articlesFromAutomatic,
            collectionsInPage,
            1,
            3
        );
        expect(articles1.length).toBe(3);
        expect(articles1[0]._id).toBe('BBB');   
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
