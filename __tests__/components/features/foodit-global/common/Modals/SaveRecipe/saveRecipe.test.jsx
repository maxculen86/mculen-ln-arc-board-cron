import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAppContext } from 'fusion:context';
import useGetUserConfig from '../../../../../../../components/features/foodit-global/hooks/useGetUserConfig';
import SaveRecipe from '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/saveRecipe';
import useSelectListener from '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/hooks/useSelectListener';
import useInputListener from '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/hooks/useInputListener';
import FooterSaveRecipe from '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/components/footer';
import {
    saveRecipeConfig,
    getConfig
} from '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/helpers';

jest.mock(
    '../../../../../../../components/features/foodit-global/hooks/useGetUserConfig',
    () => jest.fn()
);
jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));
jest.mock(
    '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/hooks/useSelectListener',
    () => jest.fn()
);
jest.mock(
    '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/hooks/useInputListener',
    () => jest.fn()
);
jest.mock(
    '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/components/main',
    () => jest.fn(() => <div>MainSaveRecipe Component</div>)
);
jest.mock(
    '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/components/footer',
    () => jest.fn(() => <div>FooterSaveRecipe Component</div>)
);
jest.mock(
    '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/helpers',
    () => ({
        getConfig: jest.fn(),
        saveRecipeConfig: {}
    })
);

describe('SaveRecipe Component', () => {
    const mockClose = jest.fn();
    const mockSetIndexStep = jest.fn();
    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        useAppContext.mockReturnValue({ layout: 'Foodit-home' });

        useInputListener.mockReturnValue({
            onChange: jest.fn(),
            value: 'New Folder Name',
            error: null
        });

        useSelectListener.mockReturnValue({
            onSelectChange: jest.fn(),
            selectValue: { value: '' }
        });

        getConfig.mockReturnValue({
            leftButton: { text: 'Left Button', action: 'leftAction' },
            rightButton: { text: 'Right Button', action: 'rightAction' },
            showInputFolder: true,
            showSelect: true,
            title: 'Save Recipe Title'
        });
    });

    useGetUserConfig.mockReturnValue({ userType: 'subscribed' });
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
    it('renders Header, Main, and Footer components', () => {
        render(<SaveRecipe {...defaultProps} />);

        expect(screen.getByText('Save Recipe Title')).toBeInTheDocument();
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

        expect(getConfig).toHaveBeenCalledWith(saveRecipeConfig, 1);
        expect(screen.getByText('Save Recipe Title')).toBeInTheDocument();
    });

    it('passes correct props to FooterSaveRecipe', () => {
        render(<SaveRecipe {...defaultProps} />);

        expect(FooterSaveRecipe).toHaveBeenCalledWith(
            expect.objectContaining({
                close: mockClose,
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
            {}
        );
    });
    it('should render emptyState when userType is unlogged', () => {
        useGetUserConfig.mockReturnValue({ userType: 'unlogged' });

        render(<SaveRecipe {...defaultProps} />);
        const buttonSubscribe = screen.getByText('Suscribite');
        const buttonLogin = screen.getByText('Iniciá sesión');
        expect(buttonSubscribe).toBeInTheDocument();
        expect(buttonLogin).toBeInTheDocument();
    });
    it('should render emptyState when userType is logged', () => {
        useGetUserConfig.mockReturnValue({ userType: 'logged' });

        render(<SaveRecipe {...defaultProps} />);
        const buttonSubscribe = screen.getByText('Suscribite');
        expect(buttonSubscribe).toBeInTheDocument();
    });
    it('dialog should return null when showModal is false', () => {
        const { baseElement } = render(
            <SaveRecipe {...defaultProps} showModal={false} />
        );
        const dialog = baseElement.querySelector('dialog');
        expect(dialog).toBeNull();
    });
    it('should match snapshot when userType is subscribed', () => {
        useGetUserConfig.mockReturnValueOnce({ userType: 'subscribed' });

        const { baseElement, debug } = render(<SaveRecipe {...defaultProps} />);
        debug();
        expect(baseElement).toMatchSnapshot();
    });
    it('should match snapshot when userType is unlogged', () => {
        useGetUserConfig.mockReturnValueOnce({ userType: 'unlogged' });

        const { baseElement } = render(<SaveRecipe {...defaultProps} />);

        expect(baseElement).toMatchSnapshot();
    });
    it('should match snapshot when userType is logged', () => {
        useGetUserConfig.mockReturnValueOnce({ userType: 'logged' });

        const { baseElement } = render(<SaveRecipe {...defaultProps} />);

        expect(baseElement).toMatchSnapshot();
    });
});
