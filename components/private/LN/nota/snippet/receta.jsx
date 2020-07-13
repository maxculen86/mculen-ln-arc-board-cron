/* eslint-disable prettier/prettier */
/* eslint-disable react/no-danger */
import React from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import { createResizer } from '../../../common/utils/image/resizer';
import SnippetRender from '../../../common/snippet/snippetRender';
import getAssetsPath from '../../../common/utils/getAssetsPath';
import getPathForImage from '../../../common/utils/getPathForImage';

const extractDataFromContentElements = contentElements => {
    let ingredientes = [];
    const preparaciones = [];

    if (contentElements) {
        const preparacions = contentElements.filter(
            preparacion => preparacion.subtype === 'custom-preparacion'
        );

        preparacions.forEach(pre => {
            if (pre.embed.config.items) {
                pre.embed.config.items.map(item =>
                    preparaciones.push({ '@type': 'HowToStep', text: item })
                );
            }
        });

        const ingredients = contentElements.filter(
            ingrediente => ingrediente.subtype === 'custom-ingrediente'
        );

        ingredients.forEach(pre => {
            if (pre.embed.config.items) {
                ingredientes = ingredientes.concat(pre.embed.config.items);
            }
        });
    }

    return {
        ingredientes,
        preparaciones
    };
};

const extractDataFromPromoItems = promoItems => {
    let counterTime = '';
    let counterPortion = '';
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
            resizedUrl = getPathForImage(resizedUrl);
        }

        if (promoItems.receta) {
            if (
                promoItems.receta.subtype === 'custom-detalle-receta' &&
                promoItems.receta.embed.config.title === 'detalle-receta'
            ) {
                counterTime = promoItems.receta.embed.config.counterTime;
                counterPortion = promoItems.receta.embed.config.counterPortion;
            }
        }
    }

    return {
        resizedUrl,
        counterTime,
        counterPortion
    };
};

const extractDataFromTags = tags => {
    let keywords = '';
    if (tags) {
        keywords = tags.map(tag => tag.description).join(', ');
    }

    return { keywords };
};

const extracDataFromCredits = by => {
    let autores = [];
    if (by) {
        autores = by
            .filter(v => v.type === 'author')
            .map(v => v.name.replace(/[^a-zA-Z ]+/g, ''))
            .join(', ');
    }

    return { autores };
};

const snippet = props => {
    const {
        globalContent: {
            headlines,
            subheadlines,
            promo_items: promoItems,
            taxonomy: { tags },
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
    const date = displayDate;
    const description = subheadLinesBasic;

    const { autores } = extracDataFromCredits(by);

    const {
        resizedUrl,
        counterTime,
        counterPortion
    } = extractDataFromPromoItems(promoItems);

    const { preparaciones, ingredientes } = extractDataFromContentElements(
        contentElements
    );

    const { keywords } = extractDataFromTags(tags);

    const data = {
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        author: `${autores || ''}`,
        cookTime: counterTime ? `PT${counterTime}M` : '',
        prepTime: counterTime ? `PT${counterTime}M` : '',
        totalTime: counterTime ? `PT${counterTime}M` : '',
        datePublished: `${date || ''}`,
        description: `${description || ''}`,
        image: `${resizedUrl || PLACERHOLDER}`, // TODO: traer imagen del PlaceHolder en caso de no traer data
        recipeIngredient: ingredientes,
        name: `${headLinesBasic || 'LA NACION - Recetas'}`,
        recipeInstructions: preparaciones,
        recipeYield: counterPortion ? `${counterPortion} porciones` : '',
        keywords: `${keywords}`
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
        taxonomy: PropTypes.shape({
            tags: PropTypes.array
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
    }).isRequired,
    deployment: PropTypes.func.isRequired,
    contextPath: PropTypes.string.isRequired
};

export default Context(snippet);
