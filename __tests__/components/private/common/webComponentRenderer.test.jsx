import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import WebComponentRenderer from '../../../../components/private/common/webComponentRenderer';
import loadScriptOnce from '../../../../components/private/common/utils/loadScriptOnce';

const SCRIPT_ID = 'test-web-component-script';
const SCRIPT_URL = 'https://example.com/test-web-component.js';

describe('WebComponentRenderer', () => {
    beforeEach(() => {
        document.head.innerHTML = '';
        document.body.innerHTML = '';
    });

    describe('loadScriptOnce', () => {
        it('appends the configured script once', () => {
            const firstScript = loadScriptOnce({
                scriptId: SCRIPT_ID,
                scriptUrl: SCRIPT_URL
            });
            const secondScript = loadScriptOnce({
                scriptId: SCRIPT_ID,
                scriptUrl: SCRIPT_URL
            });

            expect(firstScript).toBe(secondScript);
            expect(document.querySelectorAll('script')).toHaveLength(1);
            expect(firstScript).toHaveAttribute('id', SCRIPT_ID);
            expect(firstScript).toHaveAttribute('type', 'module');
            expect(firstScript).toHaveAttribute('src', SCRIPT_URL);
        });

        it('does not append a script without the required config', () => {
            const script = loadScriptOnce({
                scriptId: SCRIPT_ID,
                scriptUrl: ''
            });

            expect(script).toBeNull();
            expect(document.querySelectorAll('script')).toHaveLength(0);
        });
    });

    it('renders the requested custom element with attributes', () => {
        const { container } = render(
            <WebComponentRenderer
                tagName="test-widget"
                scriptId={SCRIPT_ID}
                scriptUrl={SCRIPT_URL}
                attributes={{
                    'post-id': '3',
                    'data-source': 'home'
                }}
            />
        );

        const customElement = container.querySelector('test-widget');

        expect(customElement).toBeInTheDocument();
        expect(customElement).toHaveAttribute('post-id', '3');
        expect(customElement).toHaveAttribute('data-source', 'home');
        expect(document.getElementById(SCRIPT_ID)).toBeInTheDocument();
    });

    it('does not render an element without a tag name', () => {
        const { container } = render(
            <WebComponentRenderer
                tagName=""
                scriptId={SCRIPT_ID}
                scriptUrl={SCRIPT_URL}
            />
        );

        expect(container).toBeEmptyDOMElement();
    });
});
