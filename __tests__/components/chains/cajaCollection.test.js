import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
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

jest.mock(
    '../../../components/private/LN/acumulado/hooks/useGlobalProviderAcu.js',
    () => jest.fn()
);

const MockCajaCollection = jest.fn(() => null);

jest.mock(
    '../../../components/chains/Ln_Caja_Collection/default.jsx',
    () => props => {
        MockCajaCollection(props);
        return null;
    }
);

jest.mock('../../../components/private/common/hooks/useTermica', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Test of the Chain - <Ln_Caja_Collection />', () => {
    const idCollection = 'WPDJCUD7RNAQVA4JEPFJYZMCSE';
    const title = 'Caja Tema';
    const collectionsInPage = [
        {
            idCollection: 'WPDJCUD7RNAQVA4JEPFJYZMCSE',
            articles: [
                { _id: 'LX2MDOW4NZF6DONWUQZPS4AHKM' },
                { _id: 'VNGGPUOJQNE4BEIRXOF36Q34K4' },
                { _id: 'QONFVVZ7FZECXHNW2EKEUKOIXQ' },
                { _id: 'FUO2YR3EABBAFOMSI2BBS6J7FM' },
                { _id: 'AVYWDWDAVVESZGD7HXMW46GTYA' },
                { _id: 'VD7B5NVJQFEVDP4CACDCKLACFQ' },
                { _id: 'C5FCAISVEBE5BH5SLWSAWB2VKI' },
                { _id: 'ZZZZ' },
                { _id: 'XXXX' }
            ]
        },
        {
            idCollection: 'QJ3BOEZVQNEYZEVBXHF4C7KAWY',
            articles: []
        }
    ];
    const articlesFromAutomatic = [
        { _id: 'LX2MDOW4NZF6DONWUQZPS4AHKM' },
        { _id: 'C5FCAISVEBE5BH5SLWSAWB2VKI' },
        { _id: 'BBB', label: {} },
        { _id: 'DDD', label: { recomendar: { text: 'No' } } },
        { _id: 'CCC', label: { recomendar: { text: 'Si' } } }
    ];

    const customFields = {
        idCollection,
        title,
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

    beforeEach(() => {
        MockCajaCollection.mockClear();
    });

    it('Mounts the component', () => {
        render(<CajaCollection customFields={customFields} />);
        expect(MockCajaCollection).toHaveBeenCalledTimes(1);
    });

    it('Receives customFields', () => {
        render(<CajaCollection customFields={customFields} />);
        const callProps = MockCajaCollection.mock.calls[0][0];
        expect(callProps.customFields).toEqual(customFields);
    });

    it('Receives required idCollection from custom fields', () => {
        render(<CajaCollection customFields={customFields} />);
        const callProps = MockCajaCollection.mock.calls[0][0];
        expect(callProps.customFields.idCollection).toBeTruthy();
        expect(callProps.customFields.idCollection).toBe(idCollection);
    });

    it('Receives required initialPosition from custom fields', () => {
        render(<CajaCollection customFields={customFields} />);
        const callProps = MockCajaCollection.mock.calls[0][0];
        expect(callProps.customFields.initialPosition).toBeTruthy();
        expect(callProps.customFields.initialPosition).toBe(1);
    });

    it('Receives optional title from custom fields', () => {
        render(<CajaCollection customFields={customFields} />);
        const callProps = MockCajaCollection.mock.calls[0][0];
        expect(callProps.customFields.title).toBeTruthy();
        expect(callProps.customFields.title).toBe(title);
    });

    it('Returns common props', () => {
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

    it('Should set the size of the collection in 12', () => {
        const size1 = calculateSizeOfCollection(collectionsInPage, 3);
        expect(size1).toBe(12);
    });

    it('Should set the size of the collection in 20', () => {
        const size1 = calculateSizeOfCollection(collectionsInPage, 30);
        expect(size1).toBe(20);
    });

    it('Returns an array of ids of articles to exclude', () => {
        const idsArticlesToExclude = getIdsArticlesFromOtherCollections(
            renderables,
            collectionsInPage
        );
        expect(idsArticlesToExclude.length).toBe(6);
    });

    it('Should filter 1 note of the automatic collection already present in manual (case 1)', () => {
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

    it('Should filter 1 note of the automatic collection already present in manual (case 2)', () => {
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

    it('Should bring 5 items even though 10 were ordered', () => {
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

    it('Detects that the collection is in Apertura', () => {
        const result = isInApertura('aaa', tree);
        expect(result).toBeDefined();
    });

    it('Detects that the collection is not in Apertura', () => {
        const result = isInApertura('bbb', tree);
        expect(result).toBeUndefined();
    });

    const collectionsInPage2 = [
        {
            idCollection: 'WPDJCUD7RNAQVA4JEPFJYZMCSE',
            articles: [
                { _id: 'LX2MDOW4NZF6DONWUQZPS4AHKM' },
                { _id: 'VNGGPUOJQNE4BEIRXOF36Q34K4' },
                { _id: 'QONFVVZ7FZECXHNW2EKEUKOIXQ' },
                { _id: 'FUO2YR3EABBAFOMSI2BBS6J7FM' }
            ]
        },
        {
            idCollection: 'QJ3BOEZVQNEYZEVBXHF4C7KAWY',
            articles: []
        }
    ];

    it('Should bring the first 3 items from the collection of 4', () => {
        const articles1 = getArticlesFromMyCurrentCollection(
            collectionsInPage2,
            idCollection,
            0,
            3
        );
        expect(articles1.length).toBe(3);
        expect(articles1[0]._id).toBe('LX2MDOW4NZF6DONWUQZPS4AHKM');
    });

    it('Should bring the 2nd and 3rd items from the collection of 4', () => {
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

    it('Should return an empty array if the collection does not exist.', () => {
        const articles3 = getArticlesFromMyCurrentCollection(
            [],
            idCollection,
            1,
            3
        );
        expect(articles3.length).toBe(0);
    });

    it('Should return an empty array if it goes outside the collections array.', () => {
        const articles4 = getArticlesFromMyCurrentCollection(
            collectionsInPage2,
            idCollection,
            5,
            3
        );
        expect(articles4.length).toBe(0);
    });

    it('Should return an empty array if the collectionsInPage object does not have the articles prop', () => {
        const articles4 = getArticlesFromMyCurrentCollection(
            [{ idCollection: 'WPDJCUD7RNAQVA4JEPFJYZMCSE' }],
            idCollection,
            1,
            3
        );
        expect(articles4.length).toBe(0);
    });

    it('Returns datalayer markup for Opinion layout', () => {
        const { extraOptsDiv, extraOpts } = getMarkupForDatalayer(
            'Opinion',
            '',
            0,
            ''
        );
        expect(Object.keys(extraOptsDiv).length).toEqual(1);
        expect(extraOpts['data-block-name']).toEqual('h_opinion');
    });

    it('Returns layout type mapping', () => {
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

    it('Returns datalayer markup for Editoriales layout', () => {
        const { extraOptsDiv, extraOpts } = getMarkupForDatalayer(
            'Editoriales',
            '',
            0,
            ''
        );
        expect(Object.keys(extraOptsDiv).length).toEqual(1);
        expect(extraOpts['data-block-name']).toEqual('h_editoriales');
    });

    it('Returns datalayer markup for generic layout', () => {
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
