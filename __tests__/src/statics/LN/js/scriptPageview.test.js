const BYTES_PER_MEBIBYTE = 1024 * 1024;

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

const setChromiumQuota = quota => {
    Object.defineProperty(window.performance, 'memory', {
        configurable: true,
        value: {
            jsHeapSizeLimit: 100 * BYTES_PER_MEBIBYTE
        }
    });

    Object.defineProperty(navigator, 'webkitTemporaryStorage', {
        configurable: true,
        value: {
            queryUsageAndQuota: jest.fn(success => success(0, quota))
        }
    });
};

const setPageviewSchema = data => {
    document.body.innerHTML = `
        <script id="pageview" type="application/ld+json">
            ${JSON.stringify(data)}
        </script>
    `;
};

const getPageviewSchema = () =>
    JSON.parse(document.getElementById('pageview').textContent);

describe('src - statics - LN - js - scriptPageview', () => {
    beforeEach(() => {
        jest.resetModules();
        delete window.__LNIncognitoModePromise;
        localStorage.clear();
        setPageviewSchema({
            pagetype: 'nota',
            valor: 'comun'
        });
    });

    afterEach(() => {
        delete window.__LNIncognitoModePromise;
        delete navigator.webkitTemporaryStorage;
        delete window.performance.memory;
        document.body.innerHTML = '';
        localStorage.clear();
        jest.clearAllMocks();
    });

    it('adds incognito true to the pageview schema when private mode is detected', async () => {
        setChromiumQuota(10 * BYTES_PER_MEBIBYTE);

        require('../../../../../src/statics/LN/js/scriptPageview');
        await flushPromises();

        expect(getPageviewSchema()).toEqual({
            pagetype: 'nota',
            valor: 'comun',
            metarefresh: 'no',
            incognito: true
        });
    });

    it('adds incognito false to the pageview schema when standard mode is detected', async () => {
        setChromiumQuota(500 * BYTES_PER_MEBIBYTE);

        require('../../../../../src/statics/LN/js/scriptPageview');
        await flushPromises();

        expect(getPageviewSchema()).toEqual({
            pagetype: 'nota',
            valor: 'comun',
            metarefresh: 'no',
            incognito: false
        });
    });

    it('adds incognito to accumulated pageview schemas', async () => {
        setPageviewSchema({
            pagetype: 'acumulado',
            metarefresh: 'N/A'
        });
        setChromiumQuota(10 * BYTES_PER_MEBIBYTE);

        require('../../../../../src/statics/LN/js/scriptPageview');
        await flushPromises();

        expect(getPageviewSchema()).toEqual({
            pagetype: 'acumulado',
            metarefresh: 'N/A',
            incognito: true
        });
    });
});
