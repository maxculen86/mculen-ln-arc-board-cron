import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LinkCanonicalAndAlternate from '../../../../components/private/common/linkCanonical';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar',
    ARC_STATIC: 'https://arc-static.glanacion.com',
    SITE_FOODIT: 'https://foodit.lanacion.com.ar'
}));

describe('Private - LN - Common - LinkCanonicalAndAlternate', () => {
    describe('At homepage', () => {
        const props = {
            arcSite: 'la-nacion-ar',
            canonicalUrl: '',
            nodeType: 'home',
            site: {}
        };

        it('Should render OK', () => {
            render(<LinkCanonicalAndAlternate {...props} />);

            const links = document.head.getElementsByTagName('link');
            const canonicalLink = Array.from(links).find(
                l => l.rel === 'canonical'
            );
            expect(canonicalLink).toBeDefined();
        });

        it('Should have the correct DOM attributes form canonical link', () => {
            render(<LinkCanonicalAndAlternate {...props} />);

            const link = document.head.getElementsByTagName('link');
            expect(link.length).toBeGreaterThanOrEqual(1);
            const canonicalLink = Array.from(link).find(
                l => l.rel === 'canonical'
            );
            expect(canonicalLink).toBeDefined();
            expect(canonicalLink.href).toEqual('https://www.lanacion.com.ar/');
        });

        it('Snapshot link canonical homepage', () => {
            render(<LinkCanonicalAndAlternate {...props} />);
            const links = Array.from(
                document.head.querySelectorAll(
                    'link[rel="canonical"], link[rel="alternate"]'
                )
            );
            expect(links.map(el => el.outerHTML)).toMatchSnapshot();
        });
    });

    describe('At note', () => {
        const props = {
            arcSite: 'la-nacion-ar',
            canonicalUrl: '/ciencia/roger-prueba-imagenes-nid28052020/',
            nodeType: 'nota',
            site: {},
            _id: 'AJHSAKSJHDFAKSDHKAJS'
        };

        it('Should render OK', () => {
            render(<LinkCanonicalAndAlternate {...props} />);

            const links = document.head.getElementsByTagName('link');
            const canonicalLink = Array.from(links).find(
                l => l.rel === 'canonical'
            );
            expect(canonicalLink).toBeDefined();
        });

        it('Validate sent props', () => {
            render(<LinkCanonicalAndAlternate {...props} />);
            const links = document.head.getElementsByTagName('link');
            const canonicalLink = Array.from(links).find(
                l => l.rel === 'canonical'
            );
            expect(canonicalLink.href).toEqual(
                'https://www.lanacion.com.ar/ciencia/roger-prueba-imagenes-nid28052020/'
            );
        });

        it('Should have the correct DOM attributes', () => {
            render(<LinkCanonicalAndAlternate {...props} />);
            const links = document.head.getElementsByTagName('link');
            const canonicalLink = Array.from(links).find(
                l => l.rel === 'canonical'
            );
            expect(
                Array.from(links).filter(l => l.rel === 'canonical').length
            ).toBeGreaterThanOrEqual(1);
            expect(canonicalLink.rel).toEqual('canonical');
            expect(canonicalLink.href).toEqual(
                'https://www.lanacion.com.ar/ciencia/roger-prueba-imagenes-nid28052020/'
            );
        });

        it('Snapshot link canonical note', () => {
            render(<LinkCanonicalAndAlternate {...props} />);
            const links = Array.from(
                document.head.querySelectorAll(
                    'link[rel="canonical"], link[rel="alternate"]'
                )
            );
            expect(links.map(el => el.outerHTML)).toMatchSnapshot();
        });
    });

    describe('At sections', () => {
        const props = {
            arcSite: 'la-nacion-ar',
            canonicalUrl: '',
            _id: '/deportes',
            site: {
                site_url: ''
            },
            nodeType: 'acumulado'
        };

        it('Should render OK', () => {
            render(<LinkCanonicalAndAlternate {...props} />);

            const links = document.head.getElementsByTagName('link');
            const canonicalLink = Array.from(links).find(
                l => l.rel === 'canonical'
            );
            expect(canonicalLink).toBeDefined();
        });

        it('Validate sent props', () => {
            render(<LinkCanonicalAndAlternate {...props} />);
            const links = document.head.getElementsByTagName('link');
            const canonicalLink = Array.from(links).find(
                l => l.rel === 'canonical'
            );
            expect(canonicalLink.href).toEqual(
                'https://www.lanacion.com.ar/deportes/'
            );
        });

        it('Should have the correct DOM attributes', () => {
            render(<LinkCanonicalAndAlternate {...props} />);
            const links = document.head.getElementsByTagName('link');
            const canonicalLink = Array.from(links).find(
                l => l.rel === 'canonical'
            );
            expect(
                Array.from(links).filter(l => l.rel === 'canonical').length
            ).toBeGreaterThanOrEqual(1);
            expect(canonicalLink.rel).toEqual('canonical');
            expect(canonicalLink.href).toEqual(
                'https://www.lanacion.com.ar/deportes/'
            );
        });

        it('Snapshot link canonical section', () => {
            render(<LinkCanonicalAndAlternate {...props} />);
            const links = Array.from(
                document.head.querySelectorAll(
                    'link[rel="canonical"], link[rel="alternate"]'
                )
            );
            expect(links.map(el => el.outerHTML)).toMatchSnapshot();
        });
        it('When is page, dolar-hoy case', () => {
            const dolarHoyProps = {
                _id: '/economia/dolar',
                arcSite: 'la-nacion-ar',
                nodeType: 'acumulado',
                site: {
                    site_about: '',
                    site_url: 'https://www.lanacion.com.ar/dolar-hoy/'
                },
                template: 'page/pNqYuSKvntKUNh2qs'
            };
            render(<LinkCanonicalAndAlternate {...dolarHoyProps} />);
            const links = document.head.getElementsByTagName('link');
            const canonicalLink = Array.from(links).find(
                l => l.rel === 'canonical'
            );
            expect(
                Array.from(links).filter(l => l.rel === 'canonical').length
            ).toBeGreaterThanOrEqual(1);
            expect(canonicalLink.rel).toEqual('canonical');
            expect(canonicalLink.href).toEqual(
                'https://www.lanacion.com.ar/dolar-hoy/'
            );
        });
    });

    describe('At sub-sections', () => {
        const props = {
            arcSite: 'la-nacion-ar',
            canonicalUrl: '',
            _id: '/deportes/futbol/boca-juniors',
            site: {},
            nodeType: 'acumulado'
        };

        it('Should render OK', () => {
            render(<LinkCanonicalAndAlternate {...props} />);

            const links = document.head.getElementsByTagName('link');
            const canonicalLink = Array.from(links).find(
                l => l.rel === 'canonical'
            );
            expect(canonicalLink).toBeDefined();
        });

        it('Validate sent props', () => {
            render(<LinkCanonicalAndAlternate {...props} />);
            const links = document.head.getElementsByTagName('link');
            const canonicalLink = Array.from(links).find(
                l => l.rel === 'canonical'
            );
            expect(canonicalLink.href).toEqual(
                'https://www.lanacion.com.ar/deportes/futbol/boca-juniors/'
            );
        });

        it('Should have the correct DOM attributes', () => {
            render(<LinkCanonicalAndAlternate {...props} />);
            const links = document.head.getElementsByTagName('link');
            const canonicalLink = Array.from(links).find(
                l => l.rel === 'canonical'
            );
            expect(
                Array.from(links).filter(l => l.rel === 'canonical').length
            ).toBeGreaterThanOrEqual(1);
            expect(canonicalLink.rel).toEqual('canonical');
            expect(canonicalLink.href).toEqual(
                'https://www.lanacion.com.ar/deportes/futbol/boca-juniors/'
            );
        });

        it('Snapshot link canonical sub-section', () => {
            render(<LinkCanonicalAndAlternate {...props} />);
            const links = Array.from(
                document.head.querySelectorAll(
                    'link[rel="canonical"], link[rel="alternate"]'
                )
            );
            expect(links.map(el => el.outerHTML)).toMatchSnapshot();
        });
    });

    describe('With author id', () => {
        const props = {
            arcSite: 'foodit',
            canonicalUrl: '',
            _id: 'leo-messi-10',
            site: {},
            nodeType: 'home',
            template: 'template/t5bxoboL6RikBt7u'
        };

        it('Should render OK', () => {
            render(<LinkCanonicalAndAlternate {...props} />);

            const links = document.head.getElementsByTagName('link');
            const canonicalLink = Array.from(links).find(
                l => l.rel === 'canonical'
            );
            expect(canonicalLink).toBeDefined();
        });

        it('Validate sent props', () => {
            render(<LinkCanonicalAndAlternate {...props} />);
            const links = document.head.getElementsByTagName('link');
            const canonicalLink = Array.from(links).find(
                l => l.rel === 'canonical'
            );
            expect(canonicalLink.href).toEqual(
                'https://foodit.lanacion.com.ar/leo-messi-10/'
            );
        });

        it('Should have the correct DOM attributes', () => {
            render(<LinkCanonicalAndAlternate {...props} />);
            const links = document.head.getElementsByTagName('link');
            const canonicalLink = Array.from(links).find(
                l => l.rel === 'canonical'
            );
            expect(
                Array.from(links).filter(l => l.rel === 'canonical').length
            ).toBeGreaterThanOrEqual(1);
            expect(canonicalLink.rel).toEqual('canonical');
            expect(canonicalLink.href).toEqual(
                'https://foodit.lanacion.com.ar/leo-messi-10/'
            );
        });

        it('Snapshot link canonical sub-section', () => {
            render(<LinkCanonicalAndAlternate {...props} />);
            const links = Array.from(
                document.head.querySelectorAll(
                    'link[rel="canonical"], link[rel="alternate"]'
                )
            );
            expect(links.map(el => el.outerHTML)).toMatchSnapshot();
        });
    });

    describe('When parent is estados-unidos', () => {
        const props = {
            arcSite: 'la-nacion-ar',
            canonicalUrl: '',
            _id: '/estados-unidos',
            site: {},
            nodeType: 'acumulado',
            template: 'template/t5bxoboL6RikBt7u'
        };

        it('Should link canonical and link alternate', () => {
            render(<LinkCanonicalAndAlternate {...props} />);
            const links = Array.from(
                document.head.querySelectorAll(
                    'link[rel="canonical"], link[rel="alternate"]'
                )
            );
            expect(links.map(el => el.outerHTML)).toMatchSnapshot();
        });
    });
});
