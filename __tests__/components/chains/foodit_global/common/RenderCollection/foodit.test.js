import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import articlesTransformed from '../../../../../../__mocks__/data/FOODIT_Caja_Collection/articlesTransformed.json';
import RenderCollection from '../../../../../../components/chains/foodit-global/common/RenderCollection/foodit';

const observe = jest.fn();
const unobserve = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));

describe('RenderCollection', () => {
    const articles = articlesTransformed;
    test('should render Carousel layout with title and link', () => {
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
                articles={articles}
            />
        );

        const titleElement = screen.getByRole('heading', {
            name: 'carousel title'
        });
        const articleElements = screen.getAllByRole('article');
        const hiddenDiv = container.querySelector('.hidden');
        expect(hiddenDiv).not.toBeInTheDocument();
        expect(titleElement).toBeInTheDocument();
        expect(articleElements).toHaveLength(12);
        expect(container).toMatchSnapshot();
    });

    test('should render BN_12_GRID layout with articles', () => {
        const { container } = render(
            <RenderCollection
                rules={{
                    roofAs: 'h2',
                    classNameParent:
                        'grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32',
                    classNameChildren: 'col-span-8 col-span-4_md'
                }}
                title="Grid Title"
                link=""
                hideCaja={false}
                hideTitle={false}
                layout="bn_12_grid"
                error={null}
                articles={articles}
            />
        );

        const articleElements = screen.getAllByRole('article');
        const hiddenDiv = container.querySelector('.hidden');
        expect(hiddenDiv).toBeInTheDocument();
        expect(articleElements).toHaveLength(12);

        expect(container).toMatchSnapshot();
    });

    test('should render nothing when hideCaja is true', () => {
        const { container } = render(
            <RenderCollection
                rules={{
                    roofAs: 'h2',
                    classNameParent:
                        'grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32',
                    classNameChildren: 'col-span-8 col-span-4_md'
                }}
                title="Grid Title"
                link=""
                hideCaja={true}
                hideTitle={false}
                layout="bn_12_grid"
                error={null}
                articles={[]}
            />
        );

        const articleElements = screen.queryAllByRole('article');

        expect(articleElements).toHaveLength(0);

        expect(container).toMatchSnapshot();
    });
});
