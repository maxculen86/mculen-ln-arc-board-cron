import React from 'react';
import { render, screen } from '@testing-library/react';
import SnippetIndex from '../../../../components/private/common/snippet';
import NotaSnippet from '../../../../components/private/LN/nota/snippet/receta';

jest.mock('../../../../components/private/LN/nota/snippet/receta', () =>
    jest.fn(() => <div data-testid="nota-snippet-mock" />)
);
jest.mock('../../../../components/private/LN/nota/snippet/liveblog', () =>
    jest.fn(() => <div data-testid="liveblog-snippet-mock" />)
);
jest.mock('../../../../components/private/LN/nota/snippet/paywall', () =>
    jest.fn(() => <div data-testid="paywall-snippet-mock" />)
);

describe('SnippetIndex Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const FAKE_MOCK_NOTA = {
        subtype: 'LiveBlog',
        type: null
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
            expect.anything()
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

    const paywallSnippet = screen.getByTestId('paywall-snippet-mock');
    expect(paywallSnippet).toBeInTheDocument();
});
