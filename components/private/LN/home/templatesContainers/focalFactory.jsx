import React from 'react';
import PropTypes from 'fusion:prop-types';
import getProperties from 'fusion:properties';
import ArticleAcum from '../../acumulado/articleAcum';
import get from '../../../common/utils/get';

const FocalFactory = ({
    directionFocal,
    articles = [],
    _children,
    outputType
}) => {
    const articleList =
        (_children && _children.length && _children) ||
        (articles && articles.length && articles) ||
        [];

    if (
        articleList.length < 2 ||
        (directionFocal === 'focalLeft3' && articleList.length < 3)
    )
        return null;

    const { cajaTemaConfig } = getProperties('la-nacion-ar');
    const manualArticles =
        articleList &&
        articleList.length &&
        articleList.map((art, index) => {
            const articleProps = get(
                cajaTemaConfig,
                `${directionFocal}.articles[${index}]`,
                null
            );
            const comp = (_children && _children.length && art) || (
                <ArticleAcum
                    article={{ ...art, display_date: '' }}
                    outputType={outputType}
                    label="Chapita"
                    {...(articleProps || {})}
                />
            );
            return comp;
        });

    return (
        (articleList && articleList.length && (
            <>
                <div className="col-tablet-8">{manualArticles[0]}</div>
                <div className="col-tablet-4">
                    {manualArticles[1]}
                    {directionFocal === 'focalLeft3' && manualArticles[2]}
                </div>
            </>
        )) ||
        null
    );
};

FocalFactory.propTypes = {
    directionFocal: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired,
    articles: PropTypes.arrayOf(PropTypes.node).isRequired,
    _children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default FocalFactory;
