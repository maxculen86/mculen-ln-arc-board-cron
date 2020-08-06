import React from 'react';
import { render, mount, shallow } from 'enzyme';

import Html from '../../../../../../components/private/LN/nota/cuerpo/html';

describe('Private - LN - nota - cuerpo - <Html />', () => {
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

    it('<Html/> definido', () => {
        const component = render(<Html {...props} />);
        expect(component).toBeDefined();
    });

    it('Render OK', () => {
        const __html = '<div>sample html block</div>';
        const component = mount(<Html {...setContent(__html)} />);
        expect(component.html()).not.toBeNull();
    });

    it('Render NOTOK', () => {
        const component = mount(<Html {...props} />);
        expect(component.html()).toBeNull();
    });

    it('Validar props enviadas', () => {
        const component = mount(<Html {...props} />);
        expect(component.props()).toEqual(props);
    });

    it('Si no envio props retornar null', () => {
        const component = mount(<Html />);
        expect(component.html()).toBeNull();
    });

    it('Atributos y nodo del DOM correcto - HTML libre', () => {
        const __html =
            '<link rel="stylesheet" href="http://widget.cloud.opta.net/v3/css/v3.football.opta-widgets.css"><div class="empty" style="padding: 20px;background-color:#333;color:white;text-align:center;font-size:2em;">sample html block</div>';
        const component = mount(<Html {...setContent(__html)} />);
        const container = component.find('div.com-embed');
        expect(container.exists()).toBeTruthy();
        expect(container.hasClass('--html')).toBeTruthy();
        //Link
        const link = container
            .render()
            .children()
            .get(0);
        expect(link).toBeDefined();
        expect(link.attribs.rel).toBe('stylesheet');
        expect(link.attribs.href).toBe(
            'http://widget.cloud.opta.net/v3/css/v3.football.opta-widgets.css'
        );
        expect(link.firstChild).toBe(null);

        // Div content
        const content = container
            .render()
            .children()
            .get(1);
        expect(content).toBeDefined();
        expect(content.attribs.class).toBe('empty');
        expect(content.attribs.style).toBe(
            'padding: 20px;background-color:#333;color:white;text-align:center;font-size:2em;'
        );
        expect(content.firstChild.nodeValue).toBe('sample html block');
    });

    // TODO: mockear el Parent del Pym
    it('Atributos y nodo del DOM correcto - HTML con iframe.pym', () => {
        const __html =
            '<iframe class="pym" frameborder="0" width="100%" height="800" scrolling="no" src="https://especialess3.lanacion.com.ar/20/03/coronavirus-argentina/#/barras"> </iframe>';

        const component = shallow(<Html {...setContent(__html)} />);
        expect(component.exists()).toBeTruthy();
        console.log(component.debug());
        expect(component.hasClass('--html')).toBeTruthy();
        const content = component
            .render()
            .children()
            .get(0);
        expect(content).toBeDefined();
        expect(content.attribs.class).toBe('contenido-externo');
        expect(content.childNodes[0].attribs.id).toBe(
            `anexo-${props.data._id}-0`
        );
        expect(content.childNodes[0].attribs.class).toBe('com-anexo pym');
    });

    it('Snapshots - HTML', () => {
        const __html = `<div class="empty" style="padding: 20px;background-color:#333;color:white;text-align:center;font-size:2em;">sample html block</div>`;
        const component = render(<Html {...setContent(__html)} />);
        expect(component).toMatchSnapshot();
    });

    it('Snapshots - iframe sin class "pym"', () => {
        const __html =
            '<iframe frameborder="0" width="100%" height="800" scrolling="no" src="https://especialess3.lanacion.com.ar/20/03/coronavirus-argentina/#/barras"> </iframe>';
        const component = render(<Html {...setContent(__html)} />);
        expect(component).toMatchSnapshot();
    });

    it('Snapshots - iframe con class "pym"', () => {
        const __html =
            '<iframe class="pym" frameborder="0" width="100%" height="800" scrolling="no" src="https://especialess3.lanacion.com.ar/20/03/coronavirus-argentina/#/barras"> </iframe>';

        const component = render(<Html {...setContent(__html)} />);
        expect(component).toMatchSnapshot();
    });

    it('Snapshots - iframe con class "pym" dentro de un bloque HTML', () => {
        const __html =
            '<div class="test">    <h3 class="title">iframe dentro de un div</h3>    <iframe class="pym" frameborder="0" width="100%" height="800" scrolling="no" src="https://especialess3.lanacion.com.ar/tableau/tableau.html?id=coronavirus_tests_argentina_porcentajes&altoTV=460&altoD=460&altoM=410"> </iframe></div>';

        const component = render(<Html {...setContent(__html)} />);
        expect(component).toMatchSnapshot();
    });
});
