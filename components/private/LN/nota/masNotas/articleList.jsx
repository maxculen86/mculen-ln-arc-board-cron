import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleMain from '../../common/articleTypes/articleMain';
import withAcuArticlesData from '../../common/hocs/WithAcuArticlesData';
import HeaderSection from '../../../common/mod-headerSection';
import filter from '../../../../../content/filters/LN/acumulado/articleMasNotas';
import addRelatedImage from '../../common/utils/addRelatedImage';

const ArticleList = props => {
    const { articles, border, outputType, title, dataBlockName } = props;
    if (!articles) return null;

    //console.log(articles[0]);
    //console.log(JSON.stringify(addRelatedImage(articles[0])));

    return (
        <>
            {articles.length > 0 && (
                <div className="row more-articles">
                    <div className="col-12">
                        <HeaderSection title={title || ''} />
                        <section
                            className="row-gap-tablet-3 row-gap-desksm-3"
                            data-is-block="true"
                            data-block-name={dataBlockName}
                            data-diagramacion-id="0"
                        >
                            {articles.length > 0 &&
                                articles.map((e, index) => (
                                    <ArticleMain
                                        articleData={e}
                                        border={border}
                                        key={e._id}
                                        outputType={outputType}
                                        position={index + 1}
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
    title: PropTypes.string.isRequired,
    articles: PropTypes.arrayOf(PropTypes.any).isRequired,
    border: PropTypes.bool.isRequired,
    outputType: PropTypes.string.isRequired,
    dataBlockName: PropTypes.string.isRequired
};

export default withAcuArticlesData(ArticleList, filter, 'm', true);
