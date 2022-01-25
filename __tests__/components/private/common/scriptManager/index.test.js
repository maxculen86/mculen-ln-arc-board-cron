/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import ScriptManager, {
    ERRORS
} from '../../../../../components/private/common/scriptManager';

describe('ScriptManager ...', () => {
    it('... es una function', () => {
        expect(typeof ScriptManager).toEqual('function');
    });

    it('... que requiere un array con al menos un componente', () => {
        expect(() => ScriptManager()).toThrowError(ERRORS.ARGUMENTS_COMPONENTS);
        expect(() => ScriptManager(1)).toThrowError(
            ERRORS.ARGUMENTS_COMPONENTS
        );
        expect(() => ScriptManager('string')).toThrowError(
            ERRORS.ARGUMENTS_COMPONENTS
        );
        expect(() => ScriptManager([1, 'string', {}, []])).toThrowError(
            ERRORS.ARGUMENTS_COMPONENTS
        );
        expect(() => ScriptManager({})).toThrowError(
            ERRORS.ARGUMENTS_COMPONENTS
        );
    });

    // it('... que requiere configuracion', () => {
    //     expect(() => ScriptManager({ foo: 'foo' }, undefined)).toThrowError(
    //         ERRORS.ARGUMENTS_COMPONENTS
    //     );
    // });
});

describe('ScriptManager genera un builder', () => {
    const LOCATION = 'OK';

    // eslint-disable-next-line react/prefer-stateless-function
    class NoSeIncluyeEnDicc extends Component {
        render() {
            return <script {...this.props}>NoSeIncluyeEnDicc</script>;
        }
    }

    // eslint-disable-next-line react/prefer-stateless-function
    class ScriptMock extends Component {
        render() {
            return <script {...this.props}>ScriptMock</script>;
        }
    }

    // eslint-disable-next-line react/prefer-stateless-function
    class OtroScriptMock extends Component {
        render() {
            const { location } = this.props;

            if (location !== LOCATION) return '';

            return <script {...this.props}>OtroScriptMock</script>;
        }
    }

    const components = { ScriptMock, OtroScriptMock };
    const rnd = Math.floor(Math.random() * 1000);
    const config = {
        ScriptMock: {
            location: ['foo'],
            props: { value: rnd }
        },
        OtroScriptMock: {
            location: ['OK', 'foo']
        }
    };

    const Script = ScriptManager(components, config, null);

    it('al que debe indicarse nombre o posicion', () => {
        const error = 'Debe especificar props: location o name';
        expect(() => shallow(<Script />)).toThrowError(error);
        expect(() => shallow(<Script foo="foo" />)).toThrowError(error);
    });

    it('el que hace el render de los componente que coinciden con el nombre', () => {
        const wrapper = mount(<Script name="ScriptMock" />);

        expect(wrapper.html()).toEqual(
            `<script value="${rnd}">ScriptMock</script>`
        );

        expect(() => shallow(<Script name="foo" />)).toBeDefined();
    });

    it('el que NO hace el render de los componente que NO coinciden con el nombre', () => {
        const wrapper = mount(<Script name="otroName" />);

        expect(wrapper.html()).toBeNull();
    });

    it('el que hace el render de los componente que coinciden con la ubicación', () => {
        const wrapper = mount(<Script location={LOCATION} />);

        expect(wrapper.props().location).toEqual(LOCATION);
        expect(wrapper.html()).toEqual(
            `<script location="${LOCATION}">OtroScriptMock</script>`
        );

        expect(() => shallow(<Script location="foo" />)).toBeDefined();
    });
});
