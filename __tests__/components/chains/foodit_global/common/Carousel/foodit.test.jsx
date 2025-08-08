import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import articlesTransformed from '../../../../../../__mocks__/data/foodit_Caja_Collection/articlesTransformed';
import Carousel from '../../../../../../components/chains/foodit-global/common/Carousel/foodit';
import CommonCardFoodit from '../../../../../../components/features/foodit-global/common/CommonCardFoodit/foodit';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../../../components/private/LN/common/utils/mediaHelper';
import getImageAltText from '../../../../../../components/features/foodit-global/common/utils/getImageAltText';

const observe = jest.fn();
const unobserve = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));

describe('Tests Carousel', () => {
    test('Render component with articles', () => {
        const renderArticles = articlesTransformed.map(
            ({
                articleId,
                author,
                href,
                size,
                tag,
                time,
                title: titleArticle,
                variant,
                image = {},
                contentCode = '',
                hasVideo
            }) => {
                const { resized_urls: resizedUrlImage, url } = image;
                const { resizedUrl = '' } = getShortestImage(resizedUrlImage);

                return (
                    <CommonCardFoodit
                        fatherType="carousel"
                        articleId={articleId}
                        showTime={Boolean(time)}
                        time={time}
                        linksProps={{ href, title: titleArticle }}
                        size={size}
                        variant={variant}
                        src={resizedUrl || url}
                        alt={getImageAltText(image)}
                        sources={getImagesToLoadWithPicture(resizedUrlImage)}
                        loading="lazy"
                        fetchPriority="low"
                        tag={tag}
                        title={titleArticle}
                        author={author}
                        key={articleId}
                        contentCode={contentCode}
                        hasVideo={hasVideo}
                        titleEllipsis={2}
                    />
                );
            }
        );
        const { container } = render(
            <Carousel type="collection">{renderArticles}</Carousel>
        );
        const divElement = container.querySelector('div');

        expect(divElement).toHaveClass(
            'media-scroller relative flex flex-column gap-16'
        );
        expect(container).toMatchSnapshot();
    });

    it.each([
        ['nutricional', '--info-nutricional'],
        ['category', '--carousel-category'],
        ['collection', 'hide-mobile'],
        ['collection_4', 'hide-mobile']
    ])('applies correct class for type %s', (type, expectedClass) => {
        const { container } = render(
            <Carousel type={type}>
                <div>Item</div>
            </Carousel>
        );
        const scrollerDiv = container.querySelector('.media-scroller');
        expect(scrollerDiv).toHaveClass(expectedClass);
    });
});
