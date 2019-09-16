/* eslint-disable react/no-danger */
import React from 'react';

// TODO:
const snippet = props => {
    const {
        globalContent: {
            first_publish_date,
            credits: { by },
            headlines,
            subheadlines,
            promo_items,
            content_elements,
            taxonomy: {
                primary_section: { path: primarySectionPath }
            }
        }
    } = props;

    const autores = by.map(v => v.name).join(', ');
    const date = first_publish_date;
    const description = subheadlines.basic;
    const image = promo_items.basic.url;

    const counterTime =
        promo_items.receta.subtype === 'custom-detalle-receta'
            ? promo_items.receta.embed.config.title === 'detalle-receta'
                ? promo_items.receta.embed.config.counterTime
                : null
            : null;
    const counterPortion =
        promo_items.receta.subtype === 'custom-detalle-receta'
            ? promo_items.receta.embed.config.title === 'detalle-receta'
                ? promo_items.receta.embed.config.counterPortion
                : null
            : null;

    const preparacions = content_elements.filter(
        preparacion => preparacion.subtype === 'custom-preparacion'
    );
    const preparaciones = preparacions
        .map(pre => pre.embed.config.items.map(item => item).join(', '))
        .join(', ');

    const ingredients = content_elements.filter(
        ingrediente => ingrediente.subtype === 'custom-ingrediente'
    );
    const ingredientes = ingredients.map(pre =>
        pre.embed.config.items.map(item => item).join(', ')
    );

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

export default snippet;
