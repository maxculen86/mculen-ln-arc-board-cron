import React from 'react';
import { render, mount } from 'enzyme';
import LinkAmpHTML from '../../../../components/private/common/linkAmpHTML.jsx';

jest.mock('fusion:content', () => ({
    useContent: () => ({
        site: {
            'with-amp': {
                '1': 'nota-noticia',
                '2': 'nota-storytelling'
            }
        }
    })
}));

describe('Private - LN - Common - linkAmpHTML', () => {
    const props = {
        arcSite: 'la-nacion-ar',
        canonicalUrl: '/ciencia/roger-prueba-imagenes-nid28052020/',
        subtype: '1'
    };

    it('Snapshots', () => {
        const component = render(<LinkAmpHTML {...props} />);
        expect(component).toMatchSnapshot();
    });

    it('Render OK', () => {
        const component = render(<LinkAmpHTML {...props} subtype={'1'} />);
        expect(component).toBeDefined();
    });

    it('Render NOTOK', () => {
        const component = mount(<LinkAmpHTML {...props} subtype={'0'} />);
        expect(component.html()).toBeNull();
    });

    it('No debe hacer render de recetas', () => {
        const component = mount(<LinkAmpHTML {...props} subtype={'7'} />);
        expect(component.html()).toBeNull();
    });

    it('Validar props enviadas', () => {
        const component = mount(<LinkAmpHTML {...props} />);
        expect(component.props()).toEqual(props);
    });

    it('Atributos y nodo del DOM correcto', () => {
        const component = mount(<LinkAmpHTML {...props} />);
        expect(component.find('link')).toHaveLength(1);
        expect(component.find('link').props().rel).toEqual('amphtml');
        expect(component.find('link').props().href).toEqual(
            'https://www.lanacion.com.ar/ciencia/roger-prueba-imagenes-nid28052020/?outputType=amp'
        );
    });
});
