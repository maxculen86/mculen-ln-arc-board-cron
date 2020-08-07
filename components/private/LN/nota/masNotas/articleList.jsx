import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleMain from '../../common/articleTypes/articleMain';
import withAcuArticlesData from '../../common/hocs/WithAcuArticlesData';
import ComTitle from '../../../common/com-title';

const ArticleList = props => {
    const { articles, border, outputType, title } = props;
    if (!articles) return null;

    return (
        <>
            {articles.length > 0 && (
                <div className="row more-articles">
                    <div className="col-12">
                        {/* <h2 className="com-title-section-l">{title || ''}</h2> */}
                        <ComTitle tag="h2" size="--l" content={title || ''} />
                        <section className="row-gap-tablet-3 row-gap-desksm-3">
                            {articles.length > 0 &&
                                articles.map(e => (
                                    <ArticleMain
                                        articleData={e}
                                        border={border}
                                        key={e._id}
                                        outputType={outputType}
                                    />
                                ))}
                        </section>
                    </div>
                </div>
            )}
        </>
    );
};

ArticleList.propTypes = {
    title: PropTypes.string,
    articles: PropTypes.arrayOf(PropTypes.any),
    border: PropTypes.bool,
    outputType: PropTypes.string
};

export default withAcuArticlesData(ArticleList, null, 'notaM', true);
