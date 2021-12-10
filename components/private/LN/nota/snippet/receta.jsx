/* eslint-disable prettier/prettier */
/* eslint-disable react/no-danger */
import React from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import SnippetRender from '../../../common/snippet/snippetRender';
import getAssetsPath from '../../../common/utils/getAssetsPath';
import getDomain from '../../../common/utils/getDomain';
import { getFirstParentSection } from '../../../common/utils/sectionUtils';
import addForwardSlash from '../../common/utils/addForwardSlash';
import {
    extractDataFromContentElements,
    extractDataFromCredits,
    extractDataFromPromoItems,
    extractDataFromTags
} from './extractData/extractDataReceta';

const snippet = props => {
    const {
        globalContent: {
            headlines,
            subheadlines,
            promo_items: promoItems,
            taxonomy: { tags, primary_section: primarySection = {} },
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

    const { by = [] } = credits || {};

    const { basic: headLinesBasic } = headlines || {};

    const { basic: subheadLinesBasic } = subheadlines || {};

    const date = displayDate;

    const description = subheadLinesBasic;

    const { autores } = extractDataFromCredits(by) || {};

    const {
        image,
        counterTime,
        counterPortion,
        cookTime,
        prepTime
    } = extractDataFromPromoItems(promoItems);

    const categoria = primarySection.name;

    const { ingredients, instructions } = extractDataFromContentElements(
        contentElements
    );
    console.log('🚀 ~ file: receta.jsx ~ line 61 ~ instructions', instructions);

    const { keywords } = extractDataFromTags(tags);

    const section = getFirstParentSection(primarySection);

    const data = {
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        ...(primarySection.parent_id === '/recetas/cocina' && {
            recipeCuisine: primarySection.name
        }),
        recipeInstructions: instructions,
        author: {
            '@type': autores === '' ? 'Organization' : 'Person',
            name: autores === '' ? 'LA NACION recetas' : `${autores}`
        },
        cookTime: cookTime ? `PT${cookTime}M` : '',
        prepTime: prepTime ? `PT${prepTime}M` : '',
        totalTime: counterTime ? `PT${counterTime}M` : '',
        datePublished: `${date || ''}`,
        description: `${description || ''}`,
        image: `${image || PLACERHOLDER}`,
        recipeIngredient: ingredients,
        recipeCategory: categoria,
        name: `${headLinesBasic || 'LA NACION - Recetas'}`,
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
