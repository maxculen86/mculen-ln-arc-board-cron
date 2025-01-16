import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@ln/common-ui-text';
import Ingredient from './Ingredient';

function IngredientsListContent({
    bookmarkId,
    titleList,
    items = [],
    typeList
}) {
    return (
        <div>
            <div className="flex flex-column gap-16 gap-8_md">
                {titleList && (
                    <Text className="roboto-bold text-16">{titleList}</Text>
                )}
                {items?.map(item => (
                    <Ingredient
                        key={`${bookmarkId}-${item.ingredient || ''}`}
                        item={item}
                        typeList={typeList}
                    />
                ))}
            </div>
        </div>
    );
}

IngredientsListContent.propTypes = {
    bookmarkId: PropTypes.string.isRequired,
    titleList: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            amount: PropTypes.string,
            unit: PropTypes.string.isRequired,
            ingredient: PropTypes.string.isRequired,
            abbreviation: PropTypes.string,
            fullIngredientString: PropTypes.string
        })
    ).isRequired,
    typeList: PropTypes.string.isRequired
};

IngredientsListContent.defaultProps = {
    titleList: ''
};

export default IngredientsListContent;
