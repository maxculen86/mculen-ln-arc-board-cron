/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import { createResizer } from '../../common/utils/image/resizer';
import SnippetRender from '../../common/snippet/snippetRender';

const snippet = props => {
    const {
        globalContent: {
            headlines,
            subheadlines,
            promo_items,
            credits: { by },
            display_date,
            content_elements
        }
    } = props;

    const autores = by
        ? by
              .filter(v => v.type === 'author')
              .map(v => v.name)
              .join(', ')
        : [];
    const date = display_date;
    const description = subheadlines.basic;
    let image;
    let counterTime;
    let counterPortion;
    let ingredientes;
    let preparaciones;
    let resizedUrl;

    if (promo_items) {
        if (!!promo_items.basic && promo_items.basic.type === 'image') {
            image = promo_items.basic.url;
            const resizer = createResizer(RESIZER_KEY, RESIZER_URL);
            resizedUrl = resizer.resizeUrl(
                image,
                promo_items.basic.width,
                promo_items.basic.height,
                { height: 540, width: 960 }
            );
        }

        if (promo_items.receta) {
            counterTime =
                promo_items.receta.subtype === 'custom-detalle-receta'
                    ? promo_items.receta.embed.config.title === 'detalle-receta'
                        ? promo_items.receta.embed.config.counterTime
                        : null
                    : null;

            counterPortion =
                promo_items.receta.subtype === 'custom-detalle-receta'
                    ? promo_items.receta.embed.config.title === 'detalle-receta'
                        ? promo_items.receta.embed.config.counterPortion
                        : null
                    : null;
        }
    }

    if (content_elements) {
        const preparacions = content_elements.filter(
            preparacion => preparacion.subtype === 'custom-preparacion'
        );
        preparaciones = preparacions.map(pre => {
            if (pre.embed.config.items) {
                return pre.embed.config.items.map(item => item).join(', ');
            }
            return undefined;
        });

        const ingredients = content_elements.filter(
            ingrediente => ingrediente.subtype === 'custom-ingrediente'
        );
        ingredientes = ingredients.map(pre => {
            if (pre.embed.config.items) {
                return pre.embed.config.items.map(item => item).join(', ');
            }
            return undefined;
        });
    }

    const data = {
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        author: `${autores}`,
        cookTime: `PT${counterTime}M`,
        datePublished: `${date}`,
        description: `${description}`,
        image: `${resizedUrl}`,
        recipeIngredient: `${ingredientes}`,
        name: `${headlines.basic}`,
        recipeInstructions: `${preparaciones}`,
        recipeYield: `${counterPortion} porciones`
    };

    return <SnippetRender data={data} />;
};

snippet.propTypes = {
    globalContent: PropTypes.shape({
        headlines: PropTypes.shape({
            basic: PropTypes.string
        }),
        subheadlines: PropTypes.shape({
            basic: PropTypes.string
        }),
        promo_items: PropTypes.shape({
            receta: PropTypes.object,
            basic: PropTypes.object
        }),
        display_date: PropTypes.string.isRequired,
        content_elements: PropTypes.array.isRequired,
        credits: PropTypes.shape({
            by: PropTypes.shape({
                authors: PropTypes.arrayOf(
                    PropTypes.shape({
                        _id: PropTypes.string,
                        name: PropTypes.string,
                        type: PropTypes.string,
                        slug: PropTypes.string,
                        url: PropTypes.string
                    })
                )
            })
        })
    }).isRequired
};

export default snippet;
