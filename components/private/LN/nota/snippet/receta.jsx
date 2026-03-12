/* eslint-disable prettier/prettier */
/* eslint-disable react/no-danger */
import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import Context from 'fusion:context';
import SnippetRender from '../../../common/snippet/snippetRender';
import getAssetsPath from '../../../common/utils/getAssetsPath';
import { getFirstParentSection } from '../../../common/utils/sectionUtils';
import { addForwardSlash } from '../../common/utils/addForwardSlash';
import {
    extractDataFromContentElements,
    extractDataFromCredits,
    extractDataFromPromoItems,
    extractDataFromTags
} from './extractData/extractDataReceta';

function snippet(props) {
    const {
        globalContent: {
            headlines = {},
            subheadlines = {},
            promo_items: promoItems,
            taxonomy: {
                tags,
                primary_section: primarySection = {},
                sections = {}
            },
            credits = {},
            display_date: displayDate,
            content_elements: contentElements
        },
        contextPath,
        deployment
    } = props;

    const PLACERHOLDER = getAssetsPath(contextPath)(deployment)(
        'placeholderLN-1200x800.jpg'
    );

    const LOGO = getAssetsPath(contextPath)(deployment)('logo-ln.png');

    const { by = [] } = credits;

    const { basic: headLinesBasic } = headlines;

    const { basic: subheadLinesBasic } = subheadlines;

    const date = displayDate;

    const description = subheadLinesBasic;

    const { autores } = extractDataFromCredits(by);

    const { image, counterTime, counterPortion, cookTime, prepTime } =
        extractDataFromPromoItems(promoItems, PLACERHOLDER);

    const categoria = primarySection.name;

    const { ingredients, instructions, nutrition } =
        extractDataFromContentElements(contentElements);

    const { keywords } = extractDataFromTags(tags);

    const section = getFirstParentSection(primarySection);

    const getRecipeCuisine = recipeSections => {
        if (recipeSections.length) {
            const recipeCuisine =
                recipeSections.find(e => e.parent_id === '/recetas/cocina') ||
                {};
            return recipeCuisine.name;
        }
        return undefined;
    };

    const data = {
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        recipeCuisine: getRecipeCuisine(sections),
        recipeInstructions: instructions,
        cookTime: cookTime ? `PT${cookTime}M` : undefined,
        prepTime: prepTime ? `PT${prepTime}M` : undefined,
        totalTime: counterTime ? `PT${counterTime}M` : undefined,
        datePublished: date || undefined,
        description: description || undefined,
        nutrition: Object.entries(nutrition).length
            ? {
                  '@type': 'NutritionInformation',
                  ...nutrition
              }
            : undefined,
        author: {
            '@type': autores === '' ? 'Organization' : 'Person',
            name: autores === '' ? 'LA NACION recetas' : `${autores}`
        },
        recipeIngredient: ingredients,
        recipeCategory: categoria,
        name: `${headLinesBasic || 'LA NACION - Recetas'}`,
        recipeYield: counterPortion || undefined,
        keywords: `${keywords}`,
        publisher: {
            '@type': 'Organization',
            name: 'Recetas La Nación',
            url: addForwardSlash(`${SITE_LANACION}${section}`),
            logo: {
                '@context': 'http://schema.org',
                '@type': 'ImageObject',
                url: `${LOGO}`,
                height: 41,
                width: 391
            }
        },
        image
    };
    return <SnippetRender data={data} />;
}

export default Context(snippet);
