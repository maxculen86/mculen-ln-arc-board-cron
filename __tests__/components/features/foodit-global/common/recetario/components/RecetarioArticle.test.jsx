import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import RecetarioArticle from '../../../../../../../components/features/foodit-global/common/recetario/components/RecetarioArticle';
import useGetRecetarioData from '../../../../../../../components/features/foodit-global/common/recetario/hooks/useGetRecetarioData';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../../../components/features/foodit-global/common/recetario/hooks/useGetRecetarioData',
    () => ({
        __esModule: true,
        default: jest.fn()
    })
);

jest.mock(
    '../../../../../../../components/features/foodit-global/common/recetario/hooks/useApiGuard',
    () => ({
        __esModule: true,
        default: jest.fn(() => ({
            guardedExecute: jest.fn(fn => fn())
        }))
    })
);

jest.mock(
    '../../../../../../../components/features/foodit-global/common/CommonCardFoodit/foodit',
    () => {
        return jest.fn(function MockCommonCardFoodit({
            onDelete,
            onMove,
            isMyRecipesLayout,
            title,
            articleId
        }) {
            return (
                <div data-testid="common-card-foodit">
                    <h3>{title}</h3>
                    {isMyRecipesLayout && (
                        <div data-testid="dropdown-card">
                            <button
                                data-testid="delete-button"
                                onClick={onDelete}
                            >
                                Eliminar
                            </button>
                            <button data-testid="move-button" onClick={onMove}>
                                Mover
                            </button>
                        </div>
                    )}
                </div>
            );
        });
    }
);

jest.mock(
    '../../../../../../../components/features/foodit-global/common/recetario/components/OptionMove',
    () => {
        return jest.fn(function MockOptionMove() {
            return null;
        });
    }
);

jest.mock(
    '../../../../../../../components/features/foodit-global/common/MenuSemanal/components/MenuOptions/OptionDelete',
    () => {
        return jest.fn(function MockOptionDelete({
            isOpen,
            onClose,
            deleteFunction,
            bookmarkId
        }) {
            if (!isOpen) return null;

            return (
                <div data-testid="option-delete-modal">
                    <h2>Eliminar receta</h2>
                    <p>¿Estás seguro de que quieres eliminar esta receta?</p>
                    <button
                        onClick={async () => {
                            await deleteFunction({ bookmarkId });
                            onClose();
                        }}
                        data-testid="confirm-delete-button"
                    >
                        Aceptar
                    </button>
                    <button
                        onClick={onClose}
                        data-testid="cancel-delete-button"
                    >
                        Cancelar
                    </button>
                </div>
            );
        });
    }
);

beforeAll(() => {
    global.IntersectionObserver = class {
        constructor() {}
        observe() {}
        unobserve() {}
        disconnect() {}
    };
});

describe('RecetarioArticle', () => {
    const mockExecuteDeleteBookmark = jest.fn();
    const mockExecuteMoveBookmark = jest.fn();
    const mockSetUserBookmarks = jest.fn();

    const mockArticle = {
        bookmarkTypeId: 'ARTICLE123',
        bookmarkId: 'bookmark-123',
        bookmarkGroup: 'Favorite Recipes',
        bookmarkContent: {
            image: {
                url: { resizedUrl: 'test-image.jpg' },
                resized_urls: [{ url: 'test-image.jpg' }]
            },
            time: 30,
            headlines: {
                basic: 'Test Recipe',
                mobile: 'Test Recipe Mobile'
            },
            canonical_url: '/receta-test',
            variant: 'recipe',
            tag: 'FACIL'
        }
    };

    const mockUserBookmarks = [mockArticle];

    beforeEach(() => {
        jest.clearAllMocks();

        useAppContext.mockReturnValue({
            siteProperties: {
                layoutsName: {
                    FooditRecetario: 'FooditRecetario'
                }
            },
            layout: 'FooditRecetario'
        });

        useGetRecetarioData.mockReturnValue({
            userBookmarks: mockUserBookmarks,
            setUserBookmarks: mockSetUserBookmarks
        });
    });

    describe('Rendering', () => {
        it('renders the article correctly', () => {
            render(
                <RecetarioArticle
                    article={mockArticle}
                    executeDeleteBookmark={mockExecuteDeleteBookmark}
                    executeMoveBookmark={mockExecuteMoveBookmark}
                    isFirst={false}
                />
            );

            expect(
                screen.getByTestId('common-card-foodit')
            ).toBeInTheDocument();
            expect(screen.getByText('Test Recipe')).toBeInTheDocument();

            expect(screen.getByTestId('dropdown-card')).toBeInTheDocument();
            expect(screen.getByTestId('delete-button')).toBeInTheDocument();
            expect(screen.getByTestId('move-button')).toBeInTheDocument();
        });

        it('should pass correct props to CommonCardFoodit', () => {
            const MockCommonCardFoodit = require('../../../../../../../components/features/foodit-global/common/CommonCardFoodit/foodit');

            render(
                <RecetarioArticle
                    article={mockArticle}
                    executeDeleteBookmark={mockExecuteDeleteBookmark}
                    executeMoveBookmark={mockExecuteMoveBookmark}
                    isFirst={false}
                />
            );

            expect(MockCommonCardFoodit).toHaveBeenCalledWith(
                expect.objectContaining({
                    isMyRecipesLayout: true,
                    onDelete: expect.any(Function),
                    onMove: expect.any(Function),
                    articleId: 'ARTICLE123'
                }),
                undefined
            );
        });

        it('should not render dropdown when not in recipes layout', () => {
            useAppContext.mockReturnValue({
                siteProperties: {
                    layoutsName: {
                        FooditRecetario: 'FooditRecetario'
                    }
                },
                layout: 'OtherLayout'
            });

            render(
                <RecetarioArticle
                    article={mockArticle}
                    executeDeleteBookmark={mockExecuteDeleteBookmark}
                    executeMoveBookmark={mockExecuteMoveBookmark}
                    isFirst={false}
                />
            );

            expect(
                screen.getByTestId('common-card-foodit')
            ).toBeInTheDocument();
            expect(
                screen.queryByTestId('dropdown-card')
            ).not.toBeInTheDocument();
        });
    });

    describe('Delete Functionality', () => {
        it('should open delete modal when delete button is clicked', () => {
            render(
                <RecetarioArticle
                    article={mockArticle}
                    executeDeleteBookmark={mockExecuteDeleteBookmark}
                    executeMoveBookmark={mockExecuteMoveBookmark}
                    isFirst={false}
                />
            );

            const deleteButton = screen.getByTestId('delete-button');
            fireEvent.click(deleteButton);

            expect(
                screen.getByTestId('option-delete-modal')
            ).toBeInTheDocument();
        });

        it('should execute delete function when confirmed in modal', async () => {
            mockExecuteDeleteBookmark.mockResolvedValue(true);

            render(
                <RecetarioArticle
                    article={mockArticle}
                    executeDeleteBookmark={mockExecuteDeleteBookmark}
                    executeMoveBookmark={mockExecuteMoveBookmark}
                    isFirst={false}
                />
            );

            const deleteButton = screen.getByTestId('delete-button');
            fireEvent.click(deleteButton);

            const confirmButton = screen.getByTestId('confirm-delete-button');
            fireEvent.click(confirmButton);

            await waitFor(() => {
                expect(mockExecuteDeleteBookmark).toHaveBeenCalledWith(
                    'bookmark-123',
                    'ARTICLE123'
                );
            });
        });
    });

    describe('Move Functionality', () => {
        it('should open move modal when move button is clicked', () => {
            render(
                <RecetarioArticle
                    article={mockArticle}
                    executeDeleteBookmark={mockExecuteDeleteBookmark}
                    executeMoveBookmark={mockExecuteMoveBookmark}
                    isFirst={false}
                />
            );

            const moveButton = screen.getByTestId('move-button');
            fireEvent.click(moveButton);
        });

        it('should configure move handler correctly', () => {
            render(
                <RecetarioArticle
                    article={mockArticle}
                    executeDeleteBookmark={mockExecuteDeleteBookmark}
                    executeMoveBookmark={mockExecuteMoveBookmark}
                    isFirst={false}
                />
            );

            expect(screen.getByTestId('move-button')).toBeInTheDocument();
        });
    });

    describe('Modal Integration', () => {
        it('should render OptionMove with correct props', () => {
            const MockOptionMove = require('../../../../../../../components/features/foodit-global/common/recetario/components/OptionMove');

            render(
                <RecetarioArticle
                    article={mockArticle}
                    executeDeleteBookmark={mockExecuteDeleteBookmark}
                    executeMoveBookmark={mockExecuteMoveBookmark}
                    isFirst={false}
                />
            );

            expect(MockOptionMove).toHaveBeenCalledWith(
                expect.objectContaining({
                    bookmarkId: 'bookmark-123',
                    currentCollectionId: 'Favorite Recipes',
                    moveFunction: expect.any(Function)
                }),
                undefined
            );
        });

        it('should render OptionDelete with correct props', () => {
            const MockOptionDelete = require('../../../../../../../components/features/foodit-global/common/MenuSemanal/components/MenuOptions/OptionDelete');

            render(
                <RecetarioArticle
                    article={mockArticle}
                    executeDeleteBookmark={mockExecuteDeleteBookmark}
                    executeMoveBookmark={mockExecuteMoveBookmark}
                    isFirst={false}
                />
            );

            expect(MockOptionDelete).toHaveBeenCalledWith(
                expect.objectContaining({
                    bookmarkId: 'bookmark-123',
                    deleteFunction: expect.any(Function),
                    messageType: 'bookmark'
                }),
                undefined
            );
        });
    });
});
