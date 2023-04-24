import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Live from '../../../../../components/features/LN-common/LN10_En_Vivo/default';
import { useContent } from 'fusion:content';
import Context from 'fusion:context';
import Consumer from 'fusion:consumer';
import getRenderables from '../../../../../__mocks__/data/renderables/banners/dynamicBannersRenderables';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

jest.mock('fusion:context', Component => {
    return function(Component) {
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
                title1: 'Nuevo titulo corto'
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

    describe('Tests when the note id is not defined', () => {
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

            expect(screen.getByText('Advertencia')).toBeDefined();
            expect(
                screen.getByText(
                    'El ID de la nota 1 (ID: wrongId) es incorrecto'
                )
            ).toBeDefined();
        });
    });
});
