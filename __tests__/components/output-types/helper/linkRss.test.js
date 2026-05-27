import LinkRSS from '../../../../components/output-types/Helper/linkRSS';
import { render } from '@testing-library/react';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

const SITE_LANACION = 'https://www.lanacion.com.ar';

describe('LinkRSS Component', () => {
    const mockGlobalContent = {
        taxonomy: {
            primary_section: {
                _id: '/politica'
            }
        }
    };

    it('should render <link> tag correctly when _nodeType is "nota"', () => {
        render(<LinkRSS globalContent={mockGlobalContent} _nodeType="nota" />);

        const linkTag = document.head.querySelector('link[rel="alternate"]');
        expect(linkTag).toBeInTheDocument();
        expect(linkTag).toHaveAttribute('rel', 'alternate');
        expect(linkTag).toHaveAttribute('type', 'application/rss+xml');
        expect(linkTag).toHaveAttribute(
            'href',
            `${SITE_LANACION}/arc/outboundfeeds/rss/category/politica/`
        );
    });

    it('should render canonical RSS link when _nodeType is "home"', () => {
        render(<LinkRSS globalContent={mockGlobalContent} _nodeType="home" />);

        const linkTag = document.head.querySelector('link[rel="alternate"]');
        expect(linkTag).toBeInTheDocument();
        expect(linkTag).toHaveAttribute('rel', 'alternate');
        expect(linkTag).toHaveAttribute('type', 'application/rss+xml');
        expect(linkTag).toHaveAttribute(
            'href',
            `${SITE_LANACION}/arc/outboundfeeds/rss/`
        );
    });

    it('should not render anything if _nodeType is neither "nota" nor "home"', () => {
        render(
            <LinkRSS globalContent={mockGlobalContent} _nodeType="acumulado" />
        );

        const linkTag = document.head.querySelector('link[rel="alternate"]');
        expect(linkTag).not.toBeInTheDocument();
    });

    it('should handle cases where the sectionId is empty or does not exist', () => {
        const emptyContent = { taxonomy: { primary_section: {} } };

        render(<LinkRSS globalContent={emptyContent} _nodeType="nota" />);

        const linkTag = document.head.querySelector('link[rel="alternate"]');
        expect(linkTag).not.toBeInTheDocument();
    });

    it('must be resistant to undefined globalContent (avoid crash)', () => {
        render(<LinkRSS globalContent={null} _nodeType="nota" />);

        const linkTag = document.head.querySelector('link[rel="alternate"]');
        expect(linkTag).not.toBeInTheDocument();
    });
});
