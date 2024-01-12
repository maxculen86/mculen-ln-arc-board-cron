import React from 'react';
import PropTypes from 'prop-types';
import Ingredients from './ingredientsBox/ingredients';
import ExternalLinks from './ingredientsBox/externalLinks';
import Nutritional from './ingredientsBox/nutritional';
import Tags from './ingredientsBox/tags';
import SummaryBox from './summaryBox/foodit';
import get from '../../../../private/common/utils/get';

export const PowerupsReceta = ({ article = {} }) => {
    const { content_elements = [], promo_items = {}, taxonomy = {} } = article;

    const {
        prepTime,
        cookTime,
        counterTime,
        counterPortion,
        cookingTypes = [],
        occasions = [],
        regions = []
    } = get(promo_items, 'receta.embed.config', {});

    const sections = get(taxonomy, 'sections', []);

    const tags = [...cookingTypes, ...occasions, ...regions, ...sections].map(
        item => ({
            text: (item.name && item.name) || item || '',
            url: item.path || '#'
        })
    );

    const {
        'custom-nutrition': nutritionLists,
        'foodit-ingredientes': ingredientsLists,
        'custom-ingrediente': customIngredientsLists
    } = content_elements.reduce(
        (acc, item) => {
            const subtype = get(item, 'subtype', '');
            if (acc.hasOwnProperty(subtype)) {
                const embed = get(item, 'embed.config');
                if (embed) {
                    acc[subtype].push(embed);
                }
            }
            return acc;
        },
        {
            'custom-nutrition': [],
            'foodit-ingredientes': [],
            'custom-ingrediente': []
        }
    );

    const externalLinksMock = {
        items: [
            {
                text: 'Guia de equivalencias',
                url: '#'
            },
            {
                text: 'Sustituto de ingredientes',
                url: '#'
            }
        ]
    };

    return (
        <>
            <div>
                <SummaryBox
                    cookTime={cookTime}
                    prepTime={prepTime}
                    counterTime={counterTime}
                />
            </div>
            <div className="bg-background-positive flex flex-column gap-16 p-16 p-24_md p-32_lg">
                <Ingredients
                    ingredientsLists={[
                        ...ingredientsLists,
                        ...customIngredientsLists
                    ]}
                    portions={counterPortion}
                />
                <hr />
                <ExternalLinks {...externalLinksMock} />
                <hr />
                <Nutritional nutritionLists={nutritionLists} />
                <hr />
                <Tags items={tags} />
            </div>
        </>
    );
};

PowerupsReceta.propTypes = {
    article: PropTypes.object
};

export default PowerupsReceta;
