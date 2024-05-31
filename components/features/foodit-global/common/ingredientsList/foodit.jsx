import React from 'react';
import IngredientsListHeader from './components/Header';
import IngredientsListContent from './components/Content';
import { MainWrapper } from './components/MainWrapper';
import { HeaderWrapper } from './components/HeaderWrapper';
import { ContentWrapper } from './components/ContentWrapper';

export const IngredientsList = ({ isMobile, list = [], setShoppingList }) => {
    return (
        <section className="col-span-8 col-span-7_md col-span-11_lg flex flex-column gap-32">
            {list?.map((articleIngredients, i) => {
                if (!articleIngredients) return <></>;

                const { text = '', sections = [], bookmarkId = '' } =
                    articleIngredients || {};

                return (
                    <React.Fragment key={`${bookmarkId}-list-${i}`}>
                        <MainWrapper isMobile={isMobile} visible={i === 0}>
                            <HeaderWrapper isMobile={isMobile}>
                                <IngredientsListHeader
                                    list={list}
                                    title={text}
                                    bookmarkId={bookmarkId}
                                    setShoppingList={setShoppingList}
                                />
                            </HeaderWrapper>
                            <ContentWrapper isMobile={isMobile}>
                                {sections.map((section, i) => (
                                    <IngredientsListContent
                                        key={`${bookmarkId}-ingredient-${i}`}
                                        bookmarkId={bookmarkId}
                                        {...section}
                                    />
                                ))}
                            </ContentWrapper>
                        </MainWrapper>
                        {i < list.length - 1 && <hr className="sm-only" />}
                    </React.Fragment>
                );
            })}
        </section>
    );
};
