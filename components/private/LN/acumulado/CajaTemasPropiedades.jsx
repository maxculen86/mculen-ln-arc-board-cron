import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleAcum from './articleAcum';
import ModRowGap from '../../common/mod-rowgap';
import withCollections from './hocs/withCollections';
import filter from '../../../../content/filters/LN/acumulado/articleAcu';
import ComTitle from '../../common/com-title';

const validate = articles => {
    if (!articles) return false;
    if (articles.length < 2) return false;
    return true;
};

const CajaTemasPropiedades = props => {
    const ARTICLE_TYPE = 'Grilla';
    const DATA_SECTION = 'AperturaAcu';
    const { articles = [], outputType, title, url } = props;

    if (!validate(articles)) return null;
    const articlesToShow =
        articles.length >= 3 && articles.length < 6
            ? articles.slice(0, 3)
            : articles.slice(0, 6);

    return (
        <>
            <ComTitle tag="h4" content={title} link={url} />
            <ModRowGap>
                {articlesToShow.map((art, i) => {
                    const artWithoutDate = { ...art, display_date: '' };
                    return (
                        <ArticleAcum
                            key={artWithoutDate._id}
                            article={artWithoutDate}
                            dataSection={DATA_SECTION}
                            typeArticle={ARTICLE_TYPE}
                            outputType={outputType}
                        />
                    );
                })}
            </ModRowGap>
        </>
    );
};

CajaTemasPropiedades.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string
        })
    ).isRequired,
    outputType: PropTypes.string.isRequired,
    title: PropTypes.string,
    url: PropTypes.string
};

export default withCollections(CajaTemasPropiedades, filter);
