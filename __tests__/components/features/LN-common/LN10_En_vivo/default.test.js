import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Live from '../../../../../components/features/LN-common/LN10_En_Vivo/default';
import { useContent } from 'fusion:content';
import Context from 'fusion:context';
import Consumer from 'fusion:consumer';
import getRenderables from '../../../../../__mocks__/data/renderables/banners/dynamicBannersRenderables';
import { EventsHelper } from '../../../../../src/statics/common/js/eventsHelper';
import enVivoEventLogResult from '../../../../../__mocks__/data/LN10_En_vivo/enVivoEventLogResult.json';

jest.mock('fusion:consumer', component => {
    return function (component) {
        return component;
    };
});

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

describe('Tests - feature - EnVivo', () => {
    Context.useAppContext = jest.fn(() => ({
        isAdmin: true,
        renderables: getRenderables()
    }));

    const articleMock = {
        _id: 'GD7P4ZTE2FFBDAVBMLAK7V3Y6M',
        canonical_url: '/revista-living/prueba-logos-nid28052020/',
        headlines: {
            mobile: 'Prueba logos',
            basic: 'Esta es una nota de prueba de logos'
        },
        last_updated_date: '2022-12-23T15:06:17.701Z'
    };

    const props = {
        id: 'c0fvslLv0jJl95K',
        featureId: 'c0fvslLv0jJl95K',
        customFields: {
            noteId1: 'GD7P4ZTE2FFBDAVBMLAK7V3Y6M',
            chapitaStyle: null,
            chapita: '',
            title1: ''
        }
    };

    useContent.mockImplementation(() => articleMock);

    describe('Tests when they use a note id and the rest of the custom fields are empty.', () => {
        let component;
        beforeEach(() => {
            component = render(<Live {...props} />);
        });
        afterEach(() => (component = null));

        test('The text of the badge should be "vivo" by default', () => {
            expect(screen.getByText('vivo')).toBeDefined();
        });

        test('The badge should have the liveblog-red class by default', () => {
            const { container } = component;
            expect(container.querySelector('.--liveblog-red')).toBeDefined();
        });

        test('It should show the short title', () => {
            const { container } = component;
            expect(container.querySelector('.text').innerHTML).toStrictEqual(
                articleMock.headlines.mobile
            );
        });
    });

    describe('Tests when settings are added to custom fields.', () => {
        const props = {
            id: 'c0fvslLv0jJl95K',
            featureId: 'c0fvslLv0jJl95K',
            customFields: {
                noteId1: 'GD7P4ZTE2FFBDAVBMLAK7V3Y6M',
                chapitaStyle: 1,
                chapita: 'live',
                title1: 'Prueba logos'
            }
        };

        let component;

        beforeEach(() => {
            component = render(<Live {...props} />);
        });

        afterEach(() => (component = null));

        test('The text of the badge should be "live"', () => {
            expect(screen.getByText('live')).toBeDefined();
        });

        test('The badge should have the liveblog class and div with circle class', () => {
            const { container } = component;
            expect(container.querySelector('.liveblog')).toBeDefined();
            expect(container.querySelector('.circle')).toBeDefined();
        });

        test('It should show the custom title', () => {
            const { container } = component;
            expect(container.querySelector('.text').innerHTML).toStrictEqual(
                props.customFields.title1
            );
        });
    });

    describe('Test when the badge is not defined', () => {
        const properties = {
            id: 'c0fvslLv0jJl95K',
            featureId: 'c0fvslLv0jJl95K',
            customFields: {
                ...props.customFields,
                chapita: null
            }
        };
        test('should return badget in "VIVO" when the chapita is not defined', () => {
            render(<Live {...properties} />);
            expect(screen.getByText('vivo')).toBeVisible();
        });
    });

    describe('tests topics and events from Live', () => {
        global.window.dataLayer = [];

        Context.useAppContext = jest.fn(() => ({
            isAdmin: false,
            renderables: getRenderables()
        }));

        const props = {
            id: 'c0fvslLv0jJl95K',
            featureId: 'c0fvslLv0jJl95K',
            customFields: {
                noteId1: 'GD7P4ZTE2FFBDAVBMLAK7V3Y6M',
                chapitaStyle: null,
                chapita: '',
                title1: '',
                'title 0': 'Tema 1',
                'link 0': 'lanacion.com.ar',
                'title 1': 'Tema 2',
                'link 1': 'lanacion.com.ar',
                'title 2': 'Tema 3',
                'link 2': 'lanacion.com.ar',
                'title 3': 'Tema 4',
                'link 3': 'lanacion.com.ar',
                'title 4': 'Tema 5',
                'link 4': 'lanacion.com.ar'
            }
        };

        test('should renders topics data', () => {
            const { getByText } = render(<Live {...props} />);

            const topic = getByText('Tema 1');

            expect(topic).toBeInTheDocument();
            expect(topic.getAttribute('href')).toEqual('lanacion.com.ar');
        });

        test('should register in dataLayer the click events of each link', async () => {
            let eventsHelper = new EventsHelper();

            render(<Live {...props} />);
            eventsHelper.setEventsTopics();
            const links = screen.getAllByRole('link');
            links.forEach(link => link.click());

            await waitFor(() => {
                expect(window.dataLayer).toEqual(enVivoEventLogResult);
            });
        });
    });

    describe('Tests when the note id is not defined', () => {
        Context.useAppContext = jest.fn(() => ({
            isAdmin: true,
            renderables: getRenderables()
        }));

        const properties = {
            id: 'c0fvslLv0jJl95K',
            featureId: 'c0fvslLv0jJl95K',
            customFields: {
                ...props.customFields,
                noteId1: 'wrongId'
            }
        };

        test('should show an alert when the note id is wrong', () => {
            useContent.mockImplementation(() => undefined);
            render(<Live {...properties} />);

            const alertElement = screen.queryByText(
                'El ID de la nota 1 (ID: wrongId) es incorrecto'
            );

            expect(alertElement).toBeInTheDocument();
        });
    });
});
