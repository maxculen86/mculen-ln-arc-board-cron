jest.mock('fusion:content', () => ({
    useContent: () => ({
        _id: '/',
        _website: 'la-nacion-ar',
        name: 'LA NACION',
        node_type: 'section',
        children: [
            {
                _id: '/economia/dolar',
                _website: 'la-nacion-ar',
                name: 'Dólar Hoy',
                node_type: 'section'
            },
            {
                _id: '/economia/comercio-exterior',
                _website: 'la-nacion-ar',
                name: 'Comercio Exterior',
                node_type: 'section'
            },
            {
                _id: '/economia/campo',
                _website: 'la-nacion-ar',
                name: 'Campo',
                node_type: 'section'
            },
            {
                _id: '/economia/industria',
                _website: 'la-nacion-ar',
                name: 'Industria',
                node_type: 'section'
            },
            {
                _id: '/economia/empleos',
                _website: 'la-nacion-ar',
                name: 'Empleos',
                node_type: 'section'
            }
        ]
    })
}));
jest.mock(
    '../../../../../../components/private/LN/acumulado/acumuladoTitle',
    () => 'acumulado-title-mock'
);
import React from 'react';
import { render, shallow } from 'enzyme';
import withAcuCategories from '../../../../../../components/private/LN/acumulado/hocs/withAcuCategories';
import filter from '../../../../../../content/filters/LN/acumulado/collections';
import AcumuladoTitle from '../../../../../../components/private/LN/acumulado/acumuladoTitle';
const navigationManual = [
    {
        _id: '/economia/campo',
        _website: 'la-nacion-ar',
        name: 'Campo',
        node_type: 'section'
    },
    {
        _id: '/economia/comercio-exterior',
        _website: 'la-nacion-ar',
        name: 'Comercio Exterior',
        node_type: 'section'
    },
    {
        _id: '/economia/dolar',
        _website: 'la-nacion-ar',
        name: 'Dólar Hoy',
        node_type: 'section'
    },
    {
        _id: '/economia/industria',
        _website: 'la-nacion-ar',
        name: 'Industria',
        node_type: 'section'
    },
    {
        _id: '/economia/empleos',
        _website: 'la-nacion-ar',
        name: 'Empleos',
        node_type: 'section'
    }
];
const navigationAutomatica = [
    {
        _id: '/economia/campo',
        _website: 'la-nacion-ar',
        name: 'Campo',
        node_type: 'section'
    },
    {
        _id: '/economia/comercio-exterior',
        _website: 'la-nacion-ar',
        name: 'Comercio Exterior',
        node_type: 'section'
    },
    {
        _id: '/economia/dolar',
        _website: 'la-nacion-ar',
        name: 'Dólar Hoy',
        node_type: 'section'
    },
    {
        _id: '/economia/industria',
        _website: 'la-nacion-ar',
        name: 'Industria',
        node_type: 'section'
    },
    {
        _id: '/economia/empleos',
        _website: 'la-nacion-ar',
        name: 'Empleos',
        node_type: 'section'
    }
];
describe('Private - Common - hocs - withAcuCategories => ', () => {
    const props = {
        globalContent: {
            acumuladoGeneral: { hierarchy_navigation: 'Economy' },
            children: navigationAutomatica,
            _id: '/economia'
        }
    };
    const component = props => <AcumuladoTitle {...props} />;
    const ComponentWithAcuCategories = withAcuCategories(
        component(props),
        filter,
        'la-nacion-ar'
    );
    it('Render OK', () => {
        const wrapper = shallow(<ComponentWithAcuCategories {...props} />);
        expect(wrapper).toBeDefined();
    });
    it('Render NOTOK', () => {
        const props = {};
        const component = props => <AcumuladoTitle {...props} />;
        const ComponentWithAcuCategories = withAcuCategories(
            component(props),
            filter,
            'la-nacion-ar'
        );
        const wrapper = shallow(<ComponentWithAcuCategories {...props} />);
        expect(wrapper).toBeDefined();
        expect(wrapper.first().props().navigation).toBe(undefined);
        expect(wrapper.first().props().isPrimarySection).toBe(undefined);
    });
    it('Prioridad navegación manual', () => {
        const wrapper = shallow(<ComponentWithAcuCategories {...props} />);
        expect(wrapper.first()).toBeTruthy();
        expect(wrapper.first().props().navigation).toStrictEqual(
            navigationManual
        );
    });
    it('Ocultar navegación automática / manual', () => {
        const _props = {
            ...props,
            globalContent: {
                ...props.globalContent
            },
            hideCategories: 'true'
        };
        const wrapper = shallow(<ComponentWithAcuCategories {..._props} />);
        expect(wrapper.first().props().navigation).toStrictEqual(false);
    });
});