import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@ln/common-ui-text';
import { Logo } from '@ln/foodit-ui-logo';
import { List } from '@ln/foodit-ui-list';
import {
    getFooditAuthor,
    getHighestPriorityTag
} from '../utils/notaFooditHelper';
import { TimePrint } from '../TimePrint/TimePrint';
import get from '../../../../private/common/utils/get';
import { getListsFromPowerup } from '../../Body/PowerupsReceta/_helper';
import { OpeningPrint } from './openginPrint';
import { BodyPrint } from './bodyPrint';

export const FooditPrint = React.forwardRef(
    ({ includePhotos, article }, ref) => {
        const titleRecipe = get(article, 'headlines.basic', '');
        const authorRecipe = getFooditAuthor(article);
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
                content?.type === 'header' ||
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
                        preparacionElements={preparacionElements}
                        tipsAndTricks={tipsAndTricks}
                        includePhotos={includePhotos}
                        renderHeadingOrList={renderHeadingOrList}
                    />
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
            }),
            basic: PropTypes.shape({
                url: PropTypes.string,
                caption: PropTypes.string
            })
        })
    }).isRequired
};
