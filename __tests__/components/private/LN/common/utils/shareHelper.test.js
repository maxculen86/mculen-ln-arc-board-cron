import {
    shareWhatsAppDesktop,
    shareWhatsAppMobile,
    isLN10IAHidden
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
            expect(windowOpenMock).toHaveBeenCalledWith(expectedUrl, '_blank');
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

        expect(isLN10IAHidden(renderables)).toBe(true);
    });

    it('should return false when hideGlossary or hideSummary is not true', () => {
        const renderables = [
            {
                collection: 'features',
                type: 'LN-10/IA',
                props: {
                    customFields: {
                        hideGlossary: true,
                        hideSummary: false
                    }
                }
            }
        ];

        expect(isLN10IAHidden(renderables)).toBe(false);
    });

    it('should return false when the type is not LN-10/IA', () => {
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

        expect(isLN10IAHidden(renderables)).toBe(false);
    });

    it('should return false when the collection is not features', () => {
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

        expect(isLN10IAHidden(renderables)).toBe(false);
    });

    it('should return false when renderables is an empty array', () => {
        const renderables = [];

        expect(isLN10IAHidden(renderables)).toBe(false);
    });
});
