/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import getProperties from 'fusion:properties';
import ArticleAcum from '../../acumulado/articleAcum';
import siteConfig from '../../../../../properties/sites/la-nacion-ar';
import get from '../../../common/utils/get';

function FocalFactory({
    directionFocal,
    articles = [],
    _children,
    outputType,
    boxPosition,
    handleClick,
    pageLayout
}) {
    const { layoutsName } = siteConfig;
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
            return (
                (_children && _children.length && art) || (
                    <ArticleAcum
                        article={art}
                        outputType={outputType}
                        label="Chapita"
                        artPosition={`0${index + 1}`}
                        boxPosition={boxPosition}
                        handleClick={handleClick}
                        {...(articleProps || {})}
                        {...((pageLayout === layoutsName.Home && {
                            isApertura: false
                        }) ||
                            {})}
                    />
                )
            );
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
}

export default FocalFactory;
