import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Robot from '../../../../components/private/common/robot.jsx';

describe('Private - LN - Common - robot', () => {
    const props = {
        canonicalUrl: '/politica/nota-prueba-storytelling-nid26052020/',
        hasAmpLink: 'nota-noticia'
    };

    it('Render OK', () => {
        const { container } = render(<Robot {...props} />);
        expect(container).toBeVisible();
    });

    it('Render NOTOK', () => {
        const { container } = render(<Robot {...props} hasAmpLink={false} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('Validar props enviadas', () => {
        const { container } = render(<Robot {...props} />);
        const link = container.getElementsByTagName('link');
        expect(link[0].href).toEqual(
            `https://www.lanacion.com.ar${props.canonicalUrl}`
        );
    });

    it('Si no envio props retornar null', () => {
        const { container } = render(<Robot />);
        expect(container).toBeEmptyDOMElement();
    });

    it('Atributos y nodo del DOM correcto', () => {
        const { container } = render(<Robot {...props} />);
        const link = container.getElementsByTagName('link');
        expect(link).toHaveLength(1);
        expect(link[0].rel).toEqual('canonical');
        expect(link[0].href).toEqual(
            'https://www.lanacion.com.ar/politica/nota-prueba-storytelling-nid26052020/'
        );
    });

    it('Snapshots', () => {
        const { container } = render(<Robot {...props} />);
        expect(container).toMatchSnapshot();
    });
});
