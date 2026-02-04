import React from 'react';
import { render } from '@testing-library/react';
import Syndication from '../../../../components/private/common/syndication';

describe('Components - private - common - Syndication', () => {
    describe('early returns', () => {
        it('returns null when arcSite is set, not "la-nacion-ar", and subtype is falsy', () => {
            const { container } = render(
                <Syndication
                    arcSite="other-site"
                    subtype=""
                    outputType="default"
                    type="story"
                />
            );
            expect(container.firstChild).toBeNull();
        });

        it('returns null when outputType is not "default"', () => {
            const { container } = render(
                <Syndication
                    arcSite="la-nacion-ar"
                    outputType="amp"
                    type="story"
                />
            );
            expect(container.firstChild).toBeNull();
        });

        it('returns null when type is not "story" and nodeType is not "home" or "acumulado"', () => {
            const { container } = render(
                <Syndication
                    arcSite="la-nacion-ar"
                    outputType="default"
                    type="video"
                    nodeType="section"
                />
            );
            expect(container.firstChild).toBeNull();
        });
    });

    describe('home and acumulado nodeTypes', () => {
        it('returns meta with max-image-preview:standard for nodeType "home"', () => {
            const { container } = render(
                <Syndication
                    arcSite="la-nacion-ar"
                    outputType="default"
                    nodeType="home"
                    type="other"
                />
            );
            const meta = container.querySelector('meta[name="robots"]');
            expect(meta).toBeInTheDocument();
            expect(meta).toHaveAttribute(
                'content',
                'max-image-preview:standard'
            );
        });

        it('returns meta with max-image-preview:standard for nodeType "acumulado"', () => {
            const { container } = render(
                <Syndication
                    arcSite="la-nacion-ar"
                    outputType="default"
                    nodeType="acumulado"
                    type="other"
                />
            );
            const meta = container.querySelector('meta[name="robots"]');
            expect(meta).toBeInTheDocument();
            expect(meta).toHaveAttribute(
                'content',
                'max-image-preview:standard'
            );
        });
    });

    describe('story type with syndication', () => {
        it('returns noindex meta when subtype is not "7", syndication exists, and search is falsy', () => {
            const { container } = render(
                <Syndication
                    arcSite="la-nacion-ar"
                    outputType="default"
                    type="story"
                    subtype="1"
                    syndication={{ search: false }}
                />
            );
            const meta = container.querySelector('meta[name="robots"]');
            expect(meta).toBeInTheDocument();
            expect(meta).toHaveAttribute(
                'content',
                'noindex, follow, max-image-preview:large'
            );
        });

        it('returns max-image-preview:large meta when subtype is "7"', () => {
            const { container } = render(
                <Syndication
                    arcSite="la-nacion-ar"
                    outputType="default"
                    type="story"
                    subtype="7"
                    syndication={{ search: false }}
                />
            );
            const meta = container.querySelector('meta[name="robots"]');
            expect(meta).toBeInTheDocument();
            expect(meta).toHaveAttribute('content', 'max-image-preview:large');
        });

        it('returns max-image-preview:large meta when search is truthy', () => {
            const { container } = render(
                <Syndication
                    arcSite="la-nacion-ar"
                    outputType="default"
                    type="story"
                    subtype="1"
                    syndication={{ search: true }}
                />
            );
            const meta = container.querySelector('meta[name="robots"]');
            expect(meta).toBeInTheDocument();
            expect(meta).toHaveAttribute('content', 'max-image-preview:large');
        });

        it('returns max-image-preview:large meta when syndication is undefined', () => {
            const { container } = render(
                <Syndication
                    arcSite="la-nacion-ar"
                    outputType="default"
                    type="story"
                    subtype="1"
                    syndication={undefined}
                />
            );
            const meta = container.querySelector('meta[name="robots"]');
            expect(meta).toBeInTheDocument();
            expect(meta).toHaveAttribute('content', 'max-image-preview:large');
        });
    });

    describe('arcSite edge cases', () => {
        it('renders when arcSite is "la-nacion-ar" regardless of subtype', () => {
            const { container } = render(
                <Syndication
                    arcSite="la-nacion-ar"
                    subtype=""
                    outputType="default"
                    type="story"
                    syndication={{ search: true }}
                />
            );
            const meta = container.querySelector('meta[name="robots"]');
            expect(meta).toBeInTheDocument();
        });

        it('renders when subtype is provided even if arcSite is different', () => {
            const { container } = render(
                <Syndication
                    arcSite="other-site"
                    subtype="1"
                    outputType="default"
                    type="story"
                    syndication={{ search: true }}
                />
            );
            const meta = container.querySelector('meta[name="robots"]');
            expect(meta).toBeInTheDocument();
        });

        it('renders when arcSite is falsy', () => {
            const { container } = render(
                <Syndication
                    arcSite=""
                    subtype=""
                    outputType="default"
                    type="story"
                    syndication={{ search: true }}
                />
            );
            const meta = container.querySelector('meta[name="robots"]');
            expect(meta).toBeInTheDocument();
        });
    });
});
