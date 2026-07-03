import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Context from 'fusion:context';
import Content from 'fusion:content';
import Share from '../../../../../../components/features/LN-nota/share/default';
import getToken from '../../../../../../components/private/common/utils/getToken';
import toggleBookmark from '../../../../../../components/private/common/utils/bookmarkHelper';
import useCheckBookmark from '../../../../../../components/private/common/hooks/bookmark/useCheckBookmark';
import useFetch from '../../../../../../components/private/common/hooks/useFetch';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';
import { getSectionOfRequestUri } from '../../../../../../components/private/common/utils/outputTypeHelper';

getSectionOfRequestUri;

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('../../../../../../components/private/common/utils/getToken', () =>
    jest.fn()
);

jest.mock(
    '../../../../../../components/private/common/utils/bookmarkHelper',
    () => jest.fn()
);

jest.mock(
    '../../../../../../components/private/common/utils/outputTypeHelper',
    () => ({
        getSectionOfRequestUri: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/common/hooks/bookmark/useCheckBookmark',
    () => jest.fn()
);

jest.mock('../../../../../../components/private/common/hooks/useFetch', () =>
    jest.fn()
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        __esModule: true,
        default: jest.fn(),
        addEventToDataLayerV2: jest.fn()
    })
);

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar',
    LOGIN_URL: 'https://login.lanacion.com.ar/',
    SITIO_SEGURO_REGISTRACION: 'https://suscripciones.lanacion.com.ar'
}));

jest.mock('@ln/hooks', () => ({
    useDisclosure: () => ({
        isOpen: false,
        onOpen: jest.fn(),
        onClose: jest.fn()
    })
}));

jest.mock(
    '../../../../../../components/private/common/auth/hooks/useAuthManager',
    () =>
        jest.fn(() => ({
            token: '9B979333-C7F4-4F46-8EA8-8BBCBB3F14DF',
            accessToken: 'test-access-token'
        }))
);

const props = {
    outputType: 'default',
    arcSite: 'la-nacion-ar',
    globalContent: {
        _id: 'L47IICAOMVFW5MV343TJIHS4RY',
        headlines: {
            basic: 'title',
            mobile: 'mobileTitle'
        },
        comments: {
            display_comments: true
        },
        first_publish_date: 'firstPublishDate',
        subtype: '',
        promo_items: {
            summary: {
                embed: {
                    config: {
                        arrayBullets: ['Primer bullet del resumen']
                    }
                }
            }
        }
    },
    requestUri: '/economia/dolar-hoy/',
    renderables: [
        {
            collection: 'features',
            type: 'LN-10/IA',
            props: {
                customFields: {
                    hideSummary: false
                }
            }
        }
    ],
    globalContentConfig: {
        query: {
            uri: '/economia/dolar-hoy/'
        }
    }
};

Context.useAppContext = jest.fn(() => props);

Content.useContent = jest.fn(() => ({
    totalVisibleContent: '64'
}));

describe('components - private - LN - nota - share', () => {
    useFetch.mockImplementation(() => ({
        data: {}
    }));
    delete global.window.open;
    global.window = Object.create(window);
    global.window.open = jest.fn();
    global.window.FB = {
        init: jest.fn(),
        ui: jest.fn()
    };
    global.window.scrollTo = jest.fn();

    let component;

    beforeEach(() => {
        toggleBookmark.mockResolvedValue({
            status: 200,
            bookmarkContent: {}
        });
        useCheckBookmark.mockImplementation(
            () => '2aa355fd-2679-4e54-b552-ea404096c323'
        );

        component = render(<Share />);
        global.window.dataLayer = [];
    });

    afterEach(() => {
        component = null;
    });

    test('Snapshot - Should show correct number of buttons for non-NOTICIA subtype', () => {
        const { container } = component;
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThanOrEqual(10);
        expect(container).toMatchSnapshot();
    });

    test('Should scroll to the comments section. ', () => {
        const button = screen.getByRole('button', {
            name: 'Ir a los comentarios de la nota'
        });

        expect(button).toBeTruthy();

        fireEvent.click(button);

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'e_linkclick',
            action: 'toolbard',
            category: 'nota_ln9',
            label: 'ver_comentarios'
        });

        expect(window.scrollTo).toHaveBeenCalled();
    });

    test('Should open whatsapp in a new window and record the click on dataLayer', () => {
        const button = screen.getByRole('button', {
            name: 'Compartir la nota en WhatsApp'
        });

        expect(button).toBeTruthy();

        fireEvent.click(button);

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'share_note',
            articleId: props.globalContent._id,
            title: props.globalContent.headlines.basic,
            rest: { tags: 'whatsapp' }
        });
        expect(window.open).toHaveBeenCalled();
    });

    test('Should copy the url to the clipboard and record the click in dataLayer', () => {
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn()
            }
        });
        const { container } = component;

        const button = screen.getByRole('button', {
            name: 'Copiar link de la nota'
        });

        expect(button).toBeTruthy();

        fireEvent.click(button);

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'share_note',
            title: props.globalContent.headlines.basic,
            articleId: props.globalContent._id,
            rest: { tags: 'link' }
        });
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
        expect(
            container.querySelector('.mod-tooltip .com-text').innerHTML
        ).toStrictEqual('Link copiado');
    });

    test('should open facebook in a new window and record the click on dataLayer', () => {
        const button = screen.getByRole('button', {
            name: 'Compartir la nota en Facebook'
        });

        expect(button).toBeTruthy();

        fireEvent.click(button);

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'share_note',
            title: props.globalContent.headlines.basic,
            articleId: props.globalContent._id,
            rest: { tags: 'facebook' }
        });
        expect(window.open).toHaveBeenCalled();
    });

    test('should open X (previously Twitter) in a new window and record the click on dataLayer', () => {
        const button = screen.getByRole('button', {
            name: 'Compartir la nota en X'
        });

        expect(button).toBeTruthy();

        fireEvent.click(button);

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'share_note',
            title: props.globalContent.headlines.basic,
            articleId: props.globalContent._id,
            rest: { tags: 'x' }
        });
        expect(window.open).toHaveBeenCalled();
    });

    test('should open E-mail in a new window and record the click on dataLayer', () => {
        const button = screen.getByRole('button', {
            name: 'Compartir la nota por E-mail'
        });

        expect(button).toBeTruthy();

        fireEvent.click(button);

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'share_note',
            title: props.globalContent.headlines.basic,
            articleId: props.globalContent._id,
            rest: { tags: 'mail' }
        });
        expect(window.open).toHaveBeenCalled();
    });

    test('Click on bookmark should SAVE the note if it was not saved', () => {
        getToken.mockImplementation(
            () => '9B979333-C7F4-4F46-8EA8-8BBCBB3F14DF'
        );

        useCheckBookmark.mockImplementation(() => '');

        component.rerender(<Share />);

        const button = screen.getByRole('button', { name: 'Guardar nota' });

        expect(button).toBeTruthy();

        fireEvent.click(button);

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'e_linkclick',
            action: 'toolbard',
            category: 'nota_ln9',
            label: 'guardar_nota'
        });
    });

    test('Clicking on bookmark should DELETE the note if it was already saved', () => {
        getToken.mockImplementation(
            () => '9B979333-C7F4-4F46-8EA8-8BBCBB3F14DF'
        );

        component.rerender(<Share bookmark="bookmarkId" />);

        const { container } = component;
        const button = screen.getByRole('button', { name: 'Guardar nota' });

        expect(button).toBeTruthy();
        expect(button.classList.contains('--is-saved')).toBeTruthy();

        fireEvent.click(button);

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'e_linkclick',
            action: 'toolbard',
            category: 'nota_ln9',
            label: 'eliminar_nota_guardada'
        });

        expect(useCheckBookmark).toHaveBeenCalled();
        expect(container).toMatchSnapshot();
    });
});

describe('Note display comment in false ', () => {
    beforeEach(() => {
        Context.useAppContext = jest.fn(() => ({
            ...props,
            globalContent: {
                ...props.globalContent,
                comments: {
                    display_comments: false
                }
            }
        }));
    });
    test('Matches snapshot when the note is not comments', () => {
        const { container } = render(<Share />);
        expect(screen.getAllByRole('button').length).toStrictEqual(9);
        expect(container).toMatchSnapshot();
    });
});

describe('Share buttons for NOTICIA subtype', () => {
    beforeEach(() => {
        Context.useAppContext = jest.fn(() => ({
            ...props,
            globalContent: {
                ...props.globalContent,
                subtype: '1'
            }
        }));
    });

    it('should show Google follow button for NOTICIA subtype', () => {
        const { container } = render(<Share />);
        const googleButton = screen.getByTitle('Seguir a LA NACION en Google');

        expect(googleButton).toBeTruthy();
        expect(googleButton).toHaveAttribute(
            'title',
            'Seguir a LA NACION en Google'
        );
        expect(container).toMatchSnapshot();
    });

    it('should NOT show WhatsApp mobile button for NOTICIA subtype', () => {
        const { container } = render(<Share />);
        const whatsappButton = container.querySelector('#whatsAppShareMobile');

        expect(whatsappButton).toBeNull();
    });

    it('should send correct DataLayer event when clicking Google follow button', () => {
        const { container } = render(<Share />);
        const googleButton = screen.getByTitle('Seguir a LA NACION en Google');

        fireEvent.click(googleButton);

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'e_linkclick',
            action: 'toolbard',
            category: 'nota_ln9',
            label: 'seguir_google'
        });
    });

    it('should show correct number of buttons for NOTICIA subtype (includes Google buttons)', () => {
        const { container } = render(<Share />);
        const buttons = screen.getAllByRole('button');
        const googleButtons = screen.getAllByTitle(
            'Seguir a LA NACION en Google'
        );

        expect(buttons.length).toBe(10);
        expect(googleButtons.length).toBe(1);
        expect(container).toMatchSnapshot();
    });
});

beforeEach(() => {
    window.LN = {
        observable: {
            publish: jest.fn(),
            subscribe: jest.fn(),
            unsubscribe: jest.fn()
        }
    };
});
