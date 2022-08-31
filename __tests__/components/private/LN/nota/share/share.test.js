import React from 'react';
import { render, screen } from '@testing-library/react';
import Context from 'fusion:context';
import Content from 'fusion:content';
import Share from '../../../../../../components/features/LN-nota/share/default';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

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
            }
        })
    };
});

describe('Share', () => {
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
        const { container } = component;
        const button = container.querySelector('#btncomments');
        button.click();
        expect(window.dataLayer).toStrictEqual([
            {
                event: 'gtm.linkClick',
                clickText: 'Ir a los comentarios'
            }
        ]);

        expect(window.scrollTo).toHaveBeenCalled();
    });

    test('Should open whatsapp in a new window and record the click on dataLayer', () => {
        const { container } = component;
        const button = container.querySelector('#whatsAppShareDesktop');
        button.click();
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
        const button = container.querySelector('#copyLinkNote');
        button.click();
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
        const { container } = component;
        const button = container.querySelector('#btnfacebook');
        button.click();
        expect(window.dataLayer).toStrictEqual([
            {
                event: 'gtm.linkClick',
                clickText: 'Compartir la nota en Facebook'
            }
        ]);
        expect(window.open).toHaveBeenCalled();
    });

    test('should open Twitter in a new window and record the click on dataLayer', () => {
        const { container } = component;
        const button = container.querySelector('#btntwitter');
        button.click();
        expect(window.dataLayer).toStrictEqual([
            {
                event: 'gtm.linkClick',
                clickText: 'Compartir la nota en Twitter'
            }
        ]);
        expect(window.open).toHaveBeenCalled();
    });

    test('should open E-mail in a new window and record the click on dataLayer', () => {
        const { container } = component;
        const button = container.querySelector('#btnemail');
        button.click();
        expect(window.dataLayer).toStrictEqual([
            {
                event: 'gtm.linkClick',
                clickText: 'Compartir la nota por E-mail'
            }
        ]);
        expect(window.open).toHaveBeenCalled();
    });

    test('Test click button bookmark when the user is not subscriber', () => {
        const { container } = component;
        const button = container.querySelector('#btnbookmark');

        button.click();

        const badge = document.querySelector('.barrier .badge');
        const descriptionBarrier = document.querySelector(
            '.barrier .description .com-text'
        );

        expect(window.dataLayer).toStrictEqual([
            {
                event: 'gtm.linkClick',
                clickText: 'Guardar Nota'
            }
        ]);

        expect(badge.querySelector('span').innerHTML).toStrictEqual(
            'Exclusivo suscriptor'
        );

        expect(descriptionBarrier.innerHTML).toStrictEqual(
            'Para realizar esta acción adquirí una <strong> suscripción.</strong>'
        );

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
