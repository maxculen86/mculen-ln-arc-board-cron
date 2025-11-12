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

    it('first element uses dangerouslySetInnerHTML to inject script content and has datadome client key', () => {
        const { container } = render(<Datadome />);
        const scriptElement = container.querySelector('script');
        expect(scriptElement.innerHTML).toMatch(
            'window.ddjskey = "MOCK_DATADOME_CLIENT_KEY"; window.ddoptions = {"challengeLanguage": "es"};'
        );
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
