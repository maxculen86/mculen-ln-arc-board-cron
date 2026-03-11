import React from 'react';
import { render, screen } from '@testing-library/react';
import SnippetIndex from '../../../../components/private/common/snippet';
import NotaSnippet from '../../../../components/private/LN/nota/snippet/receta';

jest.mock('../../../../components/private/LN/nota/snippet/receta', () =>
    jest.fn(() => <div data-testid="nota-snippet-mock" />)
);
jest.mock('../../../../components/private/LN/nota/snippet/noticia', () =>
    jest.fn(() => <div data-testid="noticia-snippet-mock" />)
);
jest.mock('../../../../components/private/LN/nota/snippet/liveblog', () =>
    jest.fn(() => <div data-testid="liveblog-snippet-mock" />)
);

describe('SnippetIndex Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const FAKE_MOCK_NOTA = {
        _id: 'DWFMIO47BZHVBPCUPI3GELE2CY',
        subtype: '14',
        type: 'story',
        canonical_url: '/economia/prueba-template-cards-nid08082025/',
        headlines: {
            basic: 'Prueba template cards'
        },
        taxonomy: {
            primary_section: {
                name: 'Economía',
                path: '/economia'
            },
            tags: []
        },
        credits: {
            by: [
                {
                    _id: 'juan-pravata-666',
                    name: 'Juan Pravata',
                    type: 'author',
                    additional_properties: {
                        original: {
                            bio_page: '/autor/juan-pravata-666/'
                        }
                    }
                }
            ]
        },
        content_restrictions: {
            content_code: 'comun'
        },
        distributor: {
            name: 'LA NACION'
        },
        owner: {
            sponsored: false
        },
        created_date: '2025-08-08T19:43:54.142Z',
        first_publish_date: '2025-08-08T19:43:57.31Z',
        last_updated_date: '2025-08-27T14:15:42.047Z',
        display_date: '2025-08-08T19:43:57.31Z',
        label: {
            trust: {
                text: 'Noticia Original'
            }
        },
        content_elements: [
            {
                _id: 'HJRZFMDVDNG2NJLIAUGICAIQBM',
                content: 'Cualquier cosa',
                type: 'text'
            }
        ],
        promo_items: {
            basic: {
                _id: 'YFTZ56QEXRB6XEDVVR442MHDYU',
                type: 'image',
                url: 'https://resizer.glanacion.com/resizer/v2/YFTZ56QEXRB6XEDVVR442MHDYU.jpeg?auth=637db575823a5e2e6843e841a63deab0dba582a2def2d36f27d65dca8f387828&width=768&quality=70&smart=false',
                height: 513,
                width: 768
            }
        },
        planning: {
            story_length: {
                word_count_actual: 20
            }
        },
        isListenable: false
    };
    test('Render the requested snippet', () => {
        render(
            <SnippetIndex
                globalContent={FAKE_MOCK_NOTA}
                arcSite="la-nacion-ar"
                layout="LN-nota-receta"
            />
        );

        const notaSnippet = screen.getByTestId('nota-snippet-mock');
        expect(notaSnippet).toBeInTheDocument();
    });

    test('Render Card layout with NoticiaSnippet', () => {
        render(
            <SnippetIndex
                globalContent={FAKE_MOCK_NOTA}
                arcSite="la-nacion-ar"
                layout="LN-Nota-Cards"
            />
        );

        const noticiaSnippet = screen.getByTestId('noticia-snippet-mock');
        expect(noticiaSnippet).toBeInTheDocument();
    });

    test('correct props to the Snippet', () => {
        render(
            <SnippetIndex
                globalContent={FAKE_MOCK_NOTA}
                arcSite="la-nacion-ar"
                layout="LN-nota-receta"
            />
        );

        expect(NotaSnippet).toHaveBeenCalledWith(
            expect.objectContaining({ globalContent: FAKE_MOCK_NOTA }),
            undefined
        );
    });

    test('not render anything if the layout is not configured', () => {
        render(
            <SnippetIndex
                globalContent={{}}
                arcSite="la-nacion-ar"
                layout="layout-inexistente"
            />
        );

        expect(
            screen.queryByTestId('nota-snippet-mock')
        ).not.toBeInTheDocument();
    });

    test('render null  configured', () => {
        <SnippetIndex globalContent={{}} arcSite="test" layout="clear" />;
    });
});

test('Render PaywallSnippet and NotaSnippet if conditions allow', () => {
    const FAKE_MOCK_NOTA = {
        subtype: 'LIVEBLOG',
        type: 'story'
    };

    render(
        <SnippetIndex
            globalContent={FAKE_MOCK_NOTA}
            arcSite="la-nacion-ar"
            layout="LN-nota-receta"
        />
    );

    const notaSnippet = screen.getByTestId('nota-snippet-mock');
    expect(notaSnippet).toBeInTheDocument();
});
