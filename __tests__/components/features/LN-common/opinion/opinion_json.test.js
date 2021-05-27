import colecction from '../../../../../__mocks__/data/collection/OCTOV4V54FCFLJHOVB5IAJKHHM.json';
import get from '../../../../../components/private/common/utils/get';

describe('Test del Chain - Opinion de CajaCollecion Json', () => {
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

    test('Test OK', () => {
        const elements = get(articleList, 'content_elements', []);
        const results = {
            information: customFields,
            articles: elements
        };
        expect('QJ3BOEZVQNEYZEVBXHF4C7KAWY').toMatch(
            results.information.idCollection
        );
        expect('HLOPIMO7PBDXPAB5ACWRGZKTPM').toMatch(results.articles[0]._id);
    });

    test('Test null', () => {
        const elements = get(null, 'content_elements', []);
        expect(elements.length).toBe(0);
    });
});
