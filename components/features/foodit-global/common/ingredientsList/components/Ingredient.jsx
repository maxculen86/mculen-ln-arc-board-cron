import React from 'react';
import { Text } from '@ln/common-ui-text';

function Ingredient({ item, isTabIngredients }) {
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
                            {quantity && (
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

export default Ingredient;
