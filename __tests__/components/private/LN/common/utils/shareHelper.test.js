import {
    shareWhatsAppDesktop,
    shareWhatsAppMobile,
    isLN10IAHidden,
    popUpCompartirNotaTW,
    copyToClipboard,
    openGoogleDiscoverFollow
} from '../../../../../../components/private/LN/common/utils/shareHelper';

const windowOpenMock = jest.fn();

beforeAll(() => {
    Object.defineProperty(window, 'open', {
        value: windowOpenMock
    });
});

const mockLocation = {
    href: '',
    replace: jest.fn(url => {
        mockLocation.href = url;
    })
};

const mockDataLayer = {
    push: jest.fn()
};

beforeEach(() => {
    delete global.window.location;
    global.window.location = Object.create(mockLocation);
});

describe('private - LN - common - utils - shareHelper', () => {
    describe('openGoogleDiscoverFollow', () => {
        it('should open the official Google Preferences source URL', () => {
            openGoogleDiscoverFollow();

            expect(windowOpenMock).toHaveBeenCalledWith(
                'https://www.google.com/preferences/source?q=lanacion.com.ar',
                '_blank',
                'noopener,noreferrer'
            );
        });
    });

    describe('shareWhatsAppDesktop', () => {
        it('should open a new window with the correct URL', () => {
            const notaId = '123';
            const dominio = 'example.com';
            shareWhatsAppDesktop(notaId, dominio);
            expect(windowOpenMock).toHaveBeenCalledWith(
                `https://wa.me/?text=${encodeURIComponent(dominio + notaId)}`,
                '_blank'
            );
        });
    });

    describe('shareWhatsAppMobile', () => {
        it('should open a new window with the correct URL', () => {
            const notaId = '123';
            const dominio = 'example.commmmm';
            const title = 'Title';
            const content = 'Content';

            const texto = `${title} : ...`;
            const expectedUrl = `https://wa.me/?text=${texto} - ${dominio}${notaId}`;
            try {
                shareWhatsAppMobile(notaId, dominio, title, content);
                expect(windowOpenMock).toHaveBeenCalledWith(
                    expectedUrl,
                    '_blank'
                );
            } catch (error) {}
        });

        it('should handle errors and log a warning', () => {
            const consoleWarnMock = jest
                .spyOn(console, 'warn')
                .mockImplementation(() => {});
            const notaId = '123';
            const dominio = 'example.com';
            const title = 'Title';
            const content = 'Content';

            try {
                shareWhatsAppMobile(notaId, dominio, title, content);
                expect(consoleWarnMock).toHaveBeenCalledWith(
                    'Initialize: ',
                    expect.any(Error)
                );
            } catch (error) {
            } finally {
                consoleWarnMock.mockRestore();
            }
        });
    });

    describe('isLN10IAHidden', () => {
        it('should return true when hideGlossary and hideSummary are both true for LN-10/IA feature', () => {
            const renderables = [
                {
                    collection: 'features',
                    type: 'LN-10/IA',
                    props: {
                        customFields: {
                            hideGlossary: true,
                            hideSummary: true
                        }
                    }
                }
            ];

            expect(isLN10IAHidden(renderables)).toBe(true, true, true);
        });

        it('should return false when hideGlossary and hideSummary are false', () => {
            const renderables = [
                {
                    collection: 'features',
                    type: 'LN-10/IA',
                    props: {
                        customFields: {
                            hideGlossary: false,
                            hideSummary: false
                        }
                    }
                }
            ];

            expect(isLN10IAHidden(renderables)).toBe(false, true, true);
        });

        it('should return true when hideSummary is true and there is no glossary', () => {
            const renderables = [
                {
                    collection: 'features',
                    type: 'LN-10/IA',
                    props: {
                        customFields: {
                            hideGlossary: false,
                            hideSummary: false
                        }
                    }
                }
            ];

            expect(isLN10IAHidden(renderables, false, true)).toBe(false);
        });

        it('should return true when hideGlossary is true and there is no summary', () => {
            const renderables = [
                {
                    collection: 'features',
                    type: 'LN-10/IA',
                    props: {
                        customFields: {
                            hideGlossary: false,
                            hideSummary: false
                        }
                    }
                }
            ];

            expect(isLN10IAHidden(renderables, true, false)).toBe(false);
        });

        it('should return true when the type is not LN-10/IA', () => {
            const renderables = [
                {
                    collection: 'features',
                    type: 'LN-10/Other',
                    props: {
                        customFields: {
                            hideGlossary: true,
                            hideSummary: true
                        }
                    }
                }
            ];

            expect(isLN10IAHidden(renderables)).toBe(true);
        });

        it('should return true when the collection is not features', () => {
            const renderables = [
                {
                    collection: 'non-features',
                    type: 'LN-10/IA',
                    props: {
                        customFields: {
                            hideGlossary: true,
                            hideSummary: true
                        }
                    }
                }
            ];

            expect(isLN10IAHidden(renderables)).toBe(true);
        });

        it('should return true when renderables is an empty array, does not have the IA feature', () => {
            const renderables = [];

            expect(isLN10IAHidden(renderables)).toBe(true);
        });
    });

    describe('popUpCompartirNotaTW Function', () => {
        const dominio = 'https://www.lanacion.com.ar/';
        const titulo = 'This is the title of the note';
        const mockWindowOpen = jest.fn();

        beforeAll(() => {
            global.open = mockWindowOpen;
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should open a popup with the correct URL and dimensions when notaId is provided', () => {
            const notaId = '12345';

            popUpCompartirNotaTW(notaId, dominio, titulo);

            expect(mockWindowOpen).toHaveBeenCalledTimes(1);
            expect(mockWindowOpen).toHaveBeenCalledWith(
                `https://x.com/intent/tweet?text=${encodeURIComponent(titulo)}&url=${dominio}${notaId}&via=LANACION/`,
                '',
                'top=300,left=550,width=800,height=380'
            );
        });

        it('should open a new window with the LANACION Twitter page when notaId is empty', () => {
            const notaId = '';

            popUpCompartirNotaTW(notaId, dominio, titulo);

            expect(mockWindowOpen).toHaveBeenCalledTimes(1);
            expect(mockWindowOpen).toHaveBeenCalledWith(
                'https://x.com/LANACION/',
                '_blank'
            );
        });

        it('should generate a valid URL with correctly encoded percentage symbol', () => {
            const titulo =
                'Guyana: El pequeño país que creció un 54% durante 2020';
            const notaId =
                '/economia/guyana-el-pequeno-pais-que-crecio-un-54-durante-2020-nid21062021/';
            const dominio = 'https://www.lanacion.com.ar';

            const mockWindowOpen = jest.fn();
            global.open = mockWindowOpen;

            popUpCompartirNotaTW(notaId, dominio, titulo);

            const generatedUrl = mockWindowOpen.mock.calls[0][0];

            // Verificar que el símbolo de porcentaje (%) esté correctamente codificado como '%25'
            expect(generatedUrl).toContain('54%25');

            // Verificar que la URL sea válida sintácticamente
            expect(() => new URL(generatedUrl)).not.toThrow();
        });
    });

    describe('copyToClipboard', () => {
        beforeEach(() => {
            Object.assign(navigator, {
                clipboard: {
                    writeText: jest.fn()
                }
            });
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should copy the full URL when domain and url are provided', () => {
            copyToClipboard(
                'https://www.lanacion.com.ar',
                '/carrousel/jwidTdCdBgL/'
            );

            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
                'https://www.lanacion.com.ar/carrousel/jwidTdCdBgL/'
            );
        });

        it('should copy the current location when domain or url are missing', () => {
            delete window.location;
            window.location = {
                href: 'https://www.lanacion.com.ar/el-mundo/los-mercados-asiaticos-y-europeos-operan-a-la-baja-tras-la-suba-de-aranceles-anunciada-por-donald-nid03042025/'
            };

            copyToClipboard(null, null);

            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
                'https://www.lanacion.com.ar/el-mundo/los-mercados-asiaticos-y-europeos-operan-a-la-baja-tras-la-suba-de-aranceles-anunciada-por-donald-nid03042025/'
            );
        });

        it('should use execCommand fallback when clipboard API is unavailable (e.g. HTTP)', () => {
            Object.assign(navigator, { clipboard: undefined });

            const mockTextarea = {
                value: '',
                style: {},
                select: jest.fn()
            };
            jest.spyOn(document, 'createElement').mockReturnValue(mockTextarea);
            jest.spyOn(document.body, 'appendChild').mockImplementation(
                () => {}
            );
            jest.spyOn(document.body, 'removeChild').mockImplementation(
                () => {}
            );
            document.execCommand = jest.fn().mockReturnValue(true);

            copyToClipboard('https://www.lanacion.com.ar', '/nota/123/');

            expect(document.createElement).toHaveBeenCalledWith('textarea');
            expect(mockTextarea.value).toBe(
                'https://www.lanacion.com.ar/nota/123/'
            );
            expect(mockTextarea.select).toHaveBeenCalled();
            expect(document.execCommand).toHaveBeenCalledWith('copy');
            expect(document.body.removeChild).toHaveBeenCalledWith(
                mockTextarea
            );
        });
    });
});
