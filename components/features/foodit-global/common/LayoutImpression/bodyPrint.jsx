import React from 'react';
import { Text } from '@ln/common-ui-text';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import PrintIngredients from '../PrintIngredients/foodit';
import { Nutritional } from '../../Body/PowerupsReceta/ingredientsBox/nutritional';
import { PowerUpPreparacion } from '../../../private-global/body/powerUpPreparacion/foodit';

export function BodyPrint({
    portions,
    ingredientsLists,
    nutritionLists,
    preparationElements,
    tipsAndTricks,
    includePhotos,
    renderHeadingOrList
}) {
    const hasIngredients = ingredientsLists.length > 0;
    const hasNutrition = nutritionLists.length > 0;
    const hasPreparationElements = preparationElements.length > 0;
    const hasTipsAndTricks = tipsAndTricks.length > 0;

    return (
        <section className="flex gap-32">
            <div className="bg-positive flex flex-column p-32 gap-24">
                <div className="flex ai-center gap-8 white-space-nowrap">
                    <Icon>
                        <IconSprite name="portion" />
                    </Icon>
                    <Text className="uppercase roboto roboto-bold text-12">
                        Porciones: {portions}
                    </Text>
                </div>
                {hasIngredients && (
                    <Text as="h2" className="prumo prumo-light text-28">
                        Ingredientes
                    </Text>
                )}
                {ingredientsLists.map((items, index) => (
                    <PrintIngredients
                        key={`ingredients-${items.titleList || index}`}
                        ingredientsList={items}
                    />
                ))}
                {hasNutrition && (
                    <Text as="h3" className="prumo prumo-light text-24">
                        Nutricional
                    </Text>
                )}
                <Nutritional nutritionLists={nutritionLists} />
            </div>
            <div className="flex flex-column gap-32 pt-32">
                {hasPreparationElements &&
                    preparationElements.map((preparationElement, index) => (
                        <PowerUpPreparacion
                            key={
                                preparationElement._id ||
                                `prep-element-${index}`
                            }
                            data={preparationElement}
                            includePhotos={includePhotos}
                        />
                    ))}
                {!includePhotos &&
                    hasTipsAndTricks &&
                    tipsAndTricks.map(renderHeadingOrList)}
            </div>
        </section>
    );
}
