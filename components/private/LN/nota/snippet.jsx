/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';

// TODO:
const snippet = props => {
    const {
        globalContent: {
            headlines,
            subheadlines,
            promo_items,
            credits: { by },
            display_date,
            content_elements,
            taxonomy: {
                primary_section: { path: primarySectionPath }
            }
        }
    } = props;

    const autores = !!by
        ? by
              .filter(v => v.type === 'author')
              .map(v => v.name)
              .join(', ')
        : [];
    const date = display_date;
    const description = subheadlines.basic;
    let image, counterTime, counterPortion, ingredientes, preparaciones;

    if (promo_items && !!promo_items.receta && !!promo_items.basic) {
        image = promo_items.basic.url;

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

    if (content_elements) {
        const preparacions = content_elements.filter(
            preparacion => preparacion.subtype === 'custom-preparacion'
        );
        preparaciones = preparacions.map(pre => {
            if (pre.embed.config.items) {
                return pre.embed.config.items.map(item => item).join(', ');
            }
        });

        const ingredients = content_elements.filter(
            ingrediente => ingrediente.subtype === 'custom-ingrediente'
        );
        ingredientes = ingredients.map(pre => {
            if (pre.embed.config.items) {
                return pre.embed.config.items.map(item => item).join(', ');
            }
        });
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: `var snippet = [
                    {
                        "@context": "http://schema.org",
                        "@type": "Recipe",
                        "author": '${autores}',
                        "cookTime": 'PT${counterTime}M',
                        "datePublished": '${date}',
                        "description": '${description}',
                        "image": '${image}',
                        "recipeIngredient": '${ingredientes}',
                        "name": '${headlines.basic}',
                        "recipeInstructions": '${preparaciones}',
                        "recipeYield": '${counterPortion} porciones'
                    }
                ];`
            }}
        />
    );
};

snippet.propTypes = {
    headlines: PropTypes.object.isRequired,
    subheadlines: PropTypes.object.isRequired,
    promo_items: PropTypes.shape({
        receta: PropTypes.object,
        basic: PropTypes.object
    }),
    content_elements: PropTypes.array.isRequired,
    display_date: PropTypes.string.isRequired,
    taxonomy: PropTypes.shape({
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                description: PropTypes.string,
                slug: PropTypes.string,
                text: PropTypes.string
            })
        ).isRequired
    }),
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
};

export default snippet;
