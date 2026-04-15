import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { NewsletterActionButton } from '../../../../../../components/features/foodit-global/common/Newsletter/components/NewsletterActionButtons';

jest.mock(
    '../../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () => ({
        __esModule: true,
        default: props => <i data-testid="icon-sprite" {...props} />
    })
);

describe('NewsletterActionButton', () => {
    it('renders labelOff when selected is false', () => {
        render(
            <NewsletterActionButton
                selected={false}
                onClick={jest.fn()}
                labelOn="RECIBIENDO"
                labelOff="RECIBIR NEWSLETTER"
            />
        );

        expect(screen.getByText('RECIBIR NEWSLETTER')).toBeInTheDocument();
        expect(screen.queryByText('RECIBIENDO')).not.toBeInTheDocument();
    });

    it('renders labelOn when selected is true', () => {
        render(
            <NewsletterActionButton
                selected
                onClick={jest.fn()}
                labelOn="RECIBIENDO"
                labelOff="RECIBIR NEWSLETTER"
            />
        );

        expect(screen.getByText('RECIBIENDO')).toBeInTheDocument();
        expect(
            screen.queryByText('RECIBIR NEWSLETTER')
        ).not.toBeInTheDocument();
    });

    it('calls onClick when button is clicked', () => {
        const handleClick = jest.fn();
        render(
            <NewsletterActionButton
                selected={false}
                onClick={handleClick}
                labelOn="RECIBIENDO"
                labelOff="RECIBIR NEWSLETTER"
            />
        );

        fireEvent.click(screen.getByText('RECIBIR NEWSLETTER'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('shows "plus" icon when not selected', () => {
        render(
            <NewsletterActionButton
                selected={false}
                onClick={jest.fn()}
                labelOn="RECIBIENDO"
                labelOff="RECIBIR NEWSLETTER"
            />
        );

        const icon = screen.getByTestId('icon-sprite');
        expect(icon).toHaveAttribute('name', 'plus');
    });

    it('shows "check-box" icon when selected', () => {
        render(
            <NewsletterActionButton
                selected
                onClick={jest.fn()}
                labelOn="RECIBIENDO"
                labelOff="RECIBIR NEWSLETTER"
            />
        );

        const icon = screen.getByTestId('icon-sprite');
        expect(icon).toHaveAttribute('name', 'check-box');
    });
});
