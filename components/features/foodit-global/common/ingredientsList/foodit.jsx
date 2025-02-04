import React from 'react';
import PropTypes from 'prop-types';
// import { Icon } from '@ln/common-ui-icon';
// import { Text } from '@ln/common-ui-text';
import IngredientsListHeader from './components/Header';
import IngredientsListContent from './components/Content';
import { MainWrapper } from './components/MainWrapper';
import { HeaderWrapper } from './components/HeaderWrapper';
import { ContentWrapper } from './components/ContentWrapper';
// import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

export function IngredientsList({ list = [], setShoppingList }) {
    return (
        <section className="col-span-8 col-span-7_md col-span-11_lg flex flex-column">
            {list?.map((articleIngredients, i) => {
                if (!articleIngredients) return null;

                const {
                    text = '',
                    sections = [],
                    bookmarkId = ''
                } = articleIngredients || {};

                return (
                    <React.Fragment key={`${bookmarkId}-list`}>
                        <MainWrapper visible={i === 0}>
                            <HeaderWrapper>
                                <IngredientsListHeader
                                    list={list}
                                    title={text}
                                    bookmarkId={bookmarkId}
                                    setShoppingList={setShoppingList}
                                />
                            </HeaderWrapper>
                            <ContentWrapper>
                                {/* TODO: Add portions to the list in the future  */}
                                {/* <div className="flex ai-center gap-8 pt-24">
                                    <Icon>
                                        <IconSprite name="portion" />
                                    </Icon>
                                    <Text className="uppercase roboto roboto-bold text-14">
                                        Porciones: x
                                    </Text>
                                </div> */}
                                {sections.map(section => (
                                    <IngredientsListContent
                                        key={`${bookmarkId}-ingredient`}
                                        bookmarkId={bookmarkId}
                                        {...section}
                                    />
                                ))}
                            </ContentWrapper>
                        </MainWrapper>
                    </React.Fragment>
                );
            })}
        </section>
    );
}

IngredientsList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            typeList: PropTypes.string,
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    isMainIngredient: PropTypes.bool.isRequired,
                    amount: PropTypes.string,
                    unit: PropTypes.string.isRequired,
                    ingredient: PropTypes.string.isRequired,
                    abbreviation: PropTypes.string,
                    fullIngredientString: PropTypes.string.isRequired,
                    includeInShoppingList: PropTypes.bool.isRequired
                })
            ),
            titleList: PropTypes.string
        })
    ).isRequired,
    setShoppingList: PropTypes.func.isRequired
};
