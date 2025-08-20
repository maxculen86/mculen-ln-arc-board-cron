import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CardButton } from '../../../../../../components/features/foodit-global/common/CommonCardFoodit/components/CardButton';

describe('CardButton', () => {
    const defaultProps = {
        fill: false,
        handleBookmarkClick: jest.fn(),
        container: 'grid',
        buttonProps: {
            'data-id': 'test-id',
            'data-modal': 'open-modal',
            'data-test-id': 'button-bookmark-test-id'
        }
    };

    it('should match snapshot container="grid"', () => {
        const { container } = render(
            <CardButton {...defaultProps} container="grid" />
        );
        expect(container).toMatchSnapshot();
    });

    it('should match snapshot container="link"', () => {
        const { container } = render(
            <CardButton {...defaultProps} container="link" />
        );
        expect(container).toMatchSnapshot();
    });
    it('should match snapshot container="related-content"', () => {
        const { container } = render(
            <CardButton {...defaultProps} container="related-content" />
        );
        expect(container).toMatchSnapshot();
    });

    it('should match snapshot container="opening-grid"', () => {
        const { container } = render(
            <CardButton {...defaultProps} container="opening-grid" />
        );
        expect(container).toMatchSnapshot();
    });
});
