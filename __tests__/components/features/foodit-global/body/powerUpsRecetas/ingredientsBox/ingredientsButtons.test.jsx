import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IngredientsButtons } from '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/ingredientsButtons';
import { useDisclosure } from '@ln/hooks';
import useGetUserConfig from '../../../../../../../components/features/foodit-global/hooks/useGetUserConfig';
import { addEventToDataLayerV2 } from '../../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock('@ln/hooks', () => ({
    useDisclosure: jest.fn()
}));
jest.mock(
    '../../../../../../../components/features/foodit-global/hooks/useGetUserConfig',
    () => jest.fn()
);
jest.mock(
    '../../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('IngredientsButtons Component', () => {
    const defaultProps = {
        currentPortion: 2,
        portions: 2,
        setCurrentPortion: jest.fn(),
        showButtonsConversor: true,
        bookmarkId: null
    };

    beforeEach(() => {
        useGetUserConfig.mockReturnValue({
            isSubscribed: true,
            userType: 'logged'
        });

        useDisclosure.mockReturnValue({
            isOpen: false,
            onOpen: jest.fn(),
            onClose: jest.fn()
        });

        jest.clearAllMocks();
    });

    it('renders correctly with default props', () => {
        render(<IngredientsButtons {...defaultProps} />);

        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByTitle('sacar')).toBeInTheDocument();
        expect(screen.getByTitle('agregar')).toBeInTheDocument();
    });

    it('increment button increases portion count for subscribed users', () => {
        render(<IngredientsButtons {...defaultProps} />);

        const addButton = screen.getByTitle('agregar');
        fireEvent.click(addButton);

        expect(defaultProps.setCurrentPortion).toHaveBeenCalled();
    });

    it('decrement button is disabled when at initial portion', () => {
        render(<IngredientsButtons {...defaultProps} />);

        const subtractButton = screen.getByTitle('sacar');
        expect(subtractButton).toBeDisabled();
    });

    it('decrement button decreases portion count when above initial portion', () => {
        const props = {
            ...defaultProps,
            currentPortion: 3
        };

        render(<IngredientsButtons {...props} />);

        const subtractButton = screen.getByTitle('sacar');
        fireEvent.click(subtractButton);

        expect(props.setCurrentPortion).toHaveBeenCalled();
    });

    it('buttons are disabled when bookmarkId is provided', () => {
        const props = {
            ...defaultProps,
            bookmarkId: 'bookmark123'
        };

        render(<IngredientsButtons {...props} />);

        const addButton = screen.getByTitle('agregar');
        const subtractButton = screen.getByTitle('sacar');

        expect(addButton).toBeDisabled();
        expect(subtractButton).toBeDisabled();
    });

    it('buttons are not shown when showButtonsConversor is false', () => {
        const props = {
            ...defaultProps,
            showButtonsConversor: false
        };

        render(<IngredientsButtons {...props} />);

        expect(screen.queryByTitle('agregar')).not.toBeInTheDocument();
        expect(screen.queryByTitle('sacar')).not.toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('opens dialog when non-subscribed user clicks add button', () => {
        useGetUserConfig.mockReturnValue({
            isSubscribed: false,
            userType: 'unlogged'
        });

        const mockDisclosure = {
            isOpen: false,
            onOpen: jest.fn(),
            onClose: jest.fn()
        };

        useDisclosure.mockReturnValue(mockDisclosure);

        render(<IngredientsButtons {...defaultProps} />);

        const addButton = screen.getByTitle('agregar');
        fireEvent.click(addButton);

        expect(mockDisclosure.onOpen).toHaveBeenCalled();
        expect(defaultProps.setCurrentPortion).not.toHaveBeenCalled();
    });

    it('tracks portion change event only once when adding portions', () => {
        render(<IngredientsButtons {...defaultProps} />);

        const addButton = screen.getByTitle('agregar');

        fireEvent.click(addButton);
        fireEvent.click(addButton);
        fireEvent.click(addButton);

        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'e_linkclick',
            category: 'interaction',
            label: 'Receta',
            action: 'Cambio_porciones'
        });
    });

    it('tracks portion change event only once when both adding and subtracting portions', () => {
        const props = {
            ...defaultProps,
            currentPortion: 3
        };

        render(<IngredientsButtons {...props} />);

        const addButton = screen.getByTitle('agregar');
        const subtractButton = screen.getByTitle('sacar');

        fireEvent.click(addButton);
        fireEvent.click(subtractButton);
        fireEvent.click(addButton);

        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
    });

    it('does not track when non-subscribed user clicks buttons', () => {
        useGetUserConfig.mockReturnValue({
            isSubscribed: false,
            userType: 'unlogged'
        });

        render(<IngredientsButtons {...defaultProps} />);

        const addButton = screen.getByTitle('agregar');
        fireEvent.click(addButton);

        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
    });

    it('does not track when disabled buttons are clicked', () => {
        const props = {
            ...defaultProps,
            bookmarkId: 'bookmark123'
        };

        render(<IngredientsButtons {...props} />);

        const addButton = screen.getByTitle('agregar');
        fireEvent.click(addButton);

        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
    });

    it('tracks only once across component rerenders with changing props', () => {
        const { rerender } = render(<IngredientsButtons {...defaultProps} />);

        const addButton = screen.getByTitle('agregar');
        fireEvent.click(addButton);

        rerender(<IngredientsButtons {...defaultProps} currentPortion={3} />);

        const newAddButton = screen.getByTitle('agregar');
        fireEvent.click(newAddButton);

        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
    });
});
