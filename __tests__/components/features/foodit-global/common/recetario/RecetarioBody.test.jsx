import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/';

import { useAppContext } from 'fusion:context';
import RecetarioBody from '../../../../../../components/features/foodit-global/common/recetario/RecetarioBody';
import useGetUserConfig from '../../../../../../components/features/foodit-global/hooks/useGetUserConfig';
import useGetRecetarioData from '../../../../../../components/features/foodit-global/common/recetario/hooks/useGetRecetarioData';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../../components/features/foodit-global/hooks/useGetUserConfig'
);

jest.mock(
    '../../../../../../components/private/common/auth/helper/loginHelper'
);
jest.mock(
    '../../../../../../components/features/foodit-global/common/recetario/hooks/useGetRecetarioData'
);
jest.mock(
    '../../../../../../components/features/foodit-global/common/bookmark/api/deleteBookmark',
    () => jest.fn()
);

jest.mock('../../../../../../components/private/common/utils/getToken');

jest.mock(
    '../../../../../../components/features/foodit-global/common/recetario/components/EditFolderModal',
    () =>
        ({ isOpen }) =>
            isOpen ? <div role="dialog">Edit Folder Modal</div> : null
);

describe('Components - Features - Foodit-global - Common - Recetario - RecetarioBody', () => {
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

    test('Should render empty state component variant="barrier-unlogged" when user is unlogged', () => {
        useGetRecetarioData.mockReturnValue({
            userBookmarks: [],
            setUserBookmarks: jest.fn(),
            loading: false
        });
        useGetUserConfig.mockReturnValue({
            userType: 'unlogged'
        });
        render(<RecetarioBody />);

        expect(
            screen.getByText('Exclusivo para suscriptores')
        ).toBeInTheDocument(),
            expect(
                screen.getByText(
                    'Para realizar esta acción es necesario que tengas una suscripción.'
                )
            ).toBeInTheDocument();
    });

    test('Should render empty state component variant="barrier-logged" when user is logged', () => {
        useGetRecetarioData.mockReturnValue({
            userBookmarks: [],
            setUserBookmarks: jest.fn(),
            loading: false
        });
        useGetUserConfig.mockReturnValue({
            userType: 'logged'
        });

        render(<RecetarioBody />);
        expect(
            screen.getByText('Exclusivo para suscriptores')
        ).toBeInTheDocument(),
            expect(
                screen.getByText(
                    'Para realizar esta acción es necesario que tengas una suscripción.'
                )
            ).toBeInTheDocument();
    });

    test('Should render bookmarks', () => {
        useGetRecetarioData.mockReturnValue({
            userBookmarks: [
                { bookmarkTypeId: 'test1', bookmarkId: 'id1' },
                { bookmarkTypeId: 'test2', bookmarkId: 'id2' },
                { bookmarkTypeId: 'test3', bookmarkId: 'id3' }
            ],
            setUserBookmarks: jest.fn(),
            loading: false
        });

        useGetUserConfig.mockReturnValue({
            userType: 'subscribed',
            isSubscribed: true
        });

        render(<RecetarioBody />);

        expect(screen.getByText('Colecciones')).toBeInTheDocument();

        expect(screen.getByText('Todas (3)')).toBeInTheDocument();
    });

    test('Should not render bookmarks when user is unlogged', () => {
        useGetRecetarioData.mockReturnValue({
            userBookmarks: [],
            setUserBookmarks: jest.fn(),
            loading: false
        });

        useGetUserConfig.mockReturnValue({
            userType: 'unlogged'
        });

        const { debug } = render(<RecetarioBody />);
        debug();

        expect(screen.queryByText('Colecciones')).not.toBeInTheDocument();
    });

    test('Should open modal on button click', async () => {
        useGetRecetarioData.mockReturnValue({
            userBookmarks: [
                {
                    bookmarkTypeId: 'group1',
                    bookmarkId: 'id1',
                    bookmarkGroup: 'group1'
                },
                {
                    bookmarkTypeId: 'group2',
                    bookmarkId: 'id2',
                    bookmarkGroup: 'group2'
                },
                {
                    bookmarkTypeId: 'group1',
                    bookmarkId: 'id3',
                    bookmarkGroup: 'group1'
                }
            ],
            setUserBookmarks: jest.fn(),
            loading: false
        });

        useGetUserConfig.mockReturnValue({
            userType: 'subscribed',
            isSubscribed: true
        });

        render(<RecetarioBody />);

        await waitFor(() =>
            expect(screen.getByText('Colecciones')).toBeInTheDocument()
        );
        await waitFor(() =>
            expect(screen.getByText('Todas (3)')).toBeInTheDocument()
        );

        const itemToSelect = screen.getByText('group1 (2)');
        fireEvent.click(itemToSelect);

        await waitFor(() =>
            expect(screen.getByText('group1 (2)')).toBeInTheDocument()
        );

        const editButton = screen.getByTestId('rename-collection-button');
        fireEvent.click(editButton);

        await waitFor(() =>
            expect(screen.getByRole('dialog')).toBeInTheDocument()
        );
    });
});
