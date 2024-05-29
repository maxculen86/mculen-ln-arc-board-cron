import React from 'react';
import get from '../../../private/common/utils/get';
import { getSuitableForDietUrls } from './_helpers';
import { getFooditAuthor } from '../common/utils/notaFooditHelper';
import replaceBaseUrl from '../common/utils/replaceBaseUrl';
import { getShortestImage } from '../../../private/LN/common/utils/mediaHelper';
import SnippetRender from '../../../private/common/snippet/snippetRender';

export const RecipeSchema = ({ article = {} }) => {
    const {
        promo_items = {},
        content_elements = [],
        headlines = {},
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

    const author = getFooditAuthor(article);

    const { playlist = [], title = '', description = '' } = get(
        promo_items,
        'video_jw.embed.config.videoJw',
        {}
    );
    const [video] = playlist;

    const { resized_urls = [] } = replaceBaseUrl(get(promo_items, 'basic', {}));
    const { resizedUrl = '' } = getShortestImage(resized_urls);

    const {
        prepTime,
        cookTime,
        counterTime,
        counterPortion,
        cookingTypes = [],
        regions = []
    } = get(promo_items, 'receta.embed.config', {});

    const recipeSchema = {
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        name: get(headlines, 'basic', ''),
        Image: {
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            url: resizedUrl
        },
        cookTime: (cookTime && `PT${cookTime}M`) || `PT0M`,
        cookingMethod: cookingTypes.join(','),
        recipeCategory: primarySectionName,
        recipeCuisine: regions.join(','),
        recipeYield: (counterPortion && counterPortion) || 0,
        suitableForDiet: getSuitableForDietUrls(sections)
    };

    const howToSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        performTime: (prepTime && `PT${prepTime}M`) || `PT0M`,
        totalTime: (counterTime && `PT${counterTime}M`) || `PT0M`,
        step: recipeInstructions
    };

    const creativeWorkchema = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        author: {
            '@type': 'Person',
            name: (author && author) || 'Redacción de Foodit'
        },
        dateCreated: get(additional_properties, 'publish_date', ''),
        headline: get(headlines, 'basic', ''),
        ...((video && {
            video: {
                '@type': 'VideoObject',
                name: title,
                description: description,
                contentUrl: get(video, 'link', '')
            }
        }) ||
            {})
    };

    return (
        <>
            {[recipeSchema, howToSchema, creativeWorkchema].map(schema => (
                <SnippetRender
                    key={`schema-${schema['@type']}`}
                    id={`schema-${schema['@type']}`}
                    data={schema}
                />
            ))}
        </>
    );
};
