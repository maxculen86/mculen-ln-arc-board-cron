import React from 'react';
import { SITE_FOODIT } from 'fusion:environment';
import { useAppContext } from 'fusion:context';
import get from '../../../private/common/utils/get';
import {
    findPreparationSteps,
    fooditSchemaLogo,
    getSuitableForDietUrls
} from './_helpers';
import { getFooditAuthor } from '../common/utils/notaFooditHelper';
import replaceBaseUrl from '../common/utils/replaceBaseUrl';
import getTagList from '../Body/PowerupsReceta/_helper';
import { getBreadcrumbSections } from '../common/breadcrumb/_helpers';
import SnippetRender from '../../../private/common/snippet/snippetRender';
import { BreadcrumbSchema } from './Breadcrumb';

const SCHEMA_ORG_CONTEXT = 'https://schema.org';

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

const SCHEMA_ASPECT_RATIOS = [
    { width: 1200, height: 675 },
    { width: 1200, height: 900 },
    { width: 1200, height: 1200 }
];

const buildResizerUrl = (baseUrl, width, height) =>
    baseUrl
        .replace(/width=\d+/, `width=${width}`)
        .replace(/height=\d+/, `height=${height}`);

const getImageObjects = promoItems => {
    const { resized_urls: resizedUrls = [] } = replaceBaseUrl(
        get(promoItems, 'basic', {})
    );
    const baseUrl = resizedUrls[0]?.resizedUrl || '';
    if (!baseUrl) return [];
    return SCHEMA_ASPECT_RATIOS.map(({ width, height }) => ({
        '@type': 'ImageObject',
        url: buildResizerUrl(baseUrl, width, height),
        width,
        height
    }));
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

const buildArticleSchema = ({
    imageUrl,
    headlines,
    author,
    canonicalUrl,
    displayDate,
    lastUpdatedDate,
    deployment,
    contextPath
}) => ({
    '@context': SCHEMA_ORG_CONTEXT,
    '@type': 'Article',
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_FOODIT}${canonicalUrl}`
    },
    headline: get(headlines, 'basic', ''),
    image: [imageUrl],
    datePublished: displayDate,
    dateModified: lastUpdatedDate,
    author: {
        '@type': 'Person',
        name: author || 'Redacción de Foodit'
    },
    publisher: {
        '@type': 'Organization',
        name: 'Foodit',
        url: `${SITE_FOODIT}/`,
        logo: fooditSchemaLogo(deployment, contextPath)
    }
});

const buildRecipeSchema = data => {
    const {
        deployment,
        contextPath,
        headlines,
        subheadlines,
        sections,
        primarySectionName,
        author,
        imageObjects,
        recipeInstructions,
        recipeIngredients,
        metadata,
        additionalProperties
    } = data;

    const tags = metadata.tags.map(tag => tag?.text).filter(Boolean);
    const dietUrls = getSuitableForDietUrls(sections);
    const publishDate = get(additionalProperties, 'publish_date', '');

    return {
        '@context': SCHEMA_ORG_CONTEXT,
        '@type': 'Recipe',
        publisher: {
            '@type': 'Organization',
            name: 'Foodit',
            url: `${SITE_FOODIT}/`,
            logo: fooditSchemaLogo(deployment, contextPath)
        },
        name: get(headlines, 'basic', ''),
        description: get(subheadlines, 'basic', ''),
        image: imageObjects,
        author: {
            '@type': 'Person',
            name: author || 'Redacción de Foodit'
        },
        recipeCategory: primarySectionName,
        recipeYield: metadata.counterPortion,
        recipeInstructions,
        recipeIngredient: recipeIngredients,
        ...(tags.length && { keywords: tags.join(', ') }),
        ...(metadata.cookTime && { cookTime: `PT${metadata.cookTime}M` }),
        ...(metadata.cookingTypes.length && {
            cookingMethod: metadata.cookingTypes.join(',')
        }),
        ...(metadata.regions.length && {
            recipeCuisine: metadata.regions.join(',')
        }),
        ...(dietUrls.length && { suitableForDiet: dietUrls }),
        ...(metadata.prepTime && { performTime: `PT${metadata.prepTime}M` }),
        ...(metadata.counterTime && {
            totalTime: `PT${metadata.counterTime}M`
        }),
        ...(publishDate && { dateCreated: publishDate })
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
        additional_properties: additionalProperties = {},
        canonical_url: canonicalUrl = '',
        display_date: displayDate = '',
        last_updated_date: lastUpdatedDate = ''
    } = globalContent;

    const sections = get(taxonomy, 'sections', []);
    const primarySectionName = get(taxonomy, 'primary_section.name', '');
    const author = getFooditAuthor(globalContent, true);
    const video = getVideoData(promoItems);
    const imageObjects = getImageObjects(promoItems);
    const imageUrl = imageObjects[0]?.url || '';
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
        imageObjects,
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

    const articleSchema = buildArticleSchema({
        imageUrl,
        headlines,
        author,
        canonicalUrl,
        displayDate,
        lastUpdatedDate,
        deployment,
        contextPath
    });

    return (
        <>
            <SnippetRender
                key="schema-Recipe"
                id="schema-Recipe"
                data={finalSchema}
            />
            <SnippetRender
                key="schema-Article"
                id="schema-Article"
                data={articleSchema}
            />
            <BreadcrumbSchema sections={getBreadcrumbSections(globalContent)} />
        </>
    );
}
