import React from 'react';
import { render, screen } from '@testing-library/react';
import CommonCardFoodit from '../../../../../../components/features/foodit-global/common/CommonCardFoodit/foodit';
import '@testing-library/jest-dom';
import { getImagesToLoadWithPicture } from '../../../../../../components/private/LN/common/utils/mediaHelper';

describe('CommonCardFoodit', () => {
    const article = {
        articleId: 'TDEG3VTIAFEW7BKS676OUVQAVE',
        title: 'Prueba nota recetas nuevo',
        author: 'Por Carlos Pagni',
        image: {
            height: 900,
            alt_text: 'Tortilla de patatas',
            resized_urls: [
                {
                    option: {
                        height: 280,
                        maxScreenWidth: 767,
                        media_preload: '(max-width: 767px)',
                        proportion: '3:2',
                        width: 420
                    },
                    resizedUrl:
                        'https://sandbox.lanacion.com.ar/resizer/v2/algo-bien-7MLRVAHIWNGBVIO4HLLU3GRVUQ.jpg?auth=df16a0c399ffbc23925cb0b8a210dc3e0851b79aafa339076a956a01025a710a&width=420&height=280&quality=70&smart=true'
                },
                {
                    option: {
                        height: 159,
                        media_preload: '(min-width: 768px)',
                        proportion: '3:2',
                        width: 238
                    },
                    resizedUrl:
                        'https://sandbox.lanacion.com.ar/resizer/v2/algo-bien-7MLRVAHIWNGBVIO4HLLU3GRVUQ.jpg?auth=df16a0c399ffbc23925cb0b8a210dc3e0851b79aafa339076a956a01025a710a&width=238&height=158&quality=70&smart=true'
                }
            ],
            url:
                'https://sandbox.lanacion.com.ar/resizer/v2/algo-bien-7MLRVAHIWNGBVIO4HLLU3GRVUQ.jpg?auth=df16a0c399ffbc23925cb0b8a210dc3e0851b79aafa339076a956a01025a710a&width=768&height=432&quality=70&smart=true',
            width: 1600
        },
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
        variant,
        image = {}
    } = article;
    const { alt_text, resized_urls, url } = article.image;

    it('should render the card with the correct data', () => {
        const { container, debug } = render(
            <CommonCardFoodit
                articleId={articleId}
                showTime={Boolean(time)}
                time={time}
                linksProps={{ href, title }}
                size={size}
                variant={variant}
                src={url}
                alt={alt_text}
                sources={getImagesToLoadWithPicture(resized_urls)}
                loading={'lazy'}
                fetchPriority={'low'}
                tag={tag}
                title={title}
                author={author}
                key={articleId}
                fill={false} // TODO: boolean receta guardada
            />
        );
        debug();
        expect(screen.getByText('rica')).toBeTruthy();
        expect(screen.getByAltText('Tortilla de patatas')).toBeTruthy();
        expect(screen.getByText('30 min')).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Guardar' })).toBeTruthy();
        expect(screen.getByRole('link')).toHaveAttribute('href', article.href);
        expect(container).toMatchSnapshot();
    });
});
