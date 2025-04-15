import React from 'react';
import { SITE_FOODIT } from 'fusion:environment';
import { useAppContext } from 'fusion:context';

import PropTypes from 'fusion:prop-types';
import get from '../../../private/common/utils/get';
import {
    findPreparationSteps,
    fooditSchemaLogo,
    getSuitableForDietUrls
} from './_helpers';
import { getFooditAuthor } from '../common/utils/notaFooditHelper';
import replaceBaseUrl from '../common/utils/replaceBaseUrl';
import { getShortestImage } from '../../../private/LN/common/utils/mediaHelper';
import getTagList from '../Body/PowerupsReceta/_helper';
import { getBreadcrumbSections } from '../common/breadcrumb/_helpers';

import SnippetRender from '../../../private/common/snippet/snippetRender';
import { BreadcrumbSchema } from './Breadcrumb';

export function RecipeSchema({ globalContent = {}, layout = '' }) {
    const { contextPath, deployment } = useAppContext();
    const {
        promo_items: promoItems = {},
        content_elements: contentElements = [],
        headlines = {},
        subheadlines = {},
        taxonomy = {},
        additional_properties: additionalProperties = {}
    } = globalContent;

    const sections = get(taxonomy, 'sections', []);
    const primarySectionName = get(taxonomy, 'primary_section.name', '');

    const recipeInstructions = contentElements
        .filter(item => item.subtype === 'custom-preparacion')
        .flatMap(item => item.embed.config.items)
        .map((step, index) => ({
            '@type': 'HowToStep',
            text: step,
            name: `Paso ${index + 1}`
        }));

    const recipeIngredient = contentElements
        .filter(
            item =>
                item.subtype === 'foodit-ingredientes' ||
                item.subtype === 'custom-ingrediente'
        )
        .flatMap(item =>
            item.subtype === 'foodit-ingredientes'
                ? item.embed.config.items
                      .filter(
                          ingredient =>
                              typeof ingredient === 'object' &&
                              ingredient.fullIngredientString
                      )
                      .map(ingredient => ingredient.fullIngredientString)
                : item.embed.config.items
        );

    const author = getFooditAuthor(globalContent, true);

    const { playlist = [] } = get(
        promoItems,
        'video_jw.embed.config.videoJw',
        {}
    );
    const [video] = playlist;

    const {
        link = '',
        image = '',
        title = '',
        description,
        pubdate
    } = video || {};

    const { resized_urls: resizedUrls = [] } = replaceBaseUrl(
        get(promoItems, 'basic', {})
    );
    const { resizedUrl = '' } = getShortestImage(resizedUrls);

    const {
        prepTime,
        cookTime,
        counterTime,
        counterPortion = 0,
        cookingTypes = [],
        regions = [],
        occasions = []
    } = get(promoItems, 'receta.embed.config', {});

    const tags = getTagList({
        cookingTypes,
        occasions,
        taxonomy,
        regions
    });

    const recipeSchema = {
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        publisher: {
            '@type': 'Organization',
            name: 'Foodit',
            url: `${SITE_FOODIT}/`,
            logo: fooditSchemaLogo(deployment, contextPath)
        },
        name: get(headlines, 'basic', ''),
        description: get(subheadlines, 'basic', ''),
        image: {
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            url: resizedUrl
        },
        author: {
            '@type': 'Person',
            name: author || 'Redacción de Foodit'
        },
        keywords: tags.map(tag => tag?.text).join(', '),
        cookTime: (cookTime && `PT${cookTime}M`) || `PT0M`,
        cookingMethod: cookingTypes.join(','),
        recipeCategory: primarySectionName,
        recipeCuisine: regions.join(','),
        recipeYield: counterPortion,
        suitableForDiet: getSuitableForDietUrls(sections),
        performTime: (prepTime && `PT${prepTime}M`) || `PT0M`,
        totalTime: (counterTime && `PT${counterTime}M`) || `PT0M`,
        recipeInstructions:
            recipeInstructions.length > 0
                ? recipeInstructions
                : findPreparationSteps(contentElements),
        recipeIngredient,
        dateCreated: get(additionalProperties, 'publish_date', ''),
        headline: get(headlines, 'basic', ''),
        ...((video &&
            layout !== 'Foodit-recipe-paywall' && {
                video: {
                    '@type': 'VideoObject',
                    name: title,
                    description: description || title,
                    contentUrl: link,
                    thumbnailUrl: image,
                    uploadDate:
                        (pubdate && new Date(pubdate * 1000).toISOString()) ||
                        ''
                }
            }) ||
            {}),
        ...((layout === 'Foodit-recipe-paywall' && {
            isAccessibleForFree: false,
            hasPart: [
                {
                    '@type': 'WebPageElement',
                    isAccessibleForFree: false,
                    cssSelector: '#recipe-paywall-body'
                }
            ]
        }) ||
            {})
    };

    return (
        <>
            <SnippetRender
                key="schema-Recipe"
                id="schema-Recipe"
                data={recipeSchema}
            />
            <BreadcrumbSchema sections={getBreadcrumbSections(globalContent)} />
        </>
    );
}

RecipeSchema.propTypes = {
    globalContent: PropTypes.shape({
        promo_items: PropTypes.object,
        content_elements: PropTypes.array,
        headlines: PropTypes.object,
        subheadlines: PropTypes.object,
        taxonomy: PropTypes.object,
        additional_properties: PropTypes.object
    }).isRequired,
    layout: PropTypes.string.isRequired
};
