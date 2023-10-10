import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import articlesTransformed from '../../../../../../__mocks__/data/FOODIT_Caja_Collection/articlesTransformed.json';
import Carousel from '../../../../../../components/chains/foodit-global/common/Carousel/foodit';

const observe = jest.fn();
const unobserve = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));

describe('Tests Carousel', () => {
    test('Render component with articles', () => {
        const { container } = render(
            <Carousel articles={articlesTransformed} />
        );
        const divElement = container.querySelector('div');

        expect(divElement).toHaveClass(
            'media-scroller relative flex flex-column gap-16'
        );
        expect(container).toMatchSnapshot();
    });
});
