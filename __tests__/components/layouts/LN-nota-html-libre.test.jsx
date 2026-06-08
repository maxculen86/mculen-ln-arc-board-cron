import React from 'react';
import { render, screen } from '@testing-library/react';
import LnNotaHtmlLibre from '../../../components/layouts/LN-nota-html-libre';
import useScrollDispatcher from '../../../components/features/LN-common/hooks/useScrollDispatcher';
import registerScrollTracking from '../../../components/features/LN/DS-Body/helpers/registerScrollTracking';
import { HTML_LIBRE_SCROLL_CONTENT_SELECTOR } from '../../../components/private/LN/nota/cuerpo/htmlLibre';

jest.mock('fusion:consumer', () => Component => Component);

jest.mock(
    '../../../components/features/LN-common/hooks/useScrollDispatcher',
    () => jest.fn()
);

jest.mock(
    '../../../components/features/LN/DS-Body/helpers/registerScrollTracking',
    () => jest.fn()
);

jest.mock('../../../components/features/LN-10-global/header/default', () => ({
    __esModule: true,
    default: () => <header data-testid="header" />
}));

jest.mock('../../../components/private/LN/nota/cuerpo/htmlLibre', () => ({
    __esModule: true,
    HTML_LIBRE_SCROLL_CONTENT_SELECTOR:
        '[data-html-libre-scroll-content="true"]',
    default: () => (
        <div data-testid="html-libre" data-html-libre-scroll-content="true" />
    )
}));

jest.mock(
    '../../../components/features/LN/common/adsManager/components/adsStrategySelector',
    () => ({
        __esModule: true,
        default: () => <div data-testid="ads-strategy-selector" />
    })
);

jest.mock('../../../components/private/common/context/globalContext', () => ({
    __esModule: true,
    default: ({ children }) => (
        <div data-testid="global-provider">{children}</div>
    )
}));

jest.mock('../../../components/features/LN-10-global/pwaModal/default', () => ({
    __esModule: true,
    default: () => <div data-testid="pwa-modal" />
}));

jest.mock('../../../components/layouts/helpers/initCtrlGrp', () => ({
    __esModule: true,
    default: () => <div data-testid="init-control-group" />
}));

describe('LN-nota-html-libre layout', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('registers scroll tracking against the html libre content node', () => {
        const noteId = 'MDF2WYHSG5AJTLA2VNKUB53HSU';

        render(
            <LnNotaHtmlLibre
                globalContent={{ _id: noteId }}
                children={[
                    <div key="banner">Banner</div>,
                    <div key="bottom">Bottom</div>,
                    <div key="bottom-tercera">Bottom tercera</div>
                ]}
            />
        );

        expect(useScrollDispatcher).toHaveBeenCalledWith({
            startSelector: HTML_LIBRE_SCROLL_CONTENT_SELECTOR,
            endSelector: HTML_LIBRE_SCROLL_CONTENT_SELECTOR
        });
        expect(registerScrollTracking).toHaveBeenCalledWith(noteId);
        expect(screen.getByTestId('html-libre')).toHaveAttribute(
            'data-html-libre-scroll-content',
            'true'
        );
    });
});
