import React from 'react';
import { Card } from '@ln/contenidos-ui-card';
import { getCardPropsFromArticle } from '../_helpers';

function ArticleCardsList({
    articles,
    isUltimasNoticias = false,
    getBanner,
    globalContent,
    pageBuilderLayout
}) {
    return (
        <>
            {articles.map((article, index) => {
                const cardProps = getCardPropsFromArticle(
                    article,
                    isUltimasNoticias,
                    globalContent,
                    pageBuilderLayout
                );
                const banner = getBanner ? getBanner(index) : null;

                return (
                    <Card
                        {...cardProps}
                        variant="regular"
                        titleTag="h2"
                        cardSize="m-l"
                    >
                        {banner}
                    </Card>
                );
            })}
        </>
    );
}

export default ArticleCardsList;
