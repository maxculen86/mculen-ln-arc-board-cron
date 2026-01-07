import React from 'react';
import PropTypes from 'prop-types';
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

ArticleCardsList.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            headlines: PropTypes.shape({
                mobile: PropTypes.string,
                basic: PropTypes.string,
                web: PropTypes.string
            }),
            label: PropTypes.shape({
                volanta: PropTypes.shape({
                    text: PropTypes.string
                }),
                chapita: PropTypes.shape({
                    text: PropTypes.string
                })
            }),
            taxonomy: PropTypes.shape({
                tags: PropTypes.arrayOf(PropTypes.string)
            }),
            display_date: PropTypes.string,
            website_url: PropTypes.string
        })
    ).isRequired,
    getBanner: PropTypes.func.isRequired,
    isUltimasNoticias: PropTypes.bool.isRequired,
    globalContent: PropTypes.shape({
        name: PropTypes.string
    }).isRequired,
    pageBuilderLayout: PropTypes.string.isRequired
};

export default ArticleCardsList;
