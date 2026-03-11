import React from 'react';
import { render } from '@testing-library/react';
import ScriptCripto from '../../../../../components/private/common/scriptManager/scriptCripto';

describe('ScriptCripto Component', () => {
    test('renders a script tag with the correct src and async attribute', () => {
        render(<ScriptCripto />);

        const scriptTag = document.head.querySelector(
            'script[src*="livecoinwatch"]'
        );
        expect(scriptTag).toBeInTheDocument();
        expect(scriptTag).toHaveAttribute(
            'src',
            'https://www.livecoinwatch.com/static/lcw-widget.js'
        );
        expect(scriptTag).toHaveAttribute('async');
    });
});
