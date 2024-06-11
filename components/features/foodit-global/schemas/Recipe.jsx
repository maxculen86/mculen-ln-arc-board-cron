import React from 'react';
import get from '../../../private/common/utils/get';
import { getSuitableForDietUrls } from './_helpers';
import { getFooditAuthor } from '../common/utils/notaFooditHelper';
import replaceBaseUrl from '../common/utils/replaceBaseUrl';
import { getShortestImage } from '../../../private/LN/common/utils/mediaHelper';
import SnippetRender from '../../../private/common/snippet/snippetRender';
import getTagList from '../Body/PowerupsReceta/_helper';

export const RecipeSchema = ({ article = {} }) => {
    const {
        promo_items = {},
        content_elements = [],
        headlines = {},
        subheadlines = {},
        taxonomy = {},
        additional_properties = {}
    } = article;

    const sections = get(taxonomy, 'sections', []);
    const primarySectionName = get(taxonomy, 'primary_section.name', '');

    const recipeInstructions = content_elements
        .filter(item => item.subtype === 'custom-preparacion')
        .flatMap(item => item.embed.config.items)
        .map((step, index) => ({
            '@type': 'HowToStep',
            text: step,
            name: `Paso ${index + 1}`
        }));

    const recipeIngredient = content_elements
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

    const author = getFooditAuthor(article, true);

    const { playlist = [] } = get(
        promo_items,
        'video_jw.embed.config.videoJw',
        {}
    );
    const [video] = playlist;

    const { link = '', image = '', title = '', description, pubdate } =
        video || {};

    const { resized_urls = [] } = replaceBaseUrl(get(promo_items, 'basic', {}));
    const { resizedUrl = '' } = getShortestImage(resized_urls);

    const {
        prepTime,
        cookTime,
        counterTime,
        counterPortion = 0,
        cookingTypes = [],
        regions = [],
        occasions = []
    } = get(promo_items, 'receta.embed.config', {});

    const tags = getTagList({
        cookingTypes,
        occasions,
        taxonomy,
        regions
    });

    const recipeSchema = {
        '@context': 'https://schema.org',
        '@type': 'Recipe',
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
        recipeInstructions,
        recipeIngredient,
        dateCreated: get(additional_properties, 'publish_date', ''),
        headline: get(headlines, 'basic', ''),
        ...((video && {
            video: {
                '@type': 'VideoObject',
                name: title,
                description: description || title,
                contentUrl: link,
                thumbnailUrl: image,
                uploadDate:
                    (pubdate && new Date(pubdate * 1000).toISOString()) || ''
            }
        }) ||
            {})
    };

    return (
        <SnippetRender
            key={'schema-Recipe'}
            id={'schema-Recipe'}
            data={recipeSchema}
        />
    );
};
