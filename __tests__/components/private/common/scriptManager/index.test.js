import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import ScriptManager from '../../../../../components/private/common/scriptManager';

describe('ScriptManager ...', () => {
    it('... es una function', () => {
        expect(typeof ScriptManager).toEqual('function');
    });

    it('... que requiere un diccionario con al menos un componentes', () => {
        expect(() => ScriptManager()).toThrow();
        expect(() => ScriptManager(1)).toThrow();
        expect(() => ScriptManager('string')).toThrow();
        expect(() => ScriptManager([1, 'string', {}, []])).toThrow();
        expect(() => ScriptManager({})).toThrow();
    });

    it('... que requiere configuracion', () => {
        expect(() => ScriptManager({}, undefined)).toThrow();
    });
});

describe('ScriptManager genera un componente', () => {
    const LOCATION = 'OK';
    class ScriptMock extends Component {
        render() {
            return <script>mock!</script>;
        }
    }
    class ScriptMock2 extends Component {
        render() {
            // if (this.props.location !== LOCATION) return '';

            return <script>mock! 2!</script>;
        }
    }
    class NoSeIncluyeEnDicc extends Component {
        render() {}
    }

    const components = { ScriptMock, ScriptMock2 };
    const name = Object.keys(components)[0];
    const html = '<script>mock!</script>';
    const html2 = '<script>mock! 2!</script>';
    const config = [
        {
            type: name,
            props: { a: 1, b: 2 }
        },
        {
            type: `NoSeIncluyeEnDicc`,
            props: { a: 1, b: 2 }
        },
        {
            type: 'ScriptMock2',
            props: { a: 1, b: 2 }
        }
    ];

    const Script = ScriptManager(components, config);

    it('al que debe indicarse nombre o posicion', () => {
        const error = 'Debe especificar props: location o name';
        expect(() => shallow(<Script />)).toThrowError(error);
        expect(() => shallow(<Script foo="foo" />)).toThrowError(error);

        expect(() => shallow(<Script name="foo" />)).toBeDefined();
        expect(() => shallow(<Script location="foo" />)).toBeDefined();
    });

    // it('el que hace el render de los componentes', () => {
    //     const wrapper = mount(<Script location="ALL" />);

    //     expect(wrapper.html()).toEqual(`${html}`);
    // });

    it('el que hace el render de los componente que coinciden con el nombre', () => {
        const wrapper = mount(<Script name={name} />);

        expect(wrapper.html()).toEqual(`${html}`);
    });

    it('el que hace el render de los componente que coinciden con la ubicación', () => {
        const wrapper = mount(<Script location={LOCATION} />);

        expect(wrapper.props().location).toEqual(LOCATION);
        expect(wrapper.html()).toEqual(`${html}${html2}`);
    });
});
