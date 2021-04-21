import React from 'react';
import { render, mount } from 'enzyme';
import Robot from '../../../../components/private/common/robot.jsx';

jest.mock('fusion:content', () => ({
    useContent: () => ({
            '1': 'nota-noticia',
            '4': 'nota-storytelling'
    })
}));

describe('Private - LN - Common - robot', () => {
    const props = {
        arcSite: 'la-nacion-ar',
        canonicalUrl: '/politica/nota-prueba-storytelling-nid26052020/',
        subtype: '4'
    };

    it('Render OK', () => {
        const component = render(<Robot {...props} />);
        expect(component).toBeDefined();
    });

    it('Render NOTOK', () => {
        const component = mount(<Robot {...props} subtype={'0'} />);
        expect(component.html()).toBeNull();
    });

    it('Validar props enviadas', () => {
        const component = mount(<Robot {...props} />);
        expect(component.props()).toEqual(props);
    });

    it('Si no envio props retornar null', () => {
        const component = mount(<Robot />);
        expect(component.html()).toBeNull();
    });

    it('Atributos y nodo del DOM correcto', () => {
        const component = mount(<Robot {...props} />);
        expect(component.find('link')).toHaveLength(1);
        expect(component.find('link').props().rel).toEqual('canonical');
        expect(component.find('link').props().href).toEqual(
            'https://www.lanacion.com.ar/politica/nota-prueba-storytelling-nid26052020/'
        );
    });

    it('Snapshots', () => {
        const component = render(<Robot {...props} />);
        expect(component).toMatchSnapshot();
    });
});
