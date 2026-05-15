import { SITE_FOODIT } from 'fusion:environment';

export const getSuitableForDietUrls = sections => {
    const DIET_SCHEMAS_URLS = {
        'Sin gluten': 'https://schema.org/GlutenFreeDiet',
        'Sin lactosa': 'https://schema.org/LowLactoseDiet',
        Vegana: 'https://schema.org/VeganDiet',
        Vegetariana: 'https://schema.org/VegetarianDiet'
    };

    return sections.reduce((acc, section) => {
        const dietURL = DIET_SCHEMAS_URLS[section.name];
        if (dietURL) {
            acc.push(dietURL);
        }
        return acc;
    }, []);
};

export const fooditSchemaLogo = (deployment, contextPath) => ({
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: deployment(
        `${SITE_FOODIT}${contextPath}/resources/foodit/assets/images/foodit-logo-112x112.jpg`
    ),
    height: 112,
    width: 112
});

/**
 * Finds and maps preparation steps from content elements
 * @param contentElements Array of content elements to process
 * @param options Configuration options for step extraction
 * @returns Array of preparation steps
 */

export function findPreparationSteps(contentElements, options = {}) {
    const { headerKeyword = 'preparación', maxHeaderLevel = 2 } = options;

    const preparationHeaderIndex = contentElements.findIndex(element =>
        element.content?.toLowerCase().includes(headerKeyword.toLowerCase())
    );

    if (preparationHeaderIndex === -1) {
        console.warn(`No "${headerKeyword}" header found`);
        return [];
    }

    const preparationLists = [];

    for (
        let i = preparationHeaderIndex + 1;
        i < contentElements.length;
        i += 1
    ) {
        if (contentElements[i].type === 'list') {
            const mappedList = contentElements[i].items.map((item, index) => ({
                '@type': 'HowToStep',
                text: item.content,
                name: `Paso ${index + 1}`
            }));

            preparationLists.push(...mappedList);

            return mappedList;
        }

        if (
            contentElements[i].type === 'header' &&
            contentElements[i].level <= maxHeaderLevel &&
            i > preparationHeaderIndex + 1
        ) {
            break;
        }
    }

    return preparationLists;
}
