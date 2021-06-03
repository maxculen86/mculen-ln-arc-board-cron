import Consumer from 'fusion:consumer';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import colecction from '../../../../../../../../__mocks__/data/collection/OCTOV4V54FCFLJHOVB5IAJKHHM.json';
import get from '../../../../../../../../components/private/common/utils/get';
import GetCajaCollection from '../../../../../../../../components/private/LN/api/v1/home/chains/getCajacollection';
import 'babel-polyfill';
import { create } from 'react-test-renderer';

class TestComponent extends React.Component {
    render() {}
}
describe('Test del private - GetCajaCollection Json', () => {
    const customFields = {
        backgroundColor: 'default',
        hideTitle: false,
        idCollection: 'OCTOV4V54FCFLJHOVB5IAJKHHM',
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

    //const ComponentCajaCollection = GetCajaCollection(props);
    const ComponentCajaCollection = GetCajaCollection(
        <TestComponent customFields={customFields} renderables={renderables} />
    );
    it('Testeo que la propiedad pasada corresponda', () => {
        const component = shallow(
            <ComponentCajaCollection
                customFields={customFields}
                renderables={renderables}
            />
        );
        process.nextTick(() => {
            component.update();
            expect(component.find('state').length).toEqual(0);
            //done();
        });
    });

    test('Test OK', () => {
        const elements = get(articleList, 'content_elements', []);
        const results = {
            information: customFields,
            articles: elements
        };
        expect('OCTOV4V54FCFLJHOVB5IAJKHHM').toMatch(
            results.information.idCollection
        );
        expect('HLOPIMO7PBDXPAB5ACWRGZKTPM').toMatch(results.articles[0]._id);
    });

    test('Test null', () => {
        const elements = get(null, 'content_elements', []);
        expect(elements.length).toBe(0);
    });
});
