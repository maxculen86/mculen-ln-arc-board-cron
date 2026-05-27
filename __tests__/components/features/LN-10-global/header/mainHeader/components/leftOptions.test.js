import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { LeftOptions } from '../../../../../../../components/features/LN-10-global/header/mainHeader/components/leftOptions';
import { useHeaderContext } from '../../../../../../../components/features/LN-10-global/header/context';
import { sectionsCallback } from '../../../../../../../components/features/LN-10-global/header/mainHeader/_helper';

jest.mock(
    '../../../../../../../components/features/LN-10-global/header/context',
    () => {
        return {
            useHeaderContext: jest.fn()
        };
    }
);

jest.mock(
    '../../../../../../../components/features/LN-10-global/header/mainHeader/_helper',
    () => {
        return {
            sectionsCallback: jest.fn()
        };
    }
);

describe('components - features - LN-10-global - header - mainHeader - leftOptions', () => {
    useHeaderContext.mockImplementation(() => ({
        toggleDesplegable: jest.fn()
    }));
    it('should render successfully', () => {
        const { baseElement } = render(<LeftOptions />);
        expect(baseElement).toBeInTheDocument();
    });
    it('should execute a sectionsCallback when the Sections Button is clicked', () => {
        const { getByRole } = render(<LeftOptions />);
        const button = getByRole('button', { name: 'SECCIONES' });
        fireEvent.click(button);
        expect(sectionsCallback).toHaveBeenCalledTimes(1);
    });
});
