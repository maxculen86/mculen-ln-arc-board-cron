import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import Schemas from '../../../../../components/private/common/scriptManager/schemas';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

const mockContext = {
    contextPath: '/test-context',
    deployment: jest.fn(path => path)
};

describe('Schemas Component', () => {
    beforeEach(() => {
        useAppContext.mockReturnValue(mockContext);
    });

    it('should render schema.org scripts when section is "home"', () => {
        const { container } = render(<Schemas section="home" />);

        const scripts = container.querySelectorAll(
            'script[type="application/ld+json"]'
        );
        expect(scripts).toHaveLength(2);

        const newsMediaScript = scripts[0].innerHTML;
        const parsedNewsMedia = JSON.parse(newsMediaScript);
        expect(parsedNewsMedia['@type']).toBe('NewsMediaOrganization');
        expect(parsedNewsMedia.logo.url).toContain(
            '/test-context/resources/images/placeholderLN-1280x1280.jpg'
        );
        expect(parsedNewsMedia.sameAs).toEqual([
            'https://www.facebook.com/lanacion/',
            'https://www.instagram.com/lanacioncom/',
            'https://x.com/LANACION/'
        ]);

        const webSiteScript = scripts[1].innerHTML;
        const parsedWebSite = JSON.parse(webSiteScript);
        expect(parsedWebSite['@type']).toBe('WebSite');
        expect(parsedWebSite.url).toBe('https://www.lanacion.com.ar/');
    });

    it('should not render anything when section is not "home"', () => {
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
