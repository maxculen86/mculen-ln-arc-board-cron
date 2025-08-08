import React from 'react';
import { render, screen } from '@testing-library/react';
import CommonCardFoodit from '../../../../../../components/features/foodit-global/common/CommonCardFoodit/foodit';
import '@testing-library/jest-dom';

describe('Components - Features - Foodit-global - common - CommonCardFoodit', () => {
    const article = {
        articleId: 'TDEG3VTIAFEW7BKS676OUVQAVE',
        customTitle: 'Prueba nota recetas nuevo (customTitle)',
        title: 'Prueba nota recetas nuevo',
        author: 'Por Carlos Pagni',
        href: '/rapidas-y-faciles/prueba-nota-recetas-nuevo-nid04092023/',
        time: 30,
        tag: 'rica',
        variant: 'recipe',
        size: 'small'
    };
    const {
        articleId,
        author,
        href,
        size,
        tag,
        time,
        title,
        customTitle,
        variant
    } = article;

    const mockResizedImages = [
        {
            minWidth: undefined,
            maxWidth: 767,
            srcSet: 'https://example.com/resized-image-1.jpg'
        }
    ];

    it('should render the card with the correct data', () => {
        const media = {
            mediaVariant: 'image',
            src: 'https://example.com/image-1.jpg',
            alt: 'Tortilla de patatas',
            sources: mockResizedImages,
            loading: 'lazy',
            fetchPriority: 'low'
        };

        const { container } = render(
            <CommonCardFoodit
                articleId={articleId}
                showTime={Boolean(time)}
                linksProps={{ href, title }}
                time={time}
                size={size}
                variant={variant}
                loading="lazy"
                fetchPriority="low"
                tag={tag}
                title={title}
                author={author}
                key={articleId}
                fill={false}
                {...media}
            />
        );
        expect(screen.getByText('rica')).toBeTruthy();
        expect(screen.getByText('Prueba nota recetas nuevo')).toBeTruthy();
        expect(screen.getByText('30 min')).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Guardar' })).toBeTruthy();
        expect(screen.getByRole('link')).toHaveAttribute('href', article.href);
        expect(container).toMatchSnapshot();
    });

    it('should render the card with customTitle if it exists', () => {
        const media = {
            mediaVariant: 'image',
            src: 'https://example.com/image-1.jpg',
            alt: 'Tortilla de patatas',
            sources: mockResizedImages,
            loading: 'lazy',
            fetchPriority: 'low'
        };

        render(
            <CommonCardFoodit
                articleId={articleId}
                showTime={Boolean(time)}
                linksProps={{ href, title }}
                time={time}
                size={size}
                variant={variant}
                loading="lazy"
                fetchPriority="low"
                tag={tag}
                title={title}
                customTitle={customTitle}
                author={author}
                key={articleId}
                fill={false}
                {...media}
            />
        );

        expect(screen.getByText(customTitle)).toBeInTheDocument();
        expect(screen.queryByText(title)).not.toBeInTheDocument();
    });

    it('should render the card with title if customTitle is not provided', () => {
        const media = {
            mediaVariant: 'image',
            src: 'https://example.com/image-1.jpg',
            alt: 'Tortilla de patatas',
            sources: mockResizedImages,
            loading: 'lazy',
            fetchPriority: 'low'
        };

        render(
            <CommonCardFoodit
                articleId={articleId}
                showTime={Boolean(time)}
                linksProps={{ href, title }}
                time={time}
                size={size}
                variant={variant}
                loading="lazy"
                fetchPriority="low"
                tag={tag}
                title={title}
                author={author}
                key={articleId}
                fill={false}
                {...media}
            />
        );

        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.queryByText(customTitle)).not.toBeInTheDocument();
    });

    it('should render the card with video icon', () => {
        const media = {
            mediaVariant: 'image',
            src: 'https://example.com/resized-image-1.jpg',
            alt: 'Tortilla de patatas',
            sources: mockResizedImages,
            loading: 'lazy',
            fetchPriority: 'low'
        };

        const { container } = render(
            <CommonCardFoodit
                articleId={articleId}
                showTime={Boolean(time)}
                time={time}
                linksProps={{ href, title }}
                size={size}
                variant={variant}
                loading="lazy"
                fetchPriority="low"
                tag={tag}
                title={title}
                author={author}
                key={articleId}
                fill={false}
                hasVideo
                {...media}
            />
        );

        expect(container).toMatchSnapshot();
    });

    it('should render the card without video icon (has videoBackground) ', () => {
        const media = {
            mediaVariant: 'video',
            poster: 'https://example.com/video-poster.jpg',
            type: 'video',
            src: 'https://example.com/video-file.mp4'
        };

        const { container } = render(
            <CommonCardFoodit
                articleId={articleId}
                showTime={Boolean(time)}
                time={time}
                linksProps={{ href, title }}
                size={size}
                variant={variant}
                tag={tag}
                title={title}
                author={author}
                key={articleId}
                fill={false}
                hasVideo
                {...media}
            />
        );

        expect(container).toMatchSnapshot();
    });

    it('should render label when it is less than or equal to 32 characters', () => {
        const shortLabel = 'Recetas deliciosas';
        render(
            <CommonCardFoodit
                articleId={articleId}
                showTime
                linksProps={{ href, title }}
                time={time}
                size={size}
                variant="day-recipe"
                tag={tag}
                title={title}
                author={author}
                label={shortLabel}
            />
        );

        expect(screen.getByText(shortLabel)).toBeInTheDocument();
    });

    it('should truncate label when variant is "day-recipe" and label exceeds 32 characters', () => {
        const longLabel =
            'Este es un label muy largo que debe truncarse al renderizar';
        const truncated = `${longLabel.slice(0, 32)}…`;
        render(
            <CommonCardFoodit
                articleId={articleId}
                showTime
                linksProps={{ href, title }}
                time={time}
                size={size}
                variant="day-recipe"
                tag={tag}
                title={title}
                author={author}
                label={longLabel}
            />
        );

        expect(screen.getByText(truncated)).toBeInTheDocument();
    });
    it('should NOT render label if label is an empty string', () => {
        const emptyLabel = '';
        render(
            <CommonCardFoodit
                articleId={articleId}
                showTime
                linksProps={{ href, title }}
                time={time}
                size={size}
                variant="day-recipe"
                tag={tag}
                title={title}
                author={author}
                label={emptyLabel}
            />
        );

        expect(screen.queryByTestId('card-label')).not.toBeInTheDocument();
    });

    it('should render "Receta del día" if label is undefined', () => {
        const label = 'Receta del día';
        render(
            <CommonCardFoodit
                articleId={articleId}
                showTime
                linksProps={{ href, title }}
                time={time}
                size={size}
                variant="day-recipe"
                tag={tag}
                title={title}
                author={author}
            />
        );
        expect(screen.getByText(label)).toBeInTheDocument();
    });
});
