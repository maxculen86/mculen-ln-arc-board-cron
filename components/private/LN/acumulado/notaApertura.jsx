import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleAcum from './articleAcum';
import ModRowGap from '../../common/mod-rowgap';
import withCollections from './hocs/withCollections';
import useGlobalProviderAcu from './hooks/useGlobalProviderAcu';
import filter from '../../../../content/filters/LN/acumulado/articleAcu';

const NotaApertura = props => {
    const {
        setArticlesInCollection,
        articlesInCollection
    } = useGlobalProviderAcu();
    const ARTICLE_TYPE = 'Grilla';
    const DATA_SECTION = 'AperturaAcu';
    const { articles, outputType } = props;

    if (articles) setArticlesInCollection(articles);
    return (
        (articles && (
            <ModRowGap column="2" classCondition="--opening">
                {articles.map((art, i) => (
                    <ArticleAcum
                        key={art._id}
                        article={art}
                        dataSection={DATA_SECTION}
                        typeArticle={ARTICLE_TYPE}
                        outputType={outputType}
                    />
                ))}
            </ModRowGap>
        )) || <></>
    );
};

NotaApertura.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string
        })
    ).isRequired
};

export default withCollections(NotaApertura, filter);
