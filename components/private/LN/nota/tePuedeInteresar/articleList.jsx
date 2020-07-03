import React from 'react';
import PropTypes from 'fusion:prop-types';
import Article from './article';
import ComTitle from '../../../common/com-title';

const ArticleList = props => {
    const { articles } = props;
    return (
        <>
            {articles.length > 0 && (
                <div className="row interest">
                    <ComTitle
                        tag="h4"
                        size="xl"
                        content={'Te puede interesar'}
                    />
                    <section className="row-gap-tablet-3 row-gap-desksm-3">
                        {articles.map(article => (
                            <Article articleData={article} key={article._id} />
                        ))}
                    </section>
                </div>
            )}
        </>
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
