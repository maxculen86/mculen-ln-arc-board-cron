import React from 'react';
import PropTypes from 'fusion:prop-types';
import Article from './article';
import ComTitle from '../../../common/com-title';

/**
 * TODO: DEPRECATED COMPONENT
 * @param {*} props
 */

const ArticleList = props => {
    const { articles } = props;
    return (
        <>
            {articles.length > 0 && (
                <div className="row interest" id="fin-cuerpo">
                    <ComTitle
                        tag="h4"
                        size="--l"
                        content="Te puede interesar"
                    />
                    <section
                        className="row-gap-tablet-3 row-gap-desksm-3"
                        data-is-block="true"
                        data-block-name="n_te_puede_interesar"
                        data-diagramacion-id="0"
                    >
                        {articles.map((article, index) => (
                            <Article
                                articleData={article}
                                key={article._id}
                                position={index + 1}
                            />
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
