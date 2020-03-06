/* eslint-disable react/no-danger */
import React from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import { createResizer } from '../../../common/utils/image/resizer';
import SnippetRender from '../../../common/snippet/snippetRender';
import getAssetsPath from '../../../common/utils/getAssetsPath';

const snippet = props => {
    const {
        globalContent: {
            headlines,
            subheadlines,
            promo_items: promoItems,
            credits,
            display_date: displayDate,
            content_elements: contentElements
        },
        contextPath,
        deployment
    } = props;
    const PLACERHOLDER = getAssetsPath(contextPath)(deployment)('bco.png');
    const { by } = credits || {};
    const { basic: headLinesBasic } = headlines || {};
    const { basic: subheadLinesBasic } = subheadlines || {};
    const autores = by
        ? by
              .filter(v => v.type === 'author')
              .map(v => v.name)
              .join(', ')
        : [];
    const date = displayDate;
    const description = subheadLinesBasic;
    let counterTime;
    let counterPortion;
    let ingredientes;
    let preparaciones;
    let resizedUrl;

    if (promoItems) {
        const { basic } = promoItems;
        const { type, url, width, height } = basic || {};
        if (type && type === 'image') {
            const resizer = createResizer(RESIZER_KEY, RESIZER_URL);
            resizedUrl = resizer.resizeUrl(url, width, height, {
                height: 540,
                width: 960
            });
        }

        if (promoItems.receta) {
            counterTime =
                promoItems.receta.subtype === 'custom-detalle-receta'
                    ? promoItems.receta.embed.config.title === 'detalle-receta'
                        ? promoItems.receta.embed.config.counterTime
                        : null
                    : null;

            counterPortion =
                promoItems.receta.subtype === 'custom-detalle-receta'
                    ? promoItems.receta.embed.config.title === 'detalle-receta'
                        ? promoItems.receta.embed.config.counterPortion
                        : null
                    : null;
        }
    }

    if (contentElements) {
        const preparacions = contentElements.filter(
            preparacion => preparacion.subtype === 'custom-preparacion'
        );
        preparaciones = preparacions.map(pre => {
            if (pre.embed.config.items) {
                return pre.embed.config.items.map(item => item).join(', ');
            }
            return undefined;
        });

        const ingredients = contentElements.filter(
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
        author: `${autores || ''}`,
        cookTime: counterTime ? `PT${counterTime}M` : '',
        datePublished: `${date || ''}`,
        description: `${description || ''}`,
        image: `${resizedUrl || PLACERHOLDER}`, // TODO: traer imagen del PlaceHolder en caso de no traer data
        recipeIngredient: `${ingredientes || ''}`,
        name: `${headLinesBasic || 'LA NACION - Recetas'}`,
        recipeInstructions: `${preparaciones || ''}`,
        recipeYield: counterPortion ? `${counterPortion} porciones` : ''
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
    }).isRequired,
    deployment: PropTypes.func.isRequired,
    contextPath: PropTypes.string.isRequired
};

export default Context(snippet);
