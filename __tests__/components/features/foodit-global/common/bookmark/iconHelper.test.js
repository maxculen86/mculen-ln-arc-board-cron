import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RenderCollection from '../../../../../../components/chains/foodit-global/common/RenderCollection/foodit';
import {
    fillBookmarks,
    unfillBookmarks
} from '../../../../../../components/features/foodit-global/common/bookmark/iconHelper';

import articlesTransformed from '../../../../../../__mocks__/data/foodit_Caja_Collection/articlesTransformed';

const observe = jest.fn();
const unobserve = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));

describe('Bookmark functionality tests', () => {
    it('should fill and unfill all bookmarks for given IDs', () => {
        const { container } = render(
            <RenderCollection
                rules={{
                    roofAs: 'h2'
                }}
                title="carousel title"
                link="https://lanacion.com"
                hideCaja={false}
                hideTitle={false}
                layout="carousel"
                error={null}
                collectionId="IDCOLLECTIONABC"
                articles={articlesTransformed}
            />
        );
        const articleIds = [
            'AAABBBCCC111',
            'AAABBBCCC222',
            'AAABBBCCC333',
            'AAABBBCCC444',
            'AAABBBCCC555',
            'AAABBBCCC666',
            'AAABBBCCC777',
            'AAABBBCCC888',
            'AAABBBCCC999',
            'AAABBBCCC000',
            'AAABBBCCD111'
        ];
        fillBookmarks(articleIds);

        const elements = Array.from(document.querySelectorAll('svg'));

        articleIds.forEach(bookmarkTypeId => {
            const articleIdElements = elements.flatMap(el =>
                Array.from(
                    el.querySelectorAll(`[data-id="${bookmarkTypeId}"] use`)
                )
            );

            const svg = articleIdElements.map(el => el.closest('svg'));

            svg.forEach(svgElement => {
                const icon = svgElement.querySelector('use');
                expect(icon).toBeDefined();

                const href = icon.getAttribute('href');
                expect(href).toMatch('bookmark-filled');
            });
        });

        const carouselElements = elements.flatMap(el =>
            Array.from(
                el.querySelectorAll(`[data-collectionid="IDCOLLECTIONABC"] use`)
            )
        );

        const svgCarousel = carouselElements.map(el => el.closest('svg'));

        svgCarousel.forEach(svgElement => {
            const icon = svgElement.querySelector('use');
            expect(icon).toBeDefined();

            const href = icon.getAttribute('href');
            expect(href).toMatch('bookmark-filled');
        });

        // Finally, i unfill al the bookmarks
        unfillBookmarks(articleIds);

        articleIds.forEach(bookmarkTypeId => {
            const articleIdElements = elements.flatMap(el =>
                Array.from(
                    el.querySelectorAll(`[data-id="${bookmarkTypeId}"] use`)
                )
            );

            const svg = articleIdElements.map(el => el.closest('svg'));

            svg.forEach(svgElement => {
                const icon = svgElement.querySelector('use');
                expect(icon).toBeDefined();

                const href = icon.getAttribute('href');
                expect(href).not.toMatch('bookmark-filled');
            });
        });
    });
});
