import React from 'react';
import { render } from '@testing-library/react';
import ConditionalWrapper from '../../../../../components/private/LN/common/conditionalWrapper';

describe('Components - private - LN - common - ConditionalWrapper', () => {
    it('renders children inside a div when the condition is true', () => {
        const { container } = render(
            <ConditionalWrapper
                condition={true}
                wrapperProps={{ className: 'test-div' }}
            >
                <p>Test content</p>
            </ConditionalWrapper>
        );

        const wrapperDiv = container.querySelector('div.test-div');
        expect(wrapperDiv).toBeInTheDocument();
        expect(wrapperDiv).toContainHTML('<p>Test content</p>');
    });

    it('renders children without a wrapper when the condition is false', () => {
        const { container } = render(
            <ConditionalWrapper condition={false}>
                <p>Content without wrapper</p>
            </ConditionalWrapper>
        );

        const wrapperDiv = container.querySelector('div');
        expect(wrapperDiv).not.toBeInTheDocument();
        expect(container).toContainHTML('<p>Content without wrapper</p>');
    });

    it('applies wrapperProps correctly when the condition is true', () => {
        const { container } = render(
            <ConditionalWrapper
                condition={true}
                wrapperProps={{ id: 'custom-id', className: 'custom-class' }}
            >
                <span>Custom content</span>
            </ConditionalWrapper>
        );

        const wrapperDiv = container.querySelector(
            'div#custom-id.custom-class'
        );
        expect(wrapperDiv).toBeInTheDocument();
        expect(wrapperDiv).toHaveTextContent('Custom content');
    });

    it('does not apply wrapperProps when the condition is false', () => {
        const { container } = render(
            <ConditionalWrapper
                condition={false}
                wrapperProps={{ className: 'should-not-apply' }}
            >
                <span>Content without props</span>
            </ConditionalWrapper>
        );

        const wrapperDiv = container.querySelector('.should-not-apply');
        expect(wrapperDiv).not.toBeInTheDocument();
        expect(container).toContainHTML('<span>Content without props</span>');
    });
});
