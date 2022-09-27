import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LinkAmpHTML from '../../../../components/private/common/linkAmpHTML.jsx';

describe('Private - LN - Common - linkAmpHTML', () => {
    const props = {
        canonicalUrl: '/ciencia/roger-prueba-imagenes-nid28052020/',
        hasAmpLink: 'nota-noticia'
    };

    it('Render OK', () => {
        const { container } = render(<LinkAmpHTML {...props} />);
        expect(container).toBeVisible();
    });

    it('Render NOTOK', () => {
        const { container } = render(
            <LinkAmpHTML {...props} hasAmpLink={false} />
        );
        expect(container).toBeEmptyDOMElement();
    });

    it('Validate sent props', () => {
        const { container } = render(<LinkAmpHTML {...props} />);
        const link = container.getElementsByTagName('link');
        expect(link[0].href).toEqual(
            `https://www.lanacion.com.ar${props.canonicalUrl}?outputType=amp`
        );
    });

    it('If no props are sended return empty dom element', () => {
        const { container } = render(<LinkAmpHTML />);
        expect(container).toBeEmptyDOMElement();
    });

    it('Should have the correct DOM attributes', () => {
        const { container } = render(<LinkAmpHTML {...props} />);
        const link = container.getElementsByTagName('link');
        expect(link).toHaveLength(1);
        expect(link[0].rel).toEqual('amphtml');
        expect(link[0].href).toEqual(
            'https://www.lanacion.com.ar/ciencia/roger-prueba-imagenes-nid28052020/?outputType=amp'
        );
    });

    it('Snapshots', () => {
        const { container } = render(<LinkAmpHTML {...props} />);
        expect(container).toMatchSnapshot();
    });
});
