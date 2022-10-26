import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Context from 'fusion:context';
import Content from 'fusion:content';
import Share from '../../../../../../components/features/LN-nota/share/default';
import getToken from '../../../../../../components/private/common/utils/getToken';
import toggleBookmark from '../../../../../../components/private/common/utils/bookmarkHelper';
import useCheckBookmark from '../../../../../../components/private/common/hooks/bookmark/useCheckBookmark';
import useFetch from '../../../../../../components/private/common/hooks/useFetch';

jest.mock('fusion:context', Component => {
    return function(Component) {
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
    '../../../../../../components/private/common/hooks/bookmark/useCheckBookmark',
    () => jest.fn()
);

jest.mock('../../../../../../components/private/common/hooks/useFetch', () =>
    jest.fn()
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
        subtype: ''
    },
    requestUri: '/economia/dolar-hoy/'
};

Context.useAppContext = jest.fn(() => props);

Content.useContent = jest.fn(() => ({
    totalVisibleContent: '64'
}));

jest.mock('react', () => {
    const ActualReact = require.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({
            state: {
                loginData: {
                    subscription: true
                }
            },
            dispatch: jest.fn()
        })
    };
});

describe('Share', () => {
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
        toggleBookmark.mockImplementation(() => 200);
        useCheckBookmark.mockImplementation(
            () => '2aa355fd-2679-4e54-b552-ea404096c323'
        );

        component = render(<Share />);
        global.window.dataLayer = [];
    });

    afterEach(() => {
        component = null;
    });

    test('Snapshot - Should show 7 buttons ', () => {
        const { container } = component;
        expect(screen.getAllByRole('button').length).toStrictEqual(7);
        expect(container).toMatchSnapshot();
    });

    test('Should scroll to the comments section. ', () => {
        const button = screen.getByRole('button', {
            name: 'Ir a los comentarios de la nota'
        });

        expect(button).toBeTruthy();

        fireEvent.click(button);

        expect(window.dataLayer).toStrictEqual([
            {
                event: 'gtm.linkClick',
                clickText: 'Ir a los comentarios'
            }
        ]);

        expect(window.scrollTo).toHaveBeenCalled();
    });

    test('Should open whatsapp in a new window and record the click on dataLayer', () => {
        const button = screen.getByRole('button', {
            name: 'Compartir la nota en WhatsApp'
        });

        expect(button).toBeTruthy();

        fireEvent.click(button);

        expect(window.dataLayer).toStrictEqual([
            {
                event: 'gtm.linkClick',
                clickText: 'Compartir la nota en WhatsApp'
            }
        ]);
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

        expect(window.dataLayer).toStrictEqual([
            {
                event: 'gtm.linkClick',
                clickText: 'Copiar link de la nota'
            }
        ]);
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
        expect(
            container.querySelector('.mod-tooltip .com-text').innerHTML
        ).toStrictEqual('Copiado');
    });

    test('should open facebook in a new window and record the click on dataLayer', () => {
        const button = screen.getByRole('button', {
            name: 'Compartir la nota en Facebook'
        });

        expect(button).toBeTruthy();

        fireEvent.click(button);

        expect(window.dataLayer).toStrictEqual([
            {
                event: 'gtm.linkClick',
                clickText: 'Compartir la nota en Facebook'
            }
        ]);
        expect(window.open).toHaveBeenCalled();
    });

    test('should open Twitter in a new window and record the click on dataLayer', () => {
        const button = screen.getByRole('button', {
            name: 'Compartir la nota en Twitter'
        });

        expect(button).toBeTruthy();

        fireEvent.click(button);
        expect(window.dataLayer).toStrictEqual([
            {
                event: 'gtm.linkClick',
                clickText: 'Compartir la nota en Twitter'
            }
        ]);
        expect(window.open).toHaveBeenCalled();
    });

    test('should open E-mail in a new window and record the click on dataLayer', () => {
        const button = screen.getByRole('button', {
            name: 'Compartir la nota por E-mail'
        });

        expect(button).toBeTruthy();

        fireEvent.click(button);

        expect(window.dataLayer).toStrictEqual([
            {
                event: 'gtm.linkClick',
                clickText: 'Compartir la nota por E-mail'
            }
        ]);
        expect(window.open).toHaveBeenCalled();
    });

    test('Test click button bookmark', () => {
        getToken.mockImplementation(
            () => '9B979333-C7F4-4F46-8EA8-8BBCBB3F14DF'
        );

        const { container } = component;
        const button = screen.getByRole('button', {
            name: 'Notas guardadas'
        });

        expect(button).toBeTruthy();
        expect(button.classList.contains('--is-saved')).toBeTruthy();

        button.click();

        expect(window.dataLayer).toStrictEqual([
            {
                event: 'gtm.linkClick',
                clickText: 'Guardar Nota'
            }
        ]);
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
        expect(screen.getAllByRole('button').length).toStrictEqual(6);
        expect(container).toMatchSnapshot();
    });
});
