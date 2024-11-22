import React from 'react';
import { render, screen } from '@testing-library/react';
import Dialog from '../../../../../../components/features/LN-10-global/glossary/components/dialog';
import { useDialog } from '../../../../../../components/features/LN-10-global/glossary/hooks/useDialog';
import arrayData from '../../../../../../__mocks__/data/glossary/arrayWords.json';
import capitalizeFirstLetter from '../../../../../../components/private/common/utils/capitalizeFirstLetter';

jest.mock(
    '../../../../../../components/features/LN-10-global/glossary/hooks/useDialog',
    () => ({
        useDialog: jest.fn()
    })
);

describe('features - LN-10-GLOBAL - glossary - components- Dialog', () => {
    let baseElement;
    useDialog.mockReturnValue({
        key: arrayData[0].key,
        value: arrayData[0].value,
        isOpen: true,
        onClose: jest.fn()
    });

    beforeEach(() => {
        HTMLDialogElement.prototype.show = jest.fn();
        HTMLDialogElement.prototype.showModal = jest.fn();
        ({ baseElement } = render(<Dialog glossaryData={arrayData} />));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const capitalizeKeyMock = capitalizeFirstLetter(arrayData[0].key);
    it('should render key and value correctly', () => {
        expect(screen.getByText(capitalizeKeyMock)).toBeInTheDocument();
        expect(screen.getByText(arrayData[0].value)).toBeInTheDocument();
    });

    it('should render attributes correctly', () => {
        const id = 'drawer-glossary';
        const dialog = document.getElementById('drawer-glossary');
        expect(dialog).toHaveAttribute('id', id);
        expect(dialog).toHaveAttribute('data-position', 'bottom');
        expect(dialog).toHaveAttribute(
            'aria-describedby',
            `glossary-dialog-description`
        );
        expect(dialog).toHaveAttribute(
            'aria-labelledby',
            `glossary-dialog-label`
        );
    });

    it('should match snapshot', () => {
        expect(baseElement).toMatchSnapshot();
    });
});
