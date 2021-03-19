jest.mock('../../../../components/layouts/LN-Home_Sports/default.jsx', () => 'mock-component');

import React from 'react';
import { mount } from 'enzyme';
import LNHomeLayout from '../../../../components/layouts/LN-Home_Sports/default.jsx';

describe('Test del Layout - <LNHomeLayout />', () => {
    const isAdmin = true;
    const children = ['Children 1', 'Children 2'];
    const sections = ['Sección Apertura', 'Sección Caja de Tema'];
    const renderables = [
        {
            collection: 'layouts',
            type: 'LN-home',
            props: {
                key: 'LN-home',
                collection: 'layouts',
                type: 'LN-home',
                childProps: [{}, {}]
            },
            children: [{}, {}]
        },
        {
            collection: 'sections',
            props: { key: 0, collection: 'sections', id: 0 },
            children: [
                {
                    collection: 'chains',
                    type: 'apertura',
                    props: {},
                    children: [{}, {}, {}, {}, {}, {}]
                }
            ]
        },
        {
            collection: 'sections',
            props: { key: 1, collection: 'sections', id: 1 },
            children: [
                {
                    collection: 'chains',
                    type: 'cajaTema',
                    props: {},
                    children: [{}, {}, {}]
                }
            ]
        }
    ];

    const component = mount(
        <LNHomeLayout
            isAdmin={isAdmin}
            children={children}
            sections={sections}
            renderables={renderables}
        ></LNHomeLayout>
    );

    const mock = component.find('mock-component');
    it('Montaje del componente', () => {
        expect(mock.length).toBe(1);
    });

    it('Recibe isAdmin', () => {
        expect(mock.props('isAdmin').isAdmin).toBeTruthy();
        expect(mock.props('isAdmin').isAdmin).toEqual(isAdmin);
    });
    it('Recibe children', () => {
        expect(mock.props('children').children).toBeTruthy();
        expect(mock.props('children').children).toEqual(children);
    });
    it('Recibe renderables', () => {
        expect(mock.props('renderables').renderables).toBeTruthy();
        expect(mock.props('renderables').renderables).toEqual(renderables);
    });
    it('Recibe sections', () => {
        expect(mock.props('sections').sections).toBeTruthy();
        expect(mock.props('sections').sections).toEqual(sections);
    });
});
