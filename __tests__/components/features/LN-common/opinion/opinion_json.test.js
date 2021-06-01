import Consumer from 'fusion:consumer';
import colecction from '../../../../../__mocks__/data/collection/WM5DMXURZJBZZASUK356FPQNUI.json';
import get from '../../../../../components/private/common/utils/get';
import Opinion from '../../../../../components/features/LN-common/opinion/json.js';

describe('Test del Chain - Opinion de CajaCollecion Json', () => {
    const customFields = {
        backgroundColor: 'default',
        hideTitle: false,
        idCollection: 'WM5DMXURZJBZZASUK356FPQNUI',
        initialPosition: 1,
        layout: 'focalLeft3',
        pbInternal_cloneId: 'c0ffOCwkYqcA22',
        title: 'Apertura'
    };
    const articleList = colecction;

    const props = {};
    props.customFields = customFields;
    test('Test props into class', () => {
        const opinion = new Opinion(props);
        expect(opinion.props.customFields).toMatchObject(customFields);
    });

    test('Test OK', () => {
        const elements = get(articleList, 'content_elements', []);
        const results = {
            information: customFields,
            articles: elements
        };
        expect('WM5DMXURZJBZZASUK356FPQNUI').toMatch(
            results.information.idCollection
        );
        expect('4QYCKI34WZBHXIWYHE236U663A').toMatch(results.articles[0]._id);
    });

    test('Test null', () => {
        const elements = get(null, 'content_elements', []);
        expect(elements.length).toBe(0);
    });
});
