import { initWebviewLinkGuard } from '../../../../../../components/features/foodit-global/common/utils/disableWebviewLinks';

jest.mock(
    '../../../../../../components/features/foodit-global/common/utils/isMobileWebView',
    () => ({ isMobileWebView: jest.fn() })
);

const {
    isMobileWebView
} = require('../../../../../../components/features/foodit-global/common/utils/isMobileWebView');

describe('initWebviewLinkGuard', () => {
    let cleanup;

    const clickOn = element => {
        const event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(event);
        return event;
    };

    beforeEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = `
            <footer>
                <a id="disabled-link" data-webview-disabled href="https://www.lanacion.com.ar/">
                    <span id="disabled-link-child">LA NACION</span>
                </a>
                <a id="normal-link" href="/">Home</a>
            </footer>
        `;
        cleanup = initWebviewLinkGuard();
    });

    afterEach(() => {
        if (cleanup) cleanup();
        document.body.innerHTML = '';
    });

    it('prevents navigation on marked links inside the webview', () => {
        isMobileWebView.mockReturnValue(true);
        const event = clickOn(document.getElementById('disabled-link'));
        expect(event.defaultPrevented).toBe(true);
    });

    it('prevents navigation when clicking a child of a marked link', () => {
        isMobileWebView.mockReturnValue(true);
        const event = clickOn(document.getElementById('disabled-link-child'));
        expect(event.defaultPrevented).toBe(true);
    });

    it('does not affect unmarked links inside the webview', () => {
        isMobileWebView.mockReturnValue(true);
        const event = clickOn(document.getElementById('normal-link'));
        expect(event.defaultPrevented).toBe(false);
    });

    it('keeps marked links working outside the webview', () => {
        isMobileWebView.mockReturnValue(false);
        const event = clickOn(document.getElementById('disabled-link'));
        expect(event.defaultPrevented).toBe(false);
    });
});
