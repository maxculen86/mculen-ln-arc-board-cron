import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/';

import { useAppContext } from 'fusion:context';
import RecetarioBody from '../../../../../../components/features/foodit-global/common/recetario/RecetarioBody';
import getBookmarks from '../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarks';
import getToken from '../../../../../../components/private/common/utils/getToken';
import useSiteServices from '../../../../../../components/features/LN-10-global/hooks/useSiteServices';
import siteServicesMock from '../../../../../../__mocks__/data/siteServices/siteServices.json';

class MockMutationObserver {
    constructor(callback) {
        this.callback = callback;
        this.observe = jest.fn();
        this.disconnect = jest.fn();
    }

    triggerMock(mutationsList) {
        this.callback(mutationsList, this);
    }
}

global.MutationObserver = MockMutationObserver;

jest.mock(
    '../../../../../../components/features/LN-10-global/hooks/useSiteServices',
    () => jest.fn()
);

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarks'
);
jest.mock(
    '../../../../../../components/features/foodit-global/common/bookmark/api/deleteBookmark',
    () => jest.fn()
);

jest.mock('../../../../../../components/private/common/utils/getToken');

useSiteServices.mockImplementation(() => {
    return siteServicesMock;
});
describe('RecetarioBody', () => {
    beforeEach(() => {
        useAppContext.mockImplementation(() => ({
            contextPath: '/test-path',
            deployment: () => '/test-deployment'
        }));

        global.IntersectionObserver = jest.fn((callback, options) => {
            return {
                observe: jest.fn(() => {
                    callback([{ isIntersecting: true }]);
                }),
                disconnect: jest.fn(),
                unobserve: jest.fn()
            };
        });
    });

    test('Should render Loading icon and after should render empty state component', async () => {
        getBookmarks.mockResolvedValueOnce({ data: [] });
        getToken.mockReturnValue('22');
        console.log(window.navigator.userAgent);

        render(<RecetarioBody />);

        await waitFor(() =>
            expect(screen.getByText('Cargando...')).toBeInTheDocument()
        );
        await waitFor(() =>
            expect(
                screen.getByText('Aún no hay nada por aca')
            ).toBeInTheDocument()
        );
    });

    test('Should render Loading icon and after should bookmarks', async () => {
        getBookmarks.mockResolvedValue({
            data: [
                { bookmarkTypeId: 'test1', bookmarkId: 'id1' },
                { bookmarkTypeId: 'test2', bookmarkId: 'id2' },
                { bookmarkTypeId: 'test3', bookmarkId: 'id3' }
            ]
        });

        getToken.mockReturnValue('22');

        render(<RecetarioBody />);
        await waitFor(() =>
            expect(screen.getByText('Cargando...')).toBeInTheDocument()
        );

        await waitFor(() =>
            expect(screen.getByText('Colecciones')).toBeInTheDocument()
        );
        await waitFor(() =>
            expect(screen.getByText('Todas (3)')).toBeInTheDocument()
        );
    });
});
