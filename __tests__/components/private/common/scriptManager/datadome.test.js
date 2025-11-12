import React from 'react';
import { render } from '@testing-library/react';
import Datadome from '../../../../../components/private/common/scriptManager/datadome';
import '@testing-library/jest-dom';

jest.mock('fusion:environment', () => ({
    DATADOME_CLIENT_KEY: 'MOCK_DATADOME_CLIENT_KEY'
}));

describe('Datadome Component', () => {
    it('renders a scripts elements', () => {
        const { container } = render(<Datadome />);
        const scriptElement = container.querySelectorAll('script');
        expect(scriptElement).toBeDefined();
        expect(scriptElement).toHaveLength(2);
    });

    it('first script element should have type "text/javascript"', () => {
        const { container } = render(<Datadome />);
        const scriptElement = container.querySelector('script');
        expect(scriptElement).toHaveAttribute('type', 'text/javascript');
    });

    it('first element uses dangerouslySetInnerHTML to inject script content with datadome client key and options', () => {
        const { container } = render(<Datadome />);
        const scriptElement = container.querySelector('script');
        const content = scriptElement.innerHTML;

        expect(content).toContain(
            'window.ddjskey = "MOCK_DATADOME_CLIENT_KEY"'
        );

        expect(content).toContain('window.ddoptions');

        expect(content).toContain("challengeLanguage: 'es'");
        expect(content).toContain("host: 'lanacion.com.ar'");
        expect(content).toContain("path: '/api'");
        expect(content).toContain('withCredentials: true');
    });

    it('second element should have correct src and async attribute', () => {
        const { container } = render(<Datadome />);
        const secondScriptElement = container.querySelectorAll('script')[1];

        expect(secondScriptElement).toHaveAttribute(
            'src',
            'https://js.datadome.co/tags.js'
        );
        expect(secondScriptElement).toHaveAttribute('async');
    });
});
