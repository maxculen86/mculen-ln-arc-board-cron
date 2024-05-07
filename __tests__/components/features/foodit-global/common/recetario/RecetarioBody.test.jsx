import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/';

import { useAppContext } from 'fusion:context';
import RecetarioBody from '../../../../../../components/features/foodit-global/common/recetario/RecetarioBody';
import getBookmarks from '../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarks';
import useGetUserData, {
    isFooditSuscriptor
} from '../../../../../../components/features/foodit-global/hooks/useGetUserData';

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

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));
jest.mock(
    '../../../../../../components/features/foodit-global/hooks/useGetUserData'
);
jest.mock(
    '../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarks'
);
jest.mock(
    '../../../../../../components/features/foodit-global/common/bookmark/api/deleteBookmark',
    () => jest.fn()
);

jest.mock('../../../../../../components/private/common/utils/getToken');

xdescribe('RecetarioBody', () => {
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

    test('Should render empty state component variant="barrier-unlogged" when user is unlogged', async () => {
        getBookmarks.mockResolvedValueOnce({ data: [] });
        useGetUserData.mockReturnValue({
            userType: 'unlogged'
        });
        render(<RecetarioBody />);

        await waitFor(
            () =>
                expect(
                    screen.getByText('¡Exclusivo suscriptor!')
                ).toBeInTheDocument(),
            expect(
                screen.getByText(
                    'Para realizar esta acción es necesario que inicies sesión.'
                )
            ).toBeInTheDocument()
        );
    });
    test('Should render empty state component variant="barrier-logged" when user is logged', async () => {
        getBookmarks.mockResolvedValueOnce({ data: [] });
        useGetUserData.mockReturnValue({
            userType: 'logged'
        });

        render(<RecetarioBody />);
        await waitFor(
            () =>
                expect(
                    screen.getByText('¡Exclusivo suscriptor!')
                ).toBeInTheDocument(),
            expect(
                screen.getByText(
                    'Para realizar esta acción es necesario que tengas una suscripción.'
                )
            ).toBeInTheDocument()
        );
    });

    test('Should render bookmarks', async () => {
        getBookmarks.mockReturnValue({
            data: [
                { bookmarkTypeId: 'test1', bookmarkId: 'id1' },
                { bookmarkTypeId: 'test2', bookmarkId: 'id2' },
                { bookmarkTypeId: 'test3', bookmarkId: 'id3' }
            ]
        });

        useGetUserData.mockReturnValue({
            userType: 'subscribed'
        });

        isFooditSuscriptor.mockReturnValue(true);

        render(<RecetarioBody />);

        await waitFor(() =>
            expect(screen.getByText('Colecciones')).toBeInTheDocument()
        );
        await waitFor(() =>
            expect(screen.getByText('Todas (3)')).toBeInTheDocument()
        );
    });
});
