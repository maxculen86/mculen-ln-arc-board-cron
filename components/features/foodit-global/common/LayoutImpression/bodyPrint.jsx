import React from 'react';
import PropTypes from 'prop-types';
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
    preparacionElements,
    tipsAndTricks,
    includePhotos,
    renderHeadingOrList
}) {
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
                {ingredientsLists.length > 0 && (
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
                {nutritionLists.length > 0 && (
                    <Text as="h3" className="prumo prumo-light text-24">
                        Nutricional
                    </Text>
                )}
                <Nutritional nutritionLists={nutritionLists} />
            </div>
            <div className="flex flex-column gap-32 pt-32">
                {preparacionElements.length > 0 &&
                    preparacionElements.map((preparacionElement, index) => (
                        <PowerUpPreparacion
                            key={
                                preparacionElement._id ||
                                `prep-element-${index}`
                            }
                            data={preparacionElement}
                            includePhotos={includePhotos}
                        />
                    ))}
                {!includePhotos &&
                    tipsAndTricks.length > 0 &&
                    tipsAndTricks.map(renderHeadingOrList)}
            </div>
        </section>
    );
}

BodyPrint.propTypes = {
    portions: PropTypes.string.isRequired,
    ingredientsLists: PropTypes.arrayOf(
        PropTypes.shape({
            titleList: PropTypes.string,
            items: PropTypes.arrayOf(PropTypes.string)
        })
    ).isRequired,
    nutritionLists: PropTypes.arrayOf(
        PropTypes.shape({
            titleList: PropTypes.string,
            items: PropTypes.arrayOf(PropTypes.string)
        })
    ).isRequired,
    preparacionElements: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            titleList: PropTypes.string,
            items: PropTypes.arrayOf(PropTypes.string)
        })
    ).isRequired,
    tipsAndTricks: PropTypes.arrayOf(PropTypes.node).isRequired,
    includePhotos: PropTypes.bool.isRequired,
    renderHeadingOrList: PropTypes.func.isRequired
};
