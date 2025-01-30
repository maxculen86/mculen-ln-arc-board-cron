import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@ln/common-ui-text';
import { RecipeOptions } from './RecipeOptions';

function IngredientsListHeader({ list, title, bookmarkId, setShoppingList }) {
    return (
        <div className="flex gap-24 ai-center jc-between">
            <Text
                className="prumo prumo-light text-24 text-32_md text-36_lg text-left"
                as="h2"
            >
                {title}
            </Text>
            <RecipeOptions
                list={list}
                bookmarkId={bookmarkId}
                setShoppingList={setShoppingList}
            />
        </div>
    );
}

IngredientsListHeader.propTypes = {
    bookmarkId: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(
        PropTypes.shape({
            sections: PropTypes.arrayOf(
                PropTypes.shape({
                    typeList: PropTypes.string.isRequired,
                    items: PropTypes.arrayOf(
                        PropTypes.shape({
                            fullIngredientString: PropTypes.string.isRequired,
                            ingredient: PropTypes.string.isRequired,
                            amount: PropTypes.string,
                            unit: PropTypes.string.isRequired
                        })
                    ).isRequired,
                    titleList: PropTypes.string
                })
            ).isRequired,
            text: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            bookmarkId: PropTypes.string.isRequired
        })
    ).isRequired,
    title: PropTypes.string.isRequired,
    setShoppingList: PropTypes.func.isRequired
};

export default IngredientsListHeader;
