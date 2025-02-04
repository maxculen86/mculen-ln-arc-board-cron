import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@ln/common-ui-text';

function Ingredient({ item, typeList, isTabIngredients }) {
    const {
        ingredient = '',
        amount,
        abbreviation = '',
        name,
        displayAmount
    } = item;
    const quantity = (amount && `${amount} ${abbreviation}`) || abbreviation;

    return (
        <div>
            <li className="flex ai-center jc-between">
                <div className="flex flex-column gap-4 pb-8">
                    {isTabIngredients ? (
                        <>
                            <Text className="text-16 text-light-800">
                                {name}
                            </Text>
                            <Text className="text-14 text-light-600">
                                {displayAmount}
                            </Text>
                        </>
                    ) : (
                        <>
                            <Text className="text-16">{ingredient}</Text>
                            {quantity && typeList === 'foodit-ingredientes' && (
                                <Text className="text-14 text-light-600">
                                    {quantity}
                                </Text>
                            )}
                        </>
                    )}
                </div>
            </li>
            <hr />
        </div>
    );
}

Ingredient.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        displayAmount: PropTypes.string,
        ingredient: PropTypes.string,
        amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        abbreviation: PropTypes.string,
        fullIngredientString: PropTypes.string
    }).isRequired,
    typeList: PropTypes.string,
    isTabIngredients: PropTypes.bool
};

Ingredient.defaultProps = {
    typeList: '',
    isTabIngredients: false
};

export default Ingredient;
