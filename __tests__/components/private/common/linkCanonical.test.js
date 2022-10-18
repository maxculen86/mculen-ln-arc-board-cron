import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LinkCanonical from '../../../../components/private/common/linkCanonical';

describe('Private - LN - Common - LinkCanonical', () => {
    describe('At homepage', () => {
        const props = {
            host: 'https://www.lanacion.com.ar',
            canonicalUrl: '',
            nodeType: 'home'
        };

        it('Should render OK', () => {
            const { container } = render(<LinkCanonical {...props} />);
            expect(container).toBeVisible();
            expect(container).not.toBeEmptyDOMElement();
        });

        it('Should have the correct DOM attributes form canonical link', () => {
            const { container } = render(<LinkCanonical {...props} />);
            const link = container.getElementsByTagName('link');
            expect(link).toHaveLength(1);
            expect(link[0].rel).toEqual('canonical');
            expect(link[0].href).toEqual('https://www.lanacion.com.ar/');
        });

        it('Snapshot link canonical homepage', () => {
            const { container } = render(<LinkCanonical {...props} />);
            expect(container).toMatchSnapshot();
        });
    });

    describe('At note', () => {
        const props = {
            host: 'https://www.lanacion.com.ar',
            canonicalUrl: '/ciencia/roger-prueba-imagenes-nid28052020/',
            nodeType: ''
        };

        it('Should render OK', () => {
            const { container } = render(<LinkCanonical {...props} />);
            expect(container).toBeVisible();
            expect(container).not.toBeEmptyDOMElement();
        });

        it('Validate sent props', () => {
            const { container } = render(<LinkCanonical {...props} />);
            const link = container.getElementsByTagName('link');
            expect(link[0].href).toEqual(`${props.host}${props.canonicalUrl}`);
        });

        it('Should have the correct DOM attributes', () => {
            const { container } = render(<LinkCanonical {...props} />);
            const link = container.getElementsByTagName('link');
            expect(link).toHaveLength(1);
            expect(link[0].rel).toEqual('canonical');
            expect(link[0].href).toEqual(
                'https://www.lanacion.com.ar/ciencia/roger-prueba-imagenes-nid28052020/'
            );
        });

        it('Snapshot link canonical note', () => {
            const { container } = render(<LinkCanonical {...props} />);
            expect(container).toMatchSnapshot();
        });
    });

    describe('At sections', () => {
        const props = {
            host: 'https://www.lanacion.com.ar',
            canonicalUrl: '',
            _id: '/deportes',
            nodeType: 'acumulado'
        };

        it('Should render OK', () => {
            const { container } = render(<LinkCanonical {...props} />);
            expect(container).toBeVisible();
            expect(container).not.toBeEmptyDOMElement();
        });

        it('Validate sent props', () => {
            const { container } = render(<LinkCanonical {...props} />);
            const link = container.getElementsByTagName('link');
            expect(link[0].href).toEqual(`${props.host}${props._id}/`);
        });

        it('Should have the correct DOM attributes', () => {
            const { container } = render(<LinkCanonical {...props} />);
            const link = container.getElementsByTagName('link');
            expect(link).toHaveLength(1);
            expect(link[0].rel).toEqual('canonical');
            expect(link[0].href).toEqual(
                'https://www.lanacion.com.ar/deportes/'
            );
        });

        it('Snapshot link canonical section', () => {
            const { container } = render(<LinkCanonical {...props} />);
            expect(container).toMatchSnapshot();
        });
    });

    describe('At sub-sections', () => {
        const props = {
            host: 'https://www.lanacion.com.ar',
            canonicalUrl: '',
            _id: '/deportes/futbol/boca-juniors',
            nodeType: 'acumulado'
        };

        it('Should render OK', () => {
            const { container } = render(<LinkCanonical {...props} />);
            expect(container).toBeVisible();
            expect(container).not.toBeEmptyDOMElement();
        });

        it('Validate sent props', () => {
            const { container } = render(<LinkCanonical {...props} />);
            const link = container.getElementsByTagName('link');
            expect(link[0].href).toEqual(`${props.host}${props._id}/`);
        });

        it('Should have the correct DOM attributes', () => {
            const { container } = render(<LinkCanonical {...props} />);
            const link = container.getElementsByTagName('link');
            expect(link).toHaveLength(1);
            expect(link[0].rel).toEqual('canonical');
            expect(link[0].href).toEqual(
                'https://www.lanacion.com.ar/deportes/futbol/boca-juniors/'
            );
        });

        it('Snapshot link canonical sub-section', () => {
            const { container } = render(<LinkCanonical {...props} />);
            expect(container).toMatchSnapshot();
        });
    });
});
