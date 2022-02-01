jest.mock(
    '../../../components/chains/Ln_Caja_Collection/default.jsx',
    () => 'mock-component'
);

import React from 'react';
import { mount } from 'enzyme';
import {
    calculateSizeOfCollection,
    getCommonProps,
    getLayoutType,
    getMarkupForDatalayer,
    isInApertura
} from '../../../components/private/LN/common/utils/cajaTemasHelper.js';
import {
    getArticlesFromMyCurrentCollection,
    getIdsArticlesFromOtherCollections
} from '../../../components/private/LN/common/utils/cajaTemasValidators';
import { getArticlesToShow } from '../../../content/sources/utils/collectionsHelper.js';
import CajaCollection from '../../../components/chains/Ln_Caja_Collection/default.jsx';
import useGlobalProviderAcu from '../../../components/private/LN/acumulado/hooks/useGlobalProviderAcu.js';

jest.mock(
    '../../../components/private/LN/acumulado/hooks/useGlobalProviderAcu.js',
    () => jest.fn()
);

describe('Test del Chain - <Ln_Caja_Collection />', () => {
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

    const childProps = [
        { collection: 'features', type: 'LN-home/noteFeature' },
        { collection: 'features', type: 'LN-home/noteFeature' },
        { collection: 'features', type: 'LN-home/noteFeature' }
    ];

    const component = mount(<CajaCollection customFields={customFields} />);

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

    it('Deberia traer propiedades en comun', () => {
        const props = {
            customFields,
            renderables,
            id: 2,
            globalContent: {
                name: 'Economía',
                acumuladoGeneral: {
                    usa_datalayer: 'true'
                }
            }
        };
        const {
            collectionsInPage,
            notesQuantity,
            bgColor,
            classCondition,
            position,
            sectionName
        } = getCommonProps(props);
        expect(collectionsInPage.length).toBe(0);
        expect(bgColor).toBe('--bgcolor ');
        expect(position).toBe('02');
        expect(notesQuantity).toBe(3);
        expect(classCondition).toBe('');
        expect(sectionName).toBe('economia_');

        props.globalContent.acumuladoGeneral.usa_datalayer = 'false';
        const { position: positionFalse } = getCommonProps(props);
        expect(positionFalse).toBe(false);
    });

    // Collections del tipo automatica
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
            2,
            articlesFromAutomatic,
            idsArticlesToExclude
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
            3,
            articlesFromAutomatic,
            idsArticlesToExclude
        );
        expect(articles2.length).toBe(3);
        expect(articles2[0]._id).toBe('C5FCAISVEBE5BH5SLWSAWB2VKI');
        expect(articles2[1]._id).toBe('BBB');
        expect(articles2[2]._id).toBe('DDD');
    });

    it('Deberia traer 5 articulos a pesar que pedi 10', () => {
        const articles2 = getArticlesToShow(10, articlesFromAutomatic, []);
        expect(articles2.length).toBe(5);
    });

    const tree = {
        children: [
            { children: [] },
            { children: [] },
            { children: [] },
            { children: [] },
            { children: [{ props: { id: 'aaa' } }] },
            { children: [] }
        ]
    };

    it('Deberia decirme que la caja esta en Apertura', () => {
        const result = isInApertura('aaa', tree);
        expect(result).toBeDefined();
    });

    it('Deberia decirme que la caja NO esta en Apertura', () => {
        const result = isInApertura('bbb', tree);
        expect(result).toBeUndefined();
    });

    // Collections del tipo Manual
    const collectionsInPage2 = [
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
            articles: []
        }
    ];

    it('Deberia traer los 3 primeros articulos de mi collection de 4', () => {
        const articles1 = getArticlesFromMyCurrentCollection(
            collectionsInPage2,
            idCollection,
            0,
            3
        );
        expect(articles1.length).toBe(3);
        expect(articles1[0]._id).toBe('LX2MDOW4NZF6DONWUQZPS4AHKM');
    });

    it('Deberia traer el 2do y 3er articulo de mi collection de 4', () => {
        const articles2 = getArticlesFromMyCurrentCollection(
            collectionsInPage2,
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
            collectionsInPage2,
            idCollection,
            5,
            3
        );
        expect(articles4.length).toBe(0);
    });

    it('Deberia traer un array vacio si mi objeto collectionsInPage no tiene la prop articles', () => {
        const articles4 = getArticlesFromMyCurrentCollection(
            [{ idCollection: 'WPDJCUD7RNAQVA4JEPFJYZMCSE' }],
            idCollection,
            1,
            3
        );
        expect(articles4.length).toBe(0);
    });

    it('Deberia traer los datos de dataLyer para Layout Opinion', () => {
        const { extraOptsDiv, extraOpts } = getMarkupForDatalayer(
            'Opinion',
            '',
            0,
            ''
        );
        expect(Object.keys(extraOptsDiv).length).toEqual(0);
        expect(extraOpts['data-block-name']).toEqual('h_opinion');
    });

    it('Deberia traer los datos de dataLyer para Layout Opinion', () => {
        const layout1 = getLayoutType('grilla3', [[]], []);
        const layout2 = getLayoutType('opinion4', [[]], []);
        const layout3 = getLayoutType('editoriales2', [[]], []);
        const layout4 = getLayoutType('focal', [[]], []);
        const layout5 = getLayoutType('xx', [], [[]]);
        expect(layout1).toEqual('Grilla');
        expect(layout2).toEqual('Opinion');
        expect(layout3).toEqual('Editoriales');
        expect(layout4).toEqual('Focal');
        expect(layout5).toEqual('ArticleFeature');
    });

    it('Deberia traer los datos de dataLyer para Layout Editoriales', () => {
        const { extraOptsDiv, extraOpts } = getMarkupForDatalayer(
            'Editoriales',
            '',
            0,
            ''
        );
        expect(Object.keys(extraOptsDiv).length).toEqual(0);
        expect(extraOpts['data-block-name']).toEqual('h_editoriales');
    });

    it('Deberia traer los datos de dataLyer para Layout generico', () => {
        const { extraOptsDiv, extraOpts } = getMarkupForDatalayer(
            '',
            'grilla3',
            '00',
            'deportes_'
        );
        expect(extraOptsDiv['data-module']).toEqual('tema_00');
        expect(extraOpts['data-block-name']).toEqual('h_deportes_tema-00');
        expect(extraOpts['data-diagramacion-id']).toEqual('grilla3');
        expect(extraOpts['data-is-block']).toEqual(true);
        expect(extraOpts.id).toEqual('tema_00');
    });
});
