/* eslint-disable prettier/prettier */
/* eslint-disable react/no-danger */
import React from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import SnippetRender from '../../../common/snippet/snippetRender';
import getAssetsPath from '../../../common/utils/getAssetsPath';
import getDomain from '../../../common/utils/getDomain';
import { getFirstParentSection } from '../../../common/utils/sectionUtils';
import get from '../../../common/utils/get';
import addForwardSlash from '../../common/utils/addForwardSlash';

const extractDataFromContentElements = contentElements => {
    let ingredientes = [];
    const preparaciones = [];

    if (contentElements) {
        const preparacions = contentElements.filter(
            preparacion => preparacion.subtype === 'custom-preparacion'
        );

        preparacions.forEach(pre => {
            if (get(pre, 'embed.config.items') !== undefined) {
                pre.embed.config.items.map(item =>
                    preparaciones.push({ '@type': 'HowToStep', text: item })
                );
            }
        });

        const ingredients = contentElements.filter(
            ingrediente => ingrediente.subtype === 'custom-ingrediente'
        );

        ingredients.forEach(pre => {
            if (get(pre, 'embed.config.items') !== undefined) {
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
    let image;

    if (promoItems) {
        const { basic } = promoItems;
        const { type, url } = basic || {};
        if (type === 'image') {
            image = url;
        }

        if (promoItems.receta) {
            if (
                promoItems.receta.subtype === 'custom-detalle-receta' &&
                get(promoItems.receta, 'embed.config.title') ===
                    'detalle-receta'
            ) {
                counterTime = get(
                    promoItems.receta,
                    'embed.config.counterTime',
                    ''
                );
                counterPortion = get(
                    promoItems.receta,
                    'embed.config.counterPortion',
                    ''
                );
            }
        }
    }

    return {
        image,
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
            taxonomy: { tags, primary_section: primarySection },
            credits,
            display_date: displayDate,
            content_elements: contentElements,
            website_url
        },
        contextPath,
        deployment
    } = props;

    const PLACERHOLDER = getAssetsPath(contextPath)(deployment)('bco.png');
    const LOGO_AMP = getAssetsPath(contextPath)(deployment)('logo-ln-amp.png');
    const { by } = credits || {};
    const { basic: headLinesBasic } = headlines || {};
    const { basic: subheadLinesBasic } = subheadlines || {};
    const date = displayDate;
    const description = subheadLinesBasic;

    const { autores } = extracDataFromCredits(by) || '';

    const { image, counterTime, counterPortion } = extractDataFromPromoItems(
        promoItems
    );

    const { preparaciones, ingredientes } = extractDataFromContentElements(
        contentElements
    );

    const { keywords } = extractDataFromTags(tags);

    const section = getFirstParentSection(primarySection);

    const data = {
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        author: {
            '@type': autores === '' ? 'Organization' : 'Person',
            name: autores === '' ? 'LA NACION recetas' : `${autores}`
        },
        cookTime: counterTime ? `PT${counterTime}M` : '',
        prepTime: counterTime ? `PT${counterTime}M` : '',
        totalTime: counterTime ? `PT${counterTime}M` : '',
        datePublished: `${date || ''}`,
        description: `${description || ''}`,
        image: `${image || PLACERHOLDER}`,
        recipeIngredient: ingredientes,
        name: `${headLinesBasic || 'LA NACION - Recetas'}`,
        recipeInstructions: preparaciones,
        recipeYield: counterPortion ? `${counterPortion} porciones` : '',
        keywords: `${keywords}`,
        publisher: {
            '@type': 'Organization',
            name: 'Recetas La Nación',
            url: addForwardSlash(`${getDomain({ website_url })}${section}`),
            logo: {
                '@context': 'http://schema.org',
                '@type': 'ImageObject',
                url: `${LOGO_AMP}`,
                height: 41,
                width: 391
            }
        }
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
            tags: PropTypes.array,
            primary_section: PropTypes.object
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
        }),
        _id: PropTypes.string.isRequired,
        website_url: PropTypes.string.isRequired
    }).isRequired,
    deployment: PropTypes.func.isRequired,
    contextPath: PropTypes.string.isRequired
};

export default Context(snippet);
