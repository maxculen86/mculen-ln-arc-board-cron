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
