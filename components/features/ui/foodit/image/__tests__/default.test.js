import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Image from '../default';

jest.mock('@ln/ds-common-image', () => ({
    Image: jest.fn(({ classnames, sources, style, ...props }) => (
        <div
            data-testid="common-image"
            data-classnames={JSON.stringify(classnames)}
            {...props}
        />
    ))
}));

jest.mock('@ln/ds-cva', () => ({
    cx: (...args) =>
        args
            .flatMap(a =>
                typeof a === 'object' && a !== null
                    ? Object.keys(a).filter(k => a[k])
                    : [a]
            )
            .filter(Boolean)
            .join(' ')
}));

describe('Image facade (foodit)', () => {
    it('renders CommonImage by default', () => {
        render(<Image src="/test.jpg" alt="test" />);
        expect(screen.getByTestId('common-image')).toBeInTheDocument();
    });

    it('passes src and alt to CommonImage', () => {
        render(<Image src="/test.jpg" alt="alt text" />);
        const el = screen.getByTestId('common-image');
        expect(el).toHaveAttribute('src', '/test.jpg');
        expect(el).toHaveAttribute('alt', 'alt text');
    });

    it('applies h-full w-full to wrapper classnames', () => {
        render(<Image src="/test.jpg" alt="test" />);
        const classnames = JSON.parse(
            screen.getByTestId('common-image').getAttribute('data-classnames')
        );
        expect(classnames.wrapper).toContain('h-full');
        expect(classnames.wrapper).toContain('w-full');
    });

    it('applies foodit-placeholder SVG background to placeholder classnames', () => {
        render(<Image src="/test.jpg" alt="test" />);
        const classnames = JSON.parse(
            screen.getByTestId('common-image').getAttribute('data-classnames')
        );
        expect(classnames.placeholder).toContain('foodit-placeholder.svg');
    });

    it('merges custom classnames.wrapper', () => {
        render(
            <Image
                src="/test.jpg"
                alt="test"
                classnames={{ wrapper: 'custom-wrapper' }}
            />
        );
        const classnames = JSON.parse(
            screen.getByTestId('common-image').getAttribute('data-classnames')
        );
        expect(classnames.wrapper).toContain('custom-wrapper');
        expect(classnames.wrapper).toContain('h-full');
    });

    it('merges custom classnames.placeholder', () => {
        render(
            <Image
                src="/test.jpg"
                alt="test"
                classnames={{ placeholder: 'extra-placeholder' }}
            />
        );
        const classnames = JSON.parse(
            screen.getByTestId('common-image').getAttribute('data-classnames')
        );
        expect(classnames.placeholder).toContain('extra-placeholder');
    });

    it('renders a plain img when renderImgOnly is true', () => {
        render(<Image src="/test.jpg" alt="img only" renderImgOnly />);
        const img = screen.getByRole('img');
        expect(img.tagName).toBe('IMG');
        expect(img).toHaveAttribute('src', '/test.jpg');
        expect(img).toHaveAttribute('alt', 'img only');
    });

    it('applies className to image classnames', () => {
        render(<Image src="/test.jpg" alt="test" className="extra-class" />);
        const classnames = JSON.parse(
            screen.getByTestId('common-image').getAttribute('data-classnames')
        );
        expect(classnames.image).toContain('extra-class');
    });
});
