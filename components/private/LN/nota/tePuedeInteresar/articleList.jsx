import React from 'react';
import PropTypes from 'fusion:prop-types';
import Article from './article';

const ArticleList = props => {
    const { articles } = props;
    return (
        <div className="row interest">
            <h4 className="com-title-section-xl">Te puede interesar</h4>
            <section className="row-gap-tablet-3 row-gap-desksm-3">
                {articles.map(article => (
                    <Article articleData={article} key={article.url} />
                ))}
            </section>
        </div>
    );
};

ArticleList.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(['story'])
        })
    ).isRequired
};

export default ArticleList;
