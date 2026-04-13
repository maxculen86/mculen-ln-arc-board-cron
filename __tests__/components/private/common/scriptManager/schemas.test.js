import React from 'react';
import { render } from '@testing-library/react';
import Schemas from '../../../../../components/private/common/scriptManager/schemas';

jest.mock('fusion:environment', () => ({
    ARC_STATIC: 'https://arc-static.glanacion.com',
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({
        contextPath: '/pf',
        deployment: value => `${value}?d=5634`
    }))
}));

describe('Schemas Component', () => {
    it('should render NewsMediaOrganization and WebSite scripts when section is "home"', () => {
        const { container } = render(<Schemas section="home" />);

        const scripts = container.querySelectorAll(
            'script[type="application/ld+json"]'
        );

        expect(scripts).toHaveLength(2);

        const parsedNewsMedia = JSON.parse(scripts[0].innerHTML);
        expect(parsedNewsMedia['@type']).toBe('NewsMediaOrganization');

        const parsedWebSite = JSON.parse(scripts[1].innerHTML);
        expect(parsedWebSite['@type']).toBe('WebSite');
    });

    it('should render a valid organization ID when section is "nota"', () => {
        const { container } = render(<Schemas section="nota" />);

        const scripts = container.querySelectorAll(
            'script[type="application/ld+json"]'
        );
        const newsMediaScript = scripts[0].innerHTML;
        const parsedNewsMedia = JSON.parse(newsMediaScript);

        expect(parsedNewsMedia['@id']).toBe(
            'https://www.lanacion.com.ar/#organization'
        );
        expect(newsMediaScript).not.toContain('"@id": "null"');
    });

    it('should use a provided siteProperties host for all organization URLs', () => {
        const { container } = render(
            <Schemas
                section="nota"
                siteProperties={{ host: 'https://foodit.lanacion.com.ar' }}
            />
        );

        const scripts = container.querySelectorAll(
            'script[type="application/ld+json"]'
        );
        const parsedNewsMedia = JSON.parse(scripts[0].innerHTML);

        expect(parsedNewsMedia['@id']).toBe(
            'https://foodit.lanacion.com.ar/#organization'
        );
        expect(parsedNewsMedia.url).toBe('https://foodit.lanacion.com.ar/');
        expect(parsedNewsMedia.diversityPolicy).toBe(
            'https://foodit.lanacion.com.ar/sociedad/diversidad-redaccion-nid2413327/'
        );
        expect(parsedNewsMedia.ethicsPolicy).toBe(
            'https://foodit.lanacion.com.ar/sociedad/la-nacion-mision-estructura-empresarial-principios-eticos-nid2393569/'
        );
        expect(parsedNewsMedia.publishingPrinciples).toBe(
            'https://foodit.lanacion.com.ar/sociedad/los-veinte-20-principios-del-periodismo-la-nid2390521/'
        );
        expect(parsedNewsMedia.verificationFactCheckingPolicy).toBe(
            'https://foodit.lanacion.com.ar/sociedad/verificacion-chequeo-datos-nid2406825/'
        );
        expect(parsedNewsMedia.masthead).toBe(
            'https://foodit.lanacion.com.ar/sociedad/equipo-editorial-la-nacion-nid2390490/'
        );
    });

    it('should keep the logo URL on ARC_STATIC for non-LN hosts', () => {
        const { container } = render(
            <Schemas
                section="nota"
                siteProperties={{ host: 'https://foodit.lanacion.com.ar' }}
            />
        );

        const scripts = container.querySelectorAll(
            'script[type="application/ld+json"]'
        );
        const parsedNewsMedia = JSON.parse(scripts[0].innerHTML);

        const expectedLogoUrl =
            'https://arc-static.glanacion.com/pf/resources/images/placeholderLN-1280x1280.jpg?d=5634';

        expect(parsedNewsMedia.logo.url).toBe(expectedLogoUrl);
        expect(parsedNewsMedia.image.url).toBe(expectedLogoUrl);
    });

    it('should use the canonical LN host for the logo URL', () => {
        const { container } = render(
            <Schemas
                section="nota"
                siteProperties={{ host: 'https://www.lanacion.com.ar' }}
            />
        );

        const scripts = container.querySelectorAll(
            'script[type="application/ld+json"]'
        );
        const parsedNewsMedia = JSON.parse(scripts[0].innerHTML);

        const expectedLogoUrl =
            'https://www.lanacion.com.ar/pf/resources/images/placeholderLN-1280x1280.jpg?d=5634';

        expect(parsedNewsMedia.logo.url).toBe(expectedLogoUrl);
        expect(parsedNewsMedia.image.url).toBe(expectedLogoUrl);
    });

    it('should not render anything when section is not "nota"', () => {
        const { container } = render(<Schemas section="news" />);

        expect(container.firstChild).toBeNull();
    });

    it('should not render anything when section is empty', () => {
        const { container } = render(<Schemas section="" />);

        expect(container.firstChild).toBeNull();
    });

    it('should handle default props correctly', () => {
        const { container } = render(<Schemas />);

        expect(container.firstChild).toBeNull();
    });
});
