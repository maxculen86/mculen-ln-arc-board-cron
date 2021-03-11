import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleMain from '../../common/articleTypes/articleMain';
import withAcuArticlesData from '../../common/hocs/WithAcuArticlesData';
//import ComTitle from '../../../common/com-title';
import HeaderSection from '../../../common/mod-headerSection';

const ArticleList = props => {
    const { articles, border, outputType, title, dataBlockName } = props;
    if (!articles) return null;

    return (
        <>
            {articles.length > 0 && (
                <div className="row more-articles">
                    <div className="col-12">
                        {/* <h2 className="com-title-section-l">{title || ''}</h2> */}
                        {/* <ComTitle tag="h2" size="--l" content={title || ''} /> */}
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
    title: PropTypes.string,
    articles: PropTypes.arrayOf(PropTypes.any),
    border: PropTypes.bool,
    outputType: PropTypes.string,
    dataBlockName: PropTypes.string
};

export default withAcuArticlesData(ArticleList, null, 'm', true);
