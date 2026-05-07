import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Petametrics from '../../../../../components/private/common/scriptManager/petametrics';

describe('Private - Common - Petametrics', () => {
    describe('without the required props', () => {
        it('renders nothing when no props', () => {
            const { container } = render(<Petametrics />);
            expect(container.firstChild).toBeNull();
        });

        it('renders nothing when only location is provided', () => {
            const { container } = render(<Petametrics location="head" />);
            expect(container.firstChild).toBeNull();
        });

        it('renders nothing when only globalContent type is provided', () => {
            const { container } = render(
                <Petametrics globalContent={{ type: 'story' }} />
            );
            expect(container.firstChild).toBeNull();
        });
    });

    describe('with location="head" and globalContent.type="story"', () => {
        it('renders a preconnect link to the petametrics CDN', () => {
            render(
                <Petametrics
                    globalContent={{ type: 'story' }}
                    location="head"
                />
            );
            const link = document.querySelector(
                'link[href="https://cdn.petametrics.com"]'
            );
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('rel', 'preconnect');
        });
    });
});
