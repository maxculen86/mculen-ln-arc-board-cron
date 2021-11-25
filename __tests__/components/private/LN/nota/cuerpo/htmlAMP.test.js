import React from 'react';
import { render, mount, shallow } from 'enzyme';
import { parse } from 'node-html-parser';
import HtmlAMP from '../../../../../../components/private/LN/nota/cuerpo/htmlAMP';
describe('Private - LN - nota - cuerpo - HtmlAMP', () => {
    let props = {
        data: {
            content: '',
            _id: 'AHYEKXSUEQIUXZD'
        }
    };
    const setContent = content => {
        return {
            ...props,
            data: {
                ...props.data,
                content
            }
        };
    };
    test('<HtmlAMP/> definido', () => {
        const component = render(<HtmlAMP {...props} />);
        expect(component).toBeDefined();
    });
    test('when Render Null', () => {
        const __html =
            '<div>sample html block<iframe class="anexo pym" id="LNcreativa" frameborder="0" width="100%" height="1200" scrolling="no" src="https://www.padron.gob.ar/"></iframe></div>';
        const component = mount(<HtmlAMP {...setContent(__html)} />);
        expect(component.html()).toBeNull();
    });
    test('Render NOTOK', () => {
        const component = mount(<HtmlAMP {...props} />);
        expect(component.html()).toBeNull();
    });
    test('Validar props enviadas', () => {
        const component = mount(<HtmlAMP {...props} />);
        expect(component.props()).toEqual(props);
    });
    test('Si no envio props retornar null', () => {
        const component = mount(<HtmlAMP />);
        expect(component.html()).toBeNull();
    });
    test('Snapshots - iframe con class "pym match with snapShot"', () => {
        const __html =
            '<iframe class="pym" frameborder="0" width="100%" height="800" scrolling="no" src="https://especialess3.lanacion.com.ar/20/03/coronavirus-argentina/#/barras"> </iframe>';
        const component = render(<HtmlAMP {...setContent(__html)} />);
        expect(component).toMatchSnapshot();
    });
    test('Snapshots - return null con iframe anidado dentro de un div', () => {
        const __html =
            '<div class="test">    <h3 class="title">iframe dentro de un div</h3>    <iframe class="pym" frameborder="0" width="100%" height="800" scrolling="no" src="https://especialess3.lanacion.com.ar/tableau/tableau.html?id=coronavirus_tests_argentina_porcentajes&altoTV=460&altoD=460&altoM=410"> </iframe></div>';
        const component = render(<HtmlAMP {...setContent(__html)} />);
        expect(component).toMatchSnapshot();
    });
});
