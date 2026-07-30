import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MenuSemanalDialog from '../../../../../../../components/features/foodit-global/common/MenuSemanal/components/MenuSemanalDialog';
import { saveMenu } from '../../../../../../../components/features/foodit-global/common/bookmark/api/menuSave';
import { addToast } from '../../../../../../../components/features/foodit-global/common/bookmark/api/_helper';
import { addEventToDataLayerV2 } from '../../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../../../components/features/foodit-global/common/bookmark/api/menuSave'
);
jest.mock(
    '../../../../../../../components/features/foodit-global/common/bookmark/api/_helper'
);
jest.mock(
    '../../../../../../../components/private/LN/common/utils/addEventToDataLayer'
);
jest.mock(
    '../../../../../../../components/features/foodit-global/hooks/useGetUserConfig',
    () => ({
        __esModule: true,
        default: jest.fn(() => ({
            isSubscribed: true,
            userType: 'subscriber'
        }))
    })
);

jest.mock('@ln/common-ui-dialog', () => {
    const Dialog = ({ isOpen, children, classnames, onClose }) => {
        if (!isOpen) return null;
        return (
            <div
                className={classnames?.base}
                data-testid="dialog"
                role="dialog"
                onClick={e => {
                    if (e.target.dataset.testid === 'dialog') {
                        onClose?.();
                    }
                }}
            >
                <div className={classnames?.wrapper}>{children}</div>
            </div>
        );
    };
    Dialog.Header = ({ children, className }) => (
        <div className={className} data-testid="dialog-header">
            {children}
        </div>
    );
    Dialog.Body = ({ children }) => (
        <div data-testid="dialog-body">{children}</div>
    );
    return { Dialog };
});

jest.mock('@ln/foodit-ui-button', () => ({
    Button: ({ children, onClick, title, variant, disabled, ...rest }) => (
        <button
            data-variant={variant}
            onClick={onClick}
            title={title}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    )
}));

jest.mock('@ln/common-ui-icon', () => ({
    Icon: ({ children }) => <i data-testid="icon">{children}</i>
}));

jest.mock(
    '../../../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () => {
        return function IconSprite({ name }) {
            return <span data-testid="icon-sprite">{name}</span>;
        };
    }
);

jest.mock('@ln/common-ui-text', () => ({
    Text: ({ children, className }) => (
        <div className={className} data-testid="text">
            {children}
        </div>
    )
}));

jest.mock(
    '../../../../../../../components/features/foodit-global/common/MenuSemanal/SaveMenu/SelectMenu',
    () => ({
        SelectMenu: ({
            setSelectedDay,
            setSelectedFood,
            selectedDay,
            selectedFood
        }) => (
            <div data-testid="select-menu">
                <button
                    data-testid="select-day-monday"
                    onClick={() => setSelectedDay('monday')}
                >
                    Select Monday
                </button>
                <button
                    data-testid="select-food-lunch"
                    onClick={() => setSelectedFood('lunch')}
                >
                    Select Lunch
                </button>
                <div data-testid="selected-day">{selectedDay}</div>
                <div data-testid="selected-food">{selectedFood}</div>
            </div>
        )
    })
);

jest.mock(
    '../../../../../../../components/features/foodit-global/common/MenuSemanal/SaveMenu/FooterMenu',
    () => ({
        FooterMenu: ({ onClose, saveMenuWeekly, isDisabled }) => (
            <div data-testid="footer-menu">
                <button
                    data-testid="btn-accept"
                    onClick={saveMenuWeekly}
                    disabled={isDisabled}
                    title="aceptar"
                >
                    Aceptar
                </button>
                <button
                    data-testid="btn-cancel"
                    onClick={onClose}
                    title="cancelar"
                >
                    Cancelar
                </button>
            </div>
        )
    })
);

jest.mock(
    '../../../../../../../components/features/foodit-global/common/emptyState/foodit',
    () => {
        return function EmptyState({ variant, direction }) {
            return (
                <div
                    data-testid="empty-state"
                    data-variant={variant}
                    data-direction={direction}
                />
            );
        };
    }
);

jest.mock(
    '../../../../../../../components/features/ui/foodit/emptyState/default',
    () => ({
        __esModule: true,
        EmptyStateDS: ({ variant, direction }) => (
            <div
                data-testid="empty-state"
                data-variant={variant}
                data-direction={direction}
            />
        )
    })
);

const mockArticle = {
    _id: 'article-123',
    headlines: {
        basic: 'Test Recipe Title'
    }
};

const mockWeeklyMenu = [
    {
        bookmarkId: 'bm1',
        bookmarkGroup: 'monday',
        bookmarkContent: {
            id: 'article-456',
            food: 'lunch'
        }
    },
    {
        bookmarkId: 'bm2',
        bookmarkGroup: 'monday',
        bookmarkContent: {
            id: 'article-789',
            food: 'dinner'
        }
    }
];

describe('MenuSemanalDialog', () => {
    let props;

    beforeEach(() => {
        props = {
            article: mockArticle,
            onClose: jest.fn(),
            isOpen: true,
            weeklyMenu: mockWeeklyMenu,
            setWeeklyMenu: jest.fn()
        };
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('should render dialog when isOpen is true', () => {
            render(<MenuSemanalDialog {...props} />);
            expect(screen.getByTestId('dialog')).toBeInTheDocument();
            expect(screen.getByTestId('dialog-header')).toBeInTheDocument();
            expect(screen.getByTestId('dialog-body')).toBeInTheDocument();
        });

        it('should not render dialog when isOpen is false', () => {
            render(<MenuSemanalDialog {...props} isOpen={false} />);
            expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
        });

        it('should render dialog with correct title for subscribers', () => {
            render(<MenuSemanalDialog {...props} />);
            expect(screen.getByTestId('text')).toHaveTextContent(
                'Agregar al menú semanal'
            );
        });

        it('should render SelectMenu and FooterMenu for subscribers', () => {
            render(<MenuSemanalDialog {...props} />);
            expect(screen.getByTestId('select-menu')).toBeInTheDocument();
            expect(screen.getByTestId('footer-menu')).toBeInTheDocument();
        });
    });

    describe('Close functionality', () => {
        it('should call onClose when close button is clicked', () => {
            render(<MenuSemanalDialog {...props} />);
            const closeButton = screen.getByTitle('Cerrar');
            fireEvent.click(closeButton);
            expect(props.onClose).toHaveBeenCalledTimes(1);
        });

        it('should call onClose when cancel button is clicked', () => {
            render(<MenuSemanalDialog {...props} />);
            const cancelButton = screen.getByTestId('btn-cancel');
            fireEvent.click(cancelButton);
            expect(props.onClose).toHaveBeenCalledTimes(1);
        });

        it('should reset state when dialog is closed', () => {
            const { rerender } = render(<MenuSemanalDialog {...props} />);

            fireEvent.click(screen.getByTestId('select-day-monday'));
            fireEvent.click(screen.getByTestId('select-food-lunch'));

            expect(screen.getByTestId('selected-day')).toHaveTextContent(
                'monday'
            );
            expect(screen.getByTestId('selected-food')).toHaveTextContent(
                'lunch'
            );

            fireEvent.click(screen.getByTitle('Cerrar'));

            rerender(<MenuSemanalDialog {...props} isOpen={false} />);
            rerender(<MenuSemanalDialog {...props} isOpen={true} />);
            expect(screen.getByTestId('selected-day')).toBeEmptyDOMElement();
            expect(screen.getByTestId('selected-food')).toBeEmptyDOMElement();
        });
    });

    describe('Selection functionality', () => {
        it('should update selectedDay when day is selected', () => {
            render(<MenuSemanalDialog {...props} />);

            fireEvent.click(screen.getByTestId('select-day-monday'));

            expect(screen.getByTestId('selected-day')).toHaveTextContent(
                'monday'
            );
        });

        it('should update selectedFood when food is selected', () => {
            render(<MenuSemanalDialog {...props} />);

            fireEvent.click(screen.getByTestId('select-food-lunch'));

            expect(screen.getByTestId('selected-food')).toHaveTextContent(
                'lunch'
            );
        });

        it('should disable accept button when no day is selected', () => {
            render(<MenuSemanalDialog {...props} />);

            fireEvent.click(screen.getByTestId('select-food-lunch'));

            const acceptButton = screen.getByTestId('btn-accept');
            expect(acceptButton).toBeDisabled();
        });

        it('should disable accept button when no food is selected', () => {
            render(<MenuSemanalDialog {...props} />);

            fireEvent.click(screen.getByTestId('select-day-monday'));

            const acceptButton = screen.getByTestId('btn-accept');
            expect(acceptButton).toBeDisabled();
        });

        it('should enable accept button when both day and food are selected', () => {
            render(<MenuSemanalDialog {...props} />);

            fireEvent.click(screen.getByTestId('select-day-monday'));
            fireEvent.click(screen.getByTestId('select-food-lunch'));

            const acceptButton = screen.getByTestId('btn-accept');
            expect(acceptButton).not.toBeDisabled();
        });
    });

    describe('Save functionality', () => {
        it('should save menu successfully when accept is clicked', async () => {
            const mockResult = {
                bookmarkId: 'new-bookmark-123',
                bookmarkGroup: 'monday',
                bookmarkContent: {
                    id: 'article-123',
                    food: 'lunch'
                }
            };

            saveMenu.mockResolvedValue(mockResult);

            render(<MenuSemanalDialog {...props} />);

            fireEvent.click(screen.getByTestId('select-day-monday'));
            fireEvent.click(screen.getByTestId('select-food-lunch'));
            fireEvent.click(screen.getByTestId('btn-accept'));

            await waitFor(() => {
                expect(saveMenu).toHaveBeenCalledWith({
                    article: mockArticle,
                    selectedDay: 'monday',
                    selectedFood: 'lunch'
                });
            });

            await waitFor(() => {
                expect(props.setWeeklyMenu).toHaveBeenCalledWith(
                    expect.any(Function)
                );
            });

            await waitFor(() => {
                expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                    event: 'e_linkclick',
                    category: 'interaction',
                    action: 'guardar',
                    label: 'menu_semanal',
                    title: 'Test Recipe Title',
                    articleId: 'article-123'
                });
            });

            await waitFor(() => {
                expect(props.onClose).toHaveBeenCalled();
            });
        });

        it('should not call saveMenu if day or food is missing', async () => {
            render(<MenuSemanalDialog {...props} />);

            const consoleErrorSpy = jest
                .spyOn(console, 'error')
                .mockImplementation(() => {});

            fireEvent.click(screen.getByTestId('select-day-monday'));
            // Not selecting food
            fireEvent.click(screen.getByTestId('btn-accept'));

            await waitFor(() => {
                expect(saveMenu).not.toHaveBeenCalled();
            });

            consoleErrorSpy.mockRestore();
        });

        it('should show error toast when limit is reached (3 recipes per day/meal)', async () => {
            const weeklyMenuWithLimit = [
                {
                    bookmarkId: 'bm1',
                    bookmarkGroup: 'monday',
                    bookmarkContent: { id: 'art1', food: 'lunch' }
                },
                {
                    bookmarkId: 'bm2',
                    bookmarkGroup: 'monday',
                    bookmarkContent: { id: 'art2', food: 'lunch' }
                },
                {
                    bookmarkId: 'bm3',
                    bookmarkGroup: 'monday',
                    bookmarkContent: { id: 'art3', food: 'lunch' }
                }
            ];

            render(
                <MenuSemanalDialog
                    {...props}
                    weeklyMenu={weeklyMenuWithLimit}
                />
            );

            fireEvent.click(screen.getByTestId('select-day-monday'));
            fireEvent.click(screen.getByTestId('select-food-lunch'));
            fireEvent.click(screen.getByTestId('btn-accept'));

            await waitFor(() => {
                expect(addToast).toHaveBeenCalledWith(
                    expect.objectContaining({
                        variant: expect.any(String),
                        title: expect.any(String),
                        message: expect.any(String)
                    })
                );
            });

            await waitFor(() => {
                expect(saveMenu).not.toHaveBeenCalled();
            });
        });

        it('should not update weeklyMenu if saveMenu returns null', async () => {
            saveMenu.mockResolvedValue(null);

            render(<MenuSemanalDialog {...props} />);

            fireEvent.click(screen.getByTestId('select-day-monday'));
            fireEvent.click(screen.getByTestId('select-food-lunch'));
            fireEvent.click(screen.getByTestId('btn-accept'));

            await waitFor(() => {
                expect(saveMenu).toHaveBeenCalled();
            });

            await waitFor(() => {
                expect(props.setWeeklyMenu).not.toHaveBeenCalled();
            });

            await waitFor(() => {
                expect(addEventToDataLayerV2).not.toHaveBeenCalled();
            });
        });

        it('should not update weeklyMenu if saveMenu returns object without bookmarkId', async () => {
            saveMenu.mockResolvedValue({ ok: true });

            render(<MenuSemanalDialog {...props} />);

            fireEvent.click(screen.getByTestId('select-day-monday'));
            fireEvent.click(screen.getByTestId('select-food-lunch'));
            fireEvent.click(screen.getByTestId('btn-accept'));

            await waitFor(() => {
                expect(saveMenu).toHaveBeenCalled();
            });

            await waitFor(() => {
                expect(props.setWeeklyMenu).not.toHaveBeenCalled();
            });
        });
    });

    describe('useRef fix - Closure bug prevention', () => {
        it('should use ref values even after state is reset by close', async () => {
            const mockResult = {
                bookmarkId: 'new-bookmark-123',
                bookmarkGroup: 'monday',
                bookmarkContent: {
                    id: 'article-123',
                    food: 'lunch'
                }
            };

            saveMenu.mockResolvedValue(mockResult);

            render(<MenuSemanalDialog {...props} />);

            // Select day and food
            fireEvent.click(screen.getByTestId('select-day-monday'));
            fireEvent.click(screen.getByTestId('select-food-lunch'));

            // Click accept - this should close dialog first, then save
            fireEvent.click(screen.getByTestId('btn-accept'));

            // Even though dialog closes (resetting state to null),
            // the save should use the ref values
            await waitFor(() => {
                expect(saveMenu).toHaveBeenCalledWith({
                    article: mockArticle,
                    selectedDay: 'monday',
                    selectedFood: 'lunch'
                });
            });
        });
    });

    describe('Non-subscriber flow', () => {
        it('should render empty state for non-subscribers', () => {
            const useGetUserConfig =
                require('../../../../../../../components/features/foodit-global/hooks/useGetUserConfig').default;
            useGetUserConfig.mockReturnValue({
                isSubscribed: false,
                userType: 'anonymous'
            });

            render(<MenuSemanalDialog {...props} />);

            expect(screen.getByTestId('empty-state')).toBeInTheDocument();
            expect(screen.queryByTestId('select-menu')).not.toBeInTheDocument();
            expect(screen.queryByTestId('footer-menu')).not.toBeInTheDocument();
        });
    });
});
