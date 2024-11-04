import React from 'react';
import { render } from '@testing-library/react';
import ComscoreFoodit from '../../../../../components/private/common/scriptManager/comscoreFoodit';

describe('components - private - common - scriptManager - ComscoreFoodit', () => {
    const mockConfig = { c1: '2', c2: 'example_c2' };
    const mockConfigNoScript = { ns_site: 'example_site' };

    it('renders script and noscript elements when location is "head"', () => {
        const { container } = render(
            <ComscoreFoodit
                config={mockConfig}
                configNoScript={mockConfigNoScript}
                location="head"
            />
        );

        const scriptTag = container.querySelector('#comscore');
        const noscriptTag = container.querySelector('noscript');

        expect(scriptTag).toBeInTheDocument();
        expect(scriptTag).toHaveAttribute('defer');
        expect(scriptTag).toHaveAttribute('type', 'text/javascript');
        expect(scriptTag.innerHTML).toContain('_comscore.push');

        expect(noscriptTag).toBeInTheDocument();
    });

    it('does not render anything if config or configNoScript is missing', () => {
        const { container } = render(
            <ComscoreFoodit config={null} configNoScript={mockConfigNoScript} />
        );
        expect(container.firstChild).toBeNull();

        const { container: container2 } = render(
            <ComscoreFoodit config={mockConfig} configNoScript={null} />
        );
        expect(container2.firstChild).toBeNull();
    });

    it('does not render anything if location is not "head"', () => {
        const { container } = render(
            <ComscoreFoodit
                config={mockConfig}
                configNoScript={mockConfigNoScript}
                location="body"
            />
        );
        expect(container.firstChild).toBeNull();
    });
});
