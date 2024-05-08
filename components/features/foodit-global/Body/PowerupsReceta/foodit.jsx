import React from 'react';

import Static from 'fusion:static';
import PropTypes from 'prop-types';
import Ingredients from './ingredientsBox/ingredients';
import { MoreInfo } from './ingredientsBox/moreInfo';
import Nutritional from './ingredientsBox/nutritional';
import Tags from './ingredientsBox/tags';
import SummaryBox from './summaryBox/foodit';
import get from '../../../../private/common/utils/get';

export const PowerupsReceta = ({ article = {} }) => {
    const {
        content_elements = [],
        promo_items = {},
        taxonomy = {},
        headlines = {},
        _id = ''
    } = article;

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

    return (
        <>
            <Static htmlOnly persistent id={`sumary-box-${_id}`}>
                <SummaryBox
                    cookTime={cookTime}
                    prepTime={prepTime}
                    counterTime={counterTime}
                />
            </Static>
            <div className="bg-positive flex flex-column gap-16 gap-24_md gap-32_lg p-16 p-24_md p-32_lg">
                <Ingredients
                    articleId={_id}
                    ingredientsLists={[
                        ...ingredientsLists,
                        ...customIngredientsLists.map(data => ({
                            ...data,
                            items: data.items.map(item => ({
                                fullIngredientString: item,
                                ingredient: item
                            }))
                        }))
                    ]}
                    title={get(headlines, 'basic', '')}
                    portions={counterPortion}
                />
                <Static htmlOnly persistent id={`adintional-info-${_id}`}>
                    <hr />
                    <MoreInfo />
                    <hr />
                    <Nutritional nutritionLists={nutritionLists} />
                    <Tags items={tags} />
                </Static>
            </div>
        </>
    );
};

PowerupsReceta.propTypes = {
    article: PropTypes.object
};

export default PowerupsReceta;
