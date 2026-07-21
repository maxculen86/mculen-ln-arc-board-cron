const loadOptaEmbed = () =>
    jest.requireActual('../../../../../src/statics/LN/js/optaEmbed');

describe('src - statics - LN - js - optaEmbed', () => {
    const setupCurrentScript = () => {
        const script = document.createElement('script');
        script.dataset.subscriptionid = 'subscription-test';
        script.dataset.language = 'es_CO';
        script.dataset.timezone = 'America/Buenos_Aires';
        document.head.appendChild(script);

        Object.defineProperty(document, 'currentScript', {
            configurable: true,
            value: script
        });
    };

    beforeEach(() => {
        jest.resetModules();
        document.head.innerHTML = '';
        document.body.innerHTML = '';
        window.onload = null;
        setupCurrentScript();
    });

    afterEach(() => {
        document.head.innerHTML = '';
        document.body.innerHTML = '';
        window.onload = null;

        Object.defineProperty(document, 'currentScript', {
            configurable: true,
            value: null
        });
    });

    it('injects Opta stylesheet without replacing an existing window.onload handler', () => {
        const onLoadHandler = jest.fn();
        window.onload = onLoadHandler;

        const { OPTA_WIDGET_STYLESHEET_URL } = loadOptaEmbed();

        expect(window.onload).toBe(onLoadHandler);
        expect(
            document.querySelector(
                `link[rel="stylesheet"][href="${OPTA_WIDGET_STYLESHEET_URL}"]`
            )
        ).toBeInTheDocument();
    });

    it('does not inject duplicate Opta stylesheet links', () => {
        const { injectOptaStylesheet, OPTA_WIDGET_STYLESHEET_URL } =
            loadOptaEmbed();

        injectOptaStylesheet();
        injectOptaStylesheet();

        expect(
            document.querySelectorAll(
                `link[rel="stylesheet"][href="${OPTA_WIDGET_STYLESHEET_URL}"]`
            )
        ).toHaveLength(1);
    });
});
