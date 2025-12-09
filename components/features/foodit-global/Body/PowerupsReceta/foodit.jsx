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
        _id = '',
        canonical_url: canonicalUrl = ''
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

    const allowConversor = get(
        article,
        'label.conversion_porciones.text',
        'Si'
    );

    const primarySection = get(article, 'taxonomy.primary_section._id', '');
    const sectionsWithoutConversor = [
        '/recetas/saladas/tartas',
        '/recetas/dulces/tartas',
        '/recetas/dulces/tortas',
        '/recetas/dulces/postres',
        '/recetas/dulces/budines',
        '/recetas/saladas/pizzas-y-empanadas'
    ];

    const validateSection = !sectionsWithoutConversor.includes(primarySection);
    const showButtonsConversor = allowConversor === 'Si' && validateSection;

    return (
        <>
            <Static htmlOnly persistent id={`sumary-box-${_id}`}>
                <SummaryBox
                    cookTime={cookTime}
                    prepTime={prepTime}
                    counterTime={counterTime}
                />
            </Static>
            <div className="flex flex-column gap-32">
                <div className="bg-positive flex flex-column gap-16 gap-24_md gap-32_lg p-16 p-24_md p-32_lg">
                    <Ingredients
                        articleId={_id}
                        ingredientsLists={ingredientsLists}
                        title={get(headlines, 'basic', '')}
                        portions={counterPortion}
                        showButtonsConversor={showButtonsConversor}
                        canonicalUrl={canonicalUrl}
                    />
                    <Static htmlOnly persistent id={`adintional-info-${_id}`}>
                        <MoreInfo />
                        <Nutritional nutritionLists={nutritionLists} />
                    </Static>
                </div>
                <Tags items={tags} />
            </div>
        </>
    );
}

PowerupsReceta.propTypes = {
    article: PropTypes.object.isRequired
};

export default PowerupsReceta;
