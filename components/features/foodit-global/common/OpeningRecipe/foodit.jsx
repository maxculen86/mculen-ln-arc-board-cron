import React from 'react';
import PropTypes from 'prop-types';

import getAuthorsAsString from '../../../../private/common/utils/getAuthorsAsString';
import get from '../../../../private/common/utils/get';

import { Text } from '@ln/common-ui-text';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { getImagesToLoadWithPicture } from '../../../../private/LN/common/utils/mediaHelper';

// Temporary function for data display, final result still pending design definitions
function concatenateWithComma(stringsArray) {
    return stringsArray.join(', ');
}

export const OpeningRecipe = ({ article = {} }) => {
    const { promo_items = {}, headlines = {}, subheadlines = {} } = article;

    const {
        cookTime = 0,
        prepTime = 0,
        counterTime = 0,
        regions = [],
        cookingTypes = [],
        occasions = []
    } = get(promo_items, 'receta.embed.config', {});

    const author = getAuthorsAsString(article);

    // TODO: Make a new filter for foodit, the actual filter doesnt have some embed properties
    return (
        <div>
            <div className="com-image">
                <Adaptableimage
                    alt={get(promo_items, 'basic.caption', '')}
                    src={get(promo_items, 'basic.url', '')}
                    className="com-image"
                    fetchPriority="high"
                    loading="eager"
                    sources={getImagesToLoadWithPicture(
                        get(promo_items, 'basic.resized_urls', [])
                    )}
                />
            </div>
            <Text text={'TITULO: ' + get(headlines, 'basic', '')} as="h1" />
            <br />
            <Text text={'BAJADA: ' + get(subheadlines, 'basic', '')} as="h2" />
            <br />
            <Text text={author} as="h3" />
            <br />
            <div>
                <p>cookingTime: {cookTime}</p>
                <p>prepTime: {prepTime}</p>
                <p>counterTime: {counterTime}</p>
                <br />
                <p>regions: {concatenateWithComma(regions)}</p>
                <p>cookingTypes: {concatenateWithComma(cookingTypes)}</p>
                <p>occasions: {concatenateWithComma(occasions)}</p>
            </div>
        </div>
    );
};

OpeningRecipe.propTypes = {
    article: PropTypes.object
};

export default OpeningRecipe;
