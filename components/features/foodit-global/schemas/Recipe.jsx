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

const extractRecipeInstructions = contentElements => {
    const instructions = contentElements
        .filter(item => item.subtype === 'custom-preparacion')
        .flatMap(item => item.embed.config.items)
        .map((step, index) => ({
            '@type': 'HowToStep',
            text: step,
            name: `Paso ${index + 1}`
        }));

    return instructions.length > 0
        ? instructions
        : findPreparationSteps(contentElements);
};

const extractRecipeIngredients = contentElements =>
    contentElements
        .filter(
            item =>
                item.subtype === 'foodit-ingredientes' ||
                item.subtype === 'custom-ingrediente'
        )
        .flatMap(item => {
            if (item.subtype === 'foodit-ingredientes') {
                return item.embed.config.items
                    .filter(
                        ingredient =>
                            typeof ingredient === 'object' &&
                            ingredient.fullIngredientString
                    )
                    .map(ingredient => ingredient.fullIngredientString);
            }
            return item.embed.config.items;
        });

const getVideoData = promoItems => {
    const { playlist = [] } = get(
        promoItems,
        'video_jw.embed.config.videoJw',
        {}
    );
    return playlist[0] || null;
};

const getImageUrl = promoItems => {
    const { resized_urls: resizedUrls = [] } = replaceBaseUrl(
        get(promoItems, 'basic', {})
    );
    const { resizedUrl = '' } = getShortestImage(resizedUrls);
    return resizedUrl;
};

const getRecipeMetadata = (promoItems, taxonomy) => {
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

    return {
        prepTime,
        cookTime,
        counterTime,
        counterPortion,
        cookingTypes,
        regions,
        tags
    };
};

const createVideoSchema = (video, layout) => {
    if (!video || layout === 'Foodit-recipe-paywall') {
        return {};
    }

    const { link = '', image = '', title = '', description, pubdate } = video;

    return {
        video: {
            '@type': 'VideoObject',
            name: title,
            description: description || title,
            contentUrl: link,
            thumbnailUrl: image,
            uploadDate:
                (pubdate && new Date(pubdate * 1000).toISOString()) || ''
        }
    };
};

const createPaywallSchema = layout => {
    if (layout !== 'Foodit-recipe-paywall') {
        return {};
    }

    return {
        isAccessibleForFree: false,
        hasPart: [
            {
                '@type': 'WebPageElement',
                isAccessibleForFree: false,
                cssSelector: '#recipe-paywall-body'
            }
        ]
    };
};

const buildRecipeSchema = data => {
    const {
        deployment,
        contextPath,
        headlines,
        subheadlines,
        sections,
        primarySectionName,
        author,
        imageUrl,
        recipeInstructions,
        recipeIngredients,
        metadata,
        additionalProperties
    } = data;

    return {
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
            url: imageUrl
        },
        author: {
            '@type': 'Person',
            name: author || 'Redacción de Foodit'
        },
        keywords: metadata.tags.map(tag => tag?.text).join(', '),
        cookTime: (metadata.cookTime && `PT${metadata.cookTime}M`) || `PT0M`,
        cookingMethod: metadata.cookingTypes.join(','),
        recipeCategory: primarySectionName,
        recipeCuisine: metadata.regions.join(','),
        recipeYield: metadata.counterPortion,
        suitableForDiet: getSuitableForDietUrls(sections),
        performTime: (metadata.prepTime && `PT${metadata.prepTime}M`) || `PT0M`,
        totalTime:
            (metadata.counterTime && `PT${metadata.counterTime}M`) || `PT0M`,
        recipeInstructions,
        recipeIngredient: recipeIngredients,
        dateCreated: get(additionalProperties, 'publish_date', ''),
        headline: get(headlines, 'basic', '')
    };
};

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
    const author = getFooditAuthor(globalContent, true);
    const video = getVideoData(promoItems);
    const imageUrl = getImageUrl(promoItems);
    const recipeInstructions = extractRecipeInstructions(contentElements);
    const recipeIngredients = extractRecipeIngredients(contentElements);
    const metadata = getRecipeMetadata(promoItems, taxonomy);

    const baseSchema = buildRecipeSchema({
        deployment,
        contextPath,
        headlines,
        subheadlines,
        sections,
        primarySectionName,
        author,
        imageUrl,
        recipeInstructions,
        recipeIngredients,
        metadata,
        additionalProperties
    });

    const videoSchema = createVideoSchema(video, layout);
    const paywallSchema = createPaywallSchema(layout);

    const finalSchema = {
        ...baseSchema,
        ...videoSchema,
        ...paywallSchema
    };

    return (
        <>
            <SnippetRender
                key="schema-Recipe"
                id="schema-Recipe"
                data={finalSchema}
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
