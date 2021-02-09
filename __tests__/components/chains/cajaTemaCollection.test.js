jest.mock(
    '../../../components/chains/cajaTemaCollections.jsx',
    () => 'mock-component'
);

import React from 'react';
import { mount } from 'enzyme';
import CajaTemaCollections from '../../../components/chains/cajaTemaCollections.jsx';
import { getArticlesFromMyCurrentCollection } from '../../../components/private/LN/common/utils/cajaTemasHelper.js';

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

    const component = mount(<CajaTemaCollections customFields={customFields}></CajaTemaCollections>);

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



    it('Deberia traer los 3 primeros articulos de mi collection de 4', () => {
        const articles1 = getArticlesFromMyCurrentCollection(
            collectionsInPage,
            idCollection,
            0,
            3
        );
        expect(articles1.length).toBe(3);
        expect(articles1[0]._id).toBe('LX2MDOW4NZF6DONWUQZPS4AHKM');   
    });

    it('Deberia traer el 2do y 3er articulo de mi collection de 4', () => {
        const articles2 = getArticlesFromMyCurrentCollection(
            collectionsInPage,
            idCollection,
            1,
            2
        );
        expect(articles2.length).toBe(2);
        expect(articles2[0]._id).toBe('VNGGPUOJQNE4BEIRXOF36Q34K4');
        expect(articles2[1]._id).toBe('QONFVVZ7FZECXHNW2EKEUKOIXQ');
        
    });

    it('Deberia traer un array vacio si no existe mi collection', () => {
        const articles3 = getArticlesFromMyCurrentCollection(
            [],
            idCollection,
            1,
            3
        );
        expect(articles3.length).toBe(0);
    });

    it('Deberia traer un array vacio si me salgo del array de collections', () => {
        const articles4 = getArticlesFromMyCurrentCollection(
            collectionsInPage,
            idCollection,
            5,
            3
        );
        expect(articles4.length).toBe(0);
    });

    it('Deberia traer un array vacio si mi objeto collectionsInPage no tiene la prop articles', () => {
        const articles4 = getArticlesFromMyCurrentCollection(
            [{idCollection: 'WPDJCUD7RNAQVA4JEPFJYZMCSE'}],
            idCollection,
            1,
            3
        );
        expect(articles4.length).toBe(0);
    });

});
