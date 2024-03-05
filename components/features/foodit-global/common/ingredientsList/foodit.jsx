import React from 'react';
import IngredientsListHeader from './components/Header';
import IngredientsListContent from './components/Content';
import { MainWrapper } from './components/MainWrapper';
import { HeaderWrapper } from './components/HeaderWrapper';
import { ContentWrapper } from './components/ContentWrapper';

export const IngredientsList = ({ isMobile, list = [] }) => {
    return (
        <section className="col-span-8 col-span-7_md col-span-11_lg flex flex-column gap-24">
            {list?.map(({ text, sections }, i) => (
                <React.Fragment key={i}>
                    <MainWrapper isMobile={isMobile} visible={i === 0}>
                        <HeaderWrapper isMobile={isMobile}>
                            <IngredientsListHeader title={text} />
                        </HeaderWrapper>
                        <ContentWrapper isMobile={isMobile}>
                            {sections.map((section, i) => (
                                <IngredientsListContent key={i} {...section} />
                            ))}
                        </ContentWrapper>
                    </MainWrapper>
                    {i < list.length - 1 && <hr className="sm-only" />}
                </React.Fragment>
            ))}
        </section>
    );
};
