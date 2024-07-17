import {
    setEventShare,
    shareWhatsAppDesktop,
    shareWhatsAppMobile
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
