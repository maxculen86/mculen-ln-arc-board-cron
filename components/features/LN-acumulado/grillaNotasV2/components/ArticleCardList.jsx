import React from 'react';
import { Card } from '@ln/contenidos-ui-card';
import { getCardPropsFromArticle } from '../_helpers';
import { DateTime } from './DateTime';

function ArticleCardsList({
    articles,
    isUltimasNoticias = false,
    getBanner,
    globalContent,
    pageBuilderLayout
}) {
    return (
        <div className="grid grid-cols-1 grid-cols-3_m gap-16 gap-24_m gap-32_lg">
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
                        dateTime={
                            <DateTime
                                isoDate={cardProps?.isoDate}
                                displayDate={cardProps?.displayDate}
                            />
                        }
                    >
                        {banner}
                    </Card>
                );
            })}
        </div>
    );
}

export default ArticleCardsList;
