import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAppContext } from 'fusion:context';
import useGetUserConfig from '../../../../../../../components/features/foodit-global/hooks/useGetUserConfig';
import SaveRecipe from '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/saveRecipe';
import useSelectListener from '../../../../../../../components/features/LN-common/hooks/useSelectListener';
import useInputListener from '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/hooks/useInputListener';
import MainSaveRecipe from '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/components/main';
import FooterSaveRecipe from '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/components/footer';

import {
    saveRecipeConfig,
    getConfig
} from '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/helpers';

const observe = jest.fn();
const unobserve = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));

jest.mock(
    '../../../../../../../components/features/foodit-global/hooks/useGetUserConfig',
    () => jest.fn()
);
jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));
jest.mock(
    '../../../../../../../components/features/LN-common/hooks/useSelectListener',
    () => jest.fn()
);
jest.mock(
    '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/hooks/useInputListener',
    () => jest.fn()
);
jest.mock(
    '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/components/main',
    () =>
        jest.fn(() => (
            <div data-testid="main-save-recipe">
                MainSaveRecipe Component
                <select data-testid="collection-select">
                    <option value="new">Crear colección</option>
                    <option value="Collection1">Collection1</option>
                    <option value="Collection2">Collection2</option>
                </select>
                <input
                    data-testid="folder-input"
                    placeholder="Colección"
                    value="New Folder Name"
                />
            </div>
        ))
);
jest.mock(
    '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/components/footer',
    () =>
        jest.fn(() => (
            <div data-testid="footer-save-recipe">
                FooterSaveRecipe Component
                <button data-testid="left-button" disabled>
                    Left Button
                </button>
                <button data-testid="right-button">Right Button</button>
                <span data-testid="has-error">false</span>
                <span data-testid="mode">save</span>
                <span data-testid="is-disabled">true</span>
                <span data-testid="is-loading">false</span>
            </div>
        ))
);

jest.mock(
    '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/components/header',
    () => jest.fn(({ title }) => <h2 data-testid="header-title">{title}</h2>)
);
jest.mock(
    '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/helpers',
    () => ({
        getConfig: jest.fn(),
        saveRecipeConfig: {}
    })
);

jest.mock('@ln/common-ui-dialog', () => {
    const Dialog = ({ isOpen, children, classnames }) => {
        if (!isOpen) return null;
        return (
            <div
                className={classnames?.base}
                data-testid="dialog"
                role="dialog"
            >
                <div
                    className={
                        classnames?.wrapper ||
                        'flex flex-column gap-16 gap-24_md gap-32_lg'
                    }
                >
                    {children}
                </div>
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
    Dialog.Footer = ({ children, className }) => (
        <div
            className={
                className || 'flex flex-column gap-16 gap-24_md gap-32_lg'
            }
            data-testid="dialog-footer"
        >
            {children}
        </div>
    );
    return { Dialog };
});

jest.mock('@ln/foodit-ui-button', () => ({
    Button: ({
        children,
        onClick,
        'aria-label': ariaLabel,
        title,
        variant
    }) => (
        <button
            onClick={onClick}
            aria-label={ariaLabel}
            title={title}
            variant={variant}
        >
            {children}
        </button>
    )
}));

jest.mock('@ln/common-ui-icon', () => ({
    Icon: ({ children }) => <span>{children}</span>
}));

jest.mock(
    '../../../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () =>
        ({ name }) => <span data-icon={name}>{name}</span>
);

jest.mock(
    '../../../../../../../components/features/foodit-global/common/emptyState/foodit',
    () =>
        ({ variant, direction }) => (
            <div data-direction={direction}>
                <div data-testid={`empty-state-${variant}`}>
                    <button>Suscribite</button>
                    {variant === 'barrier-unlogged' && (
                        <button>Iniciá sesión</button>
                    )}
                </div>
            </div>
        )
);

jest.mock(
    '../../../../../../../components/features/foodit-global/common/emptyState/helpers',
    () => ({
        getVariantBarrier: userType => `barrier-${userType}`
    })
);

jest.mock('@ln/cva', () => ({
    cx: (...args) => args.filter(Boolean).join(' ')
}));

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

describe('SaveRecipe Component', () => {
    const mockClose = jest.fn();
    const mockSetIndexStep = jest.fn();
    const mockInputRestoreValue = jest.fn();
    const mockSelectRestoreValue = jest.fn();
    const mockOnSelectChange = jest.fn();

    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        useAppContext.mockReturnValue({
            layout: 'Foodit-home',
            siteProperties: { layoutsName: {} }
        });

        useInputListener.mockReturnValue({
            onChange: jest.fn(),
            value: 'New Folder Name',
            error: null,
            restoreInputValue: mockInputRestoreValue,
            setValue: jest.fn()
        });

        useSelectListener.mockReturnValue({
            onSelectChange: mockOnSelectChange,
            selectValue: { value: '' },
            restoreInputValue: mockSelectRestoreValue
        });

        getConfig.mockReturnValue({
            leftButton: { text: 'Left Button', action: 'leftAction' },
            rightButton: { text: 'Right Button', action: 'rightAction' },
            showInputFolder: true,
            showSelect: true,
            title: 'Save Recipe Title'
        });

        useGetUserConfig.mockReturnValue({
            userType: 'subscribed',
            isSubscribed: true
        });
    });

    const defaultProps = {
        showModal: true,
        close: mockClose,
        ids: ['1', '2'],
        indexStep: 1,
        setIndexStep: mockSetIndexStep,
        collectionArticles: [{ id: '1' }, { id: '2' }],
        carouselTitle: 'Sample Carousel Title',
        fatherType: 'sampleFatherType'
    };

    it('passes correct props to MainSaveRecipe', () => {
        render(<SaveRecipe {...defaultProps} />);

        expect(MainSaveRecipe).toHaveBeenCalledWith(
            expect.objectContaining({
                newFolder: 'New Folder Name',
                onInputFolderChange: expect.any(Function),
                error: null,
                selectedFolder: { value: '' },
                onSelectChange: expect.any(Function),
                showInputFolder: true,
                showSelect: true,
                inputRef: expect.any(Object),
                restoreInputValue: expect.any(Function)
            }),
            undefined
        );
    });

    it('calls restoreSelectValue when dialog is closed', () => {
        render(<SaveRecipe {...defaultProps} />);

        const closeButton = screen.getByLabelText(/Cerrar/i);
        fireEvent.click(closeButton);

        expect(mockSelectRestoreValue).toHaveBeenCalled();
        expect(mockClose).toHaveBeenCalled();
    });

    it('restores input value when selecting "new" collection', () => {
        const mockOnSelectChange = jest.fn(({ value }) => {
            if (value === 'new') {
                mockInputRestoreValue();
            }
        });
        useSelectListener.mockReturnValue({
            onSelectChange: mockOnSelectChange,
            selectValue: { value: '' },
            restoreInputValue: mockSelectRestoreValue
        });

        render(<SaveRecipe {...defaultProps} />);

        const [mainSaveRecipeProps] = MainSaveRecipe.mock.calls[0];
        const onSelectChangeHandler = mainSaveRecipeProps.onSelectChange;

        onSelectChangeHandler({ value: 'new' });

        expect(mockInputRestoreValue).toHaveBeenCalled();
        expect(mockInputRestoreValue).toHaveBeenCalledTimes(1);
    });

    it('handles error state in input correctly', () => {
        useInputListener.mockReturnValue({
            onChange: jest.fn(),
            value: 'New Folder Name',
            error: { hasError: true, message: 'Error message' },
            restoreInputValue: mockInputRestoreValue,
            setValue: jest.fn()
        });

        render(<SaveRecipe {...defaultProps} />);

        expect(MainSaveRecipe).toHaveBeenCalledWith(
            expect.objectContaining({
                error: { hasError: true, message: 'Error message' }
            }),
            undefined
        );

        expect(FooterSaveRecipe).toHaveBeenCalledWith(
            expect.objectContaining({
                hasInputError: true
            }),
            undefined
        );
    });

    it('renders Header, Main, and Footer components', () => {
        render(<SaveRecipe {...defaultProps} />);

        expect(screen.getByTestId('header-title')).toHaveTextContent(
            'Save Recipe Title'
        );
        expect(
            screen.getByText('MainSaveRecipe Component')
        ).toBeInTheDocument();
        expect(
            screen.getByText('FooterSaveRecipe Component')
        ).toBeInTheDocument();
    });

    it('calls setIndexStep when selectValue is "new"', () => {
        useSelectListener.mockReturnValue({
            onSelectChange: jest.fn(),
            selectValue: { value: 'new' }
        });

        render(<SaveRecipe {...defaultProps} />);

        expect(mockSetIndexStep).toHaveBeenCalledWith(expect.any(Function));
    });

    it('renders the correct title based on getConfig', () => {
        render(<SaveRecipe {...defaultProps} />);

        expect(getConfig).toHaveBeenCalledWith(saveRecipeConfig, 1, 'save');
        expect(screen.getByTestId('header-title')).toHaveTextContent(
            'Save Recipe Title'
        );
    });

    it('passes correct props to FooterSaveRecipe', () => {
        render(<SaveRecipe {...defaultProps} />);

        expect(FooterSaveRecipe).toHaveBeenCalledWith(
            expect.objectContaining({
                close: expect.any(Function),
                indexStep: 1,
                leftButton: { text: 'Left Button', action: 'leftAction' },
                rightButton: { text: 'Right Button', action: 'rightAction' },
                hasInputError: false,
                ids: ['1', '2'],
                collectionArticles: [{ id: '1' }, { id: '2' }],
                carouselTitle: 'Sample Carousel Title',
                layout: 'Foodit-home',
                fatherType: 'sampleFatherType'
            }),
            undefined
        );
    });

    it('should render emptyState when userType is unlogged', () => {
        useGetUserConfig.mockReturnValue({
            userType: 'unlogged',
            isSubscribed: false
        });

        render(<SaveRecipe {...defaultProps} />);
        expect(screen.getByTestId('empty-state')).toBeInTheDocument();
        expect(
            screen.queryByTestId('main-save-recipe')
        ).not.toBeInTheDocument();
    });

    it('should render emptyState when userType is logged', () => {
        useGetUserConfig.mockReturnValue({
            userType: 'logged',
            isSubscribed: false
        });

        render(<SaveRecipe {...defaultProps} />);
        expect(screen.getByTestId('empty-state')).toBeInTheDocument();
        expect(
            screen.queryByTestId('main-save-recipe')
        ).not.toBeInTheDocument();
    });

    it('dialog should return null when showModal is false', () => {
        const { baseElement } = render(
            <SaveRecipe {...defaultProps} showModal={false} />
        );
        const dialog = baseElement.querySelector('[role="dialog"]');
        expect(dialog).toBeNull();
    });

    it('should match snapshot when userType is subscribed', () => {
        useGetUserConfig.mockReturnValueOnce({
            userType: 'subscribed',
            isSubscribed: true
        });

        const { baseElement } = render(<SaveRecipe {...defaultProps} />);
        expect(baseElement).toMatchSnapshot();
    });

    it('should match snapshot when userType is unlogged', () => {
        useGetUserConfig.mockReturnValueOnce({
            userType: 'unlogged',
            isSubscribed: false
        });

        const { baseElement } = render(<SaveRecipe {...defaultProps} />);
        expect(baseElement).toMatchSnapshot();
    });

    it('should match snapshot when userType is logged', () => {
        useGetUserConfig.mockReturnValueOnce({
            userType: 'logged',
            isSubscribed: false
        });

        const { baseElement } = render(<SaveRecipe {...defaultProps} />);
        expect(baseElement).toMatchSnapshot();
    });
});
