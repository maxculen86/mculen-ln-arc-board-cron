import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@ln/foodit-ui-badge';
import { Text } from '@ln/common-ui-text';
import { Logo } from '@ln/foodit-ui-logo';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { cx } from '@ln/cva';
import { List } from '@ln/foodit-ui-list';
import { Icon } from '@ln/common-ui-icon';
import { TimePrint } from '../../features/foodit-global/common/TimePrint/TimePrint';
import get from '../../private/common/utils/get';
import { getListsFromPowerup } from '../../features/foodit-global/Body/PowerupsReceta/_helper';
import PrintIngredients from '../../features/foodit-global/common/PrintIngredients/foodit';
import { Nutritional } from '../../features/foodit-global/Body/PowerupsReceta/ingredientsBox/nutritional';
import { getHighestPriorityTag } from '../../features/foodit-global/common/utils/notaFooditHelper';
import { PowerUpPreparacion } from '../../features/private-global/body/powerUpPreparacion/foodit';
import IconSprite from '../../features/private-global/common/iconSprite/IconSprite';

export const FooditPrint = React.forwardRef(
    ({ includePhotos, article }, ref) => {
        const titleRecipe = get(article, 'headlines.basic', '');
        const authorRecipe = get(article, 'credits.by[0].name', '');
        const promoItemsRecipe = get(
            article,
            'promo_items.receta.embed.config',
            {}
        );
        const portions = get(promoItemsRecipe, 'counterPortion', '');
        const prepTime = get(promoItemsRecipe, 'prepTime', '');
        const cookTime = get(promoItemsRecipe, 'cookTime', '');
        const counterTime = get(promoItemsRecipe, 'counterTime', '');
        const contentElements = get(article, 'content_elements', []);
        const { ingredientsLists, nutritionLists } =
            getListsFromPowerup(contentElements);
        const sections = get(article, 'taxonomy.sections', []);
        const badge = getHighestPriorityTag(sections);
        const mainImage = get(article, 'promo_items.basic.url', '');
        const imageCaption = get(article, 'promo_items.basic.caption', '');
        const preparacionElements = contentElements.filter(
            content =>
                content?.subtype === 'custom-preparacion' ||
                content?.type === 'list' ||
                content?.type === 'image'
        );
        const tipsAndTricks = contentElements.filter(
            content => content?.type === 'header' || content?.type === 'list'
        );

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
                        {element.items?.map(item => (
                            <List.Item
                                key={`${element._id}-item`}
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

        const className = cx(
            'w-100 bg-light-1 border border-bottom border-thin border-light-100'
        );
        return (
            <section
                ref={ref}
                data-testid="foodit-print"
                className="pt-32 px-32 w-100"
            >
                <div className="flex flex-column jc-center border border-bottom border-thin border-light-100 w-100 ai-center w-100 text-center pb-16 mb-16">
                    <Logo
                        variant="row"
                        classNameSvgAnimated="h-40"
                        classNameSvgText="h-20"
                    />
                </div>
                <div className="relative w-100">
                    {includePhotos && (
                        <Adaptableimage
                            className="w-100 ratio-3-2"
                            src={mainImage}
                            alt={imageCaption}
                        />
                    )}

                    <section className={className}>
                        <div className="w-100 flex flex-column jc-center ai-center px-32 py-40 gap-12">
                            {badge && <Badge>{badge}</Badge>}
                            <div className="flex flex-column gap-24">
                                <Text
                                    className="prumo text-48 text-center"
                                    text={titleRecipe}
                                    as="h1"
                                />
                                {authorRecipe && (
                                    <Text
                                        className="text-14 text-center"
                                        text={`Por ${authorRecipe}`}
                                        as="p"
                                    />
                                )}
                            </div>
                        </div>
                    </section>
                </div>
                <article className="flex flex-column jc-center ai-center gap-40 jc-center pt-40">
                    <div className="w-100 mx-78">
                        <TimePrint
                            cookTime={cookTime}
                            prepTime={prepTime}
                            counterTime={counterTime}
                        />
                    </div>
                    <section className="flex gap-32">
                        <div className="bg-positive flex flex-column p-32 gap-24">
                            <div className="flex ai-center gap-8">
                                <Icon>
                                    <IconSprite name="portion" />
                                </Icon>
                                <Text className="uppercase roboto roboto-bold text-12">
                                    Porciones: {portions}
                                </Text>
                            </div>
                            {ingredientsLists.length > 0 && (
                                <Text
                                    as="h2"
                                    className="prumo prumo-light text-28"
                                >
                                    Ingredientes
                                </Text>
                            )}
                            {ingredientsLists.map(items => (
                                <PrintIngredients
                                    key={`ingredients-${items.titleList}`}
                                    ingredientsList={items}
                                />
                            ))}
                            {nutritionLists.length > 0 && (
                                <Text
                                    as="h3"
                                    className="prumo prumo-light text-24"
                                >
                                    Nutricional
                                </Text>
                            )}
                            <Nutritional nutritionLists={nutritionLists} />
                        </div>
                        <div className="flex flex-column gap-32 pt-32">
                            {preparacionElements.length > 0 &&
                                preparacionElements.map(preparacionElement => (
                                    <PowerUpPreparacion
                                        key={preparacionElement._id}
                                        data={preparacionElement}
                                        includePhotos={includePhotos}
                                    />
                                ))}
                            {!includePhotos &&
                                tipsAndTricks.length > 0 &&
                                tipsAndTricks.map(renderHeadingOrList)}
                        </div>
                    </section>
                </article>
            </section>
        );
    }
);

FooditPrint.propTypes = {
    includePhotos: PropTypes.bool.isRequired,
    article: PropTypes.shape({
        content_elements: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                subtype: PropTypes.string,
                type: PropTypes.string,
                content: PropTypes.string,
                items: PropTypes.arrayOf(
                    PropTypes.shape({
                        content: PropTypes.string
                    })
                )
            })
        ),
        taxonomy: PropTypes.shape({
            sections: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string
                })
            )
        }),
        headlines: PropTypes.shape({
            basic: PropTypes.string
        }),
        credits: PropTypes.shape({
            by: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string
                })
            )
        }),
        promo_items: PropTypes.shape({
            receta: PropTypes.shape({
                embed: PropTypes.shape({
                    config: PropTypes.shape({
                        counterPortion: PropTypes.number,
                        prepTime: PropTypes.number,
                        cookTime: PropTypes.number,
                        counterTime: PropTypes.number
                    })
                })
            })
        })
    }).isRequired
};
