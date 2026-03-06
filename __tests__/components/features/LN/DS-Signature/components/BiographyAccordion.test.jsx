import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BiographyAccordion from '../../../../../../components/features/LN/DS-Signature/components/BiographyAccordion';

jest.mock('../../../../../../components/features/ui/ln/icon/default', () =>
    jest.fn(() => <span data-testid="accordion-icon" />)
);

const mockHandleToggle = jest.fn();
jest.mock(
    '../../../../../../components/features/LN/DS-Signature/components/useAccordionToggle',
    () =>
        jest.fn(() => ({
            isOpen: false,
            wrapperRef: { current: null },
            pRef: { current: null },
            handleToggle: mockHandleToggle
        }))
);

const useAccordionToggle = require('../../../../../../components/features/LN/DS-Signature/components/useAccordionToggle');

const SHORT_TEXT = 'Texto corto';
const LONG_TEXT = 'A'.repeat(201);
const BIO_MAX_LENGTH = 200;

describe('components - features - LN - DS-Signature - BiographyAccordion', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn()
            }))
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
        useAccordionToggle.mockReturnValue({
            isOpen: false,
            wrapperRef: { current: null },
            pRef: { current: null },
            handleToggle: mockHandleToggle
        });
    });

    it('returns null when text is falsy', () => {
        const { container } = render(
            <BiographyAccordion text={null} shouldShowBiography />
        );
        expect(container.firstChild).toBeNull();
    });

    it('returns null when shouldShowBiography is false', () => {
        const { container } = render(
            <BiographyAccordion text={LONG_TEXT} shouldShowBiography={false} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('renders plain paragraph when text is shorter than maxLength', () => {
        render(<BiographyAccordion text={SHORT_TEXT} shouldShowBiography />);
        expect(screen.getByText(SHORT_TEXT)).toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders accordion with toggle button when text exceeds maxLength', () => {
        render(<BiographyAccordion text={LONG_TEXT} shouldShowBiography />);
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByText('Mostrar más biografía')).toBeInTheDocument();
    });

    it('shows truncated text when closed', () => {
        render(<BiographyAccordion text={LONG_TEXT} shouldShowBiography />);
        expect(screen.queryByText(LONG_TEXT)).not.toBeInTheDocument();
        expect(screen.getByText(/\.\.\./)).toBeInTheDocument();
    });

    it('shows full text when isOpen is true', () => {
        useAccordionToggle.mockReturnValue({
            isOpen: true,
            wrapperRef: { current: null },
            pRef: { current: null },
            handleToggle: mockHandleToggle
        });
        render(<BiographyAccordion text={LONG_TEXT} shouldShowBiography />);
        expect(screen.getByText(LONG_TEXT)).toBeInTheDocument();
        expect(screen.getByText('Ocultar biografía')).toBeInTheDocument();
    });

    it('calls handleToggle when button is clicked', () => {
        render(<BiographyAccordion text={LONG_TEXT} shouldShowBiography />);
        fireEvent.click(screen.getByRole('button'));
        expect(mockHandleToggle).toHaveBeenCalledTimes(1);
    });

    it('respects custom maxLength prop', () => {
        const text = 'A'.repeat(51);
        render(
            <BiographyAccordion
                text={text}
                shouldShowBiography
                maxLength={50}
            />
        );
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders plain paragraph when text equals maxLength', () => {
        const text = 'A'.repeat(BIO_MAX_LENGTH);
        render(<BiographyAccordion text={text} shouldShowBiography />);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
});
