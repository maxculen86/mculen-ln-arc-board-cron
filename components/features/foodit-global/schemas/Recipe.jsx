import React from 'react';
import get from '../../../private/common/utils/get';
import getAuthorsAsString from '../../../private/common/utils/getAuthorsAsString';
import { getSuitableForDietUrls } from './_helpers';

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

    const author = getAuthorsAsString(article);

    const { playlist = [], title = '', description = '' } = get(
        promo_items,
        'video_jw.embed.config.videoJw',
        {}
    );
    const [video] = playlist;

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
        cookTime: (cookTime && `PT${cookTime}M`) || `PT0M`,
        cookingMethod: cookingTypes.join(','),
        recipeCategory: primarySectionName,
        recipeCuisine: regions.join(','),
        recipeInstructions,
        recipeYield: (counterPortion && counterPortion) || 0,
        suitableForDiet: getSuitableForDietUrls(sections)
    };

    const howToSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        performTime: (prepTime && `PT${prepTime}M`) || `PT0M`,
        totalTime: (counterTime && `PT${counterTime}M`) || `PT0M`
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
                <script
                    type="application/ld+json"
                    key={`schema-${schema['@type']}`}
                >
                    {JSON.stringify(schema)}
                </script>
            ))}
        </>
    );
};
