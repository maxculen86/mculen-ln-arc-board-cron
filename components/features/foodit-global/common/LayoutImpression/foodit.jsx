import React from 'react';
import { Text } from '@ln/common-ui-text';
import { Logo } from '@ln/foodit-ui-logo';
import { List } from '@ln/foodit-ui-list';
import {
    getFooditAuthor,
    getHighestPriorityTag
} from '../utils/notaFooditHelper';
import { TimePrint } from '../TimePrint/TimePrint';
import { getListsFromPowerup } from '../../Body/PowerupsReceta/_helper';
import { OpeningPrint } from './openginPrint';
import { BodyPrint } from './bodyPrint';
import { useRecipeElements } from './hooks/useRecipeElements';

export const FooditPrint = React.forwardRef(
    ({ includePhotos, article }, ref) => {
        const {
            headlines: { basic: titleRecipe = '' } = {},
            promo_items: {
                receta: { embed: { config: promoItemsRecipe = {} } = {} } = {},
                basic: { url: mainImage = '', caption: imageCaption = '' } = {}
            } = {},
            taxonomy: { sections = [] } = {},
            content_elements: contentElements = []
        } = article || {};
        const authorRecipe = getFooditAuthor(article);
        const {
            counterPortion: portions = '',
            prepTime = '',
            cookTime = '',
            counterTime = ''
        } = promoItemsRecipe;
        const { ingredientsLists, nutritionLists } =
            getListsFromPowerup(contentElements);
        const badge = getHighestPriorityTag(sections);
        const { preparationElements, tipsAndTricks } =
            useRecipeElements(contentElements);

        const renderHeadingOrList = element => {
            if (element.type === 'header') {
                return (
                    <Text
                        as="h4"
                        className="roboto-bold text-16 text-18_md"
                        key={element._id}
                    >
                        <span
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                                __html: element.content
                            }}
                        />
                    </Text>
                );
            }
            if (element.type === 'list') {
                return (
                    <List
                        key={element._id}
                        variant={element.list_type || 'unordered'}
                    >
                        {element.items?.map((item, itemIndex) => (
                            <List.Item
                                key={`${element._id}-${item.id || itemIndex}`}
                                dangerouslySetInnerHTML={{
                                    __html: item.content
                                }}
                            />
                        ))}
                    </List>
                );
            }
            return null;
        };

        return (
            <section
                ref={ref}
                data-testid="foodit-print"
                className="pt-32 px-32 w-100"
            >
                <div className="flex flex-column jc-center border border-bottom border-thin border-light-100 w-100 ai-center text-center pb-16 mb-16">
                    <Logo
                        variant="row"
                        classNameSvgAnimated="h-40"
                        classNameSvgText="h-20"
                    />
                </div>
                <OpeningPrint
                    includePhotos={includePhotos}
                    mainImage={mainImage}
                    imageCaption={imageCaption}
                    titleRecipe={titleRecipe}
                    authorRecipe={authorRecipe}
                    badge={badge}
                />
                <article className="flex flex-column jc-center ai-center gap-40 jc-center pt-40">
                    <div className="w-100 mx-78">
                        <TimePrint
                            cookTime={cookTime}
                            prepTime={prepTime}
                            counterTime={counterTime}
                        />
                    </div>
                    <BodyPrint
                        portions={portions}
                        ingredientsLists={ingredientsLists}
                        nutritionLists={nutritionLists}
                        preparationElements={preparationElements}
                        tipsAndTricks={tipsAndTricks}
                        includePhotos={includePhotos}
                        renderHeadingOrList={renderHeadingOrList}
                    />
                </article>
            </section>
        );
    }
);
