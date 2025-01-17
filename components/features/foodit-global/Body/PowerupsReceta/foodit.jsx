import React from 'react';

import Static from 'fusion:static';
import PropTypes from 'fusion:prop-types';
import { Ingredients } from './ingredientsBox/ingredients';
import { MoreInfo } from './ingredientsBox/moreInfo';
import { Nutritional } from './ingredientsBox/nutritional';
import { Tags } from './ingredientsBox/tags';
import { SummaryBox } from './summaryBox/foodit';
import get from '../../../../private/common/utils/get';
import getTagList, { getListsFromPowerup } from './_helper';

export function PowerupsReceta({ article = {} }) {
    const {
        content_elements: contentElements = [],
        promo_items: promoItems = {},
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
    } = get(promoItems, 'receta.embed.config', {});

    const tags = getTagList({
        cookingTypes,
        occasions,
        taxonomy,
        regions,
        idArticle: _id
    });

    const { nutritionLists, ingredientsLists } =
        getListsFromPowerup(contentElements);

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
                    ingredientsLists={ingredientsLists}
                    title={get(headlines, 'basic', '')}
                    portions={counterPortion}
                />
                <Static htmlOnly persistent id={`adintional-info-${_id}`}>
                    <hr />
                    <MoreInfo />
                    <hr />
                    <Nutritional nutritionLists={nutritionLists} />
                </Static>
                <Tags items={tags} />
            </div>
        </>
    );
}

PowerupsReceta.propTypes = {
    article: PropTypes.object.isRequired
};

export default PowerupsReceta;
