import { getDataPreloadAcu } from '../../../../../components/private/common/utils/preloadHelper';

describe('Preload helper', () => {
    const cases = [
        ['QJ3BOEZVQNEYZEVBXHF4C7KAWY', 'section', '', 'aperturaAcu'],
        ['', 'section', 'section', 'boxArticles'],
        ['', '', '', 'boxArticles'],
        ['QJ3BOEZVQNEYZEVBXHF4C7KAWY', '', '', 'aperturaAcu']
    ];
    test.each(cases)(
        'should return data of preload %p as idCollection and %p as nodeType',
        (idCollection, nodeType, expectNodeType, expectImageConfig) => {
            const dataPreloadAcu = getDataPreloadAcu(idCollection, nodeType);
            expect(dataPreloadAcu.collectionId).toEqual(idCollection);
            expect(dataPreloadAcu.imageConfig).toEqual(expectImageConfig);
            expect(dataPreloadAcu.nodeType).toEqual(expectNodeType);
        }
    );
});
