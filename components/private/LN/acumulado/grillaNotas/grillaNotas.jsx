/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import ArticlesAcum from '../articlesAcum';
import BtnMasNotas from '../botonVerMasNotas';
import LoadingIcon from '../../common/loadingIcon';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import Banner from './banner';
import useGetArticlesFromAcumSource from '../../common/hooks/useGetArticlesFromAcumSource';

const useGridArticles = props => {
    const {
        globalContent = {},
        idsArticlesToExclude = [],
        website,
        sectionId,
        sectionsIds,
        sourceOrigin,
        tagId,
        distributorId,
        size,
        excludeSectionId,
        authorId,
        page
    } = props;

    const searchArgs = {
        typesOfQuery: {
            sectionId: excludeSectionId ? null : sectionId,
            authorId,
            tagId,
            distributorId,
            sectionsIds
        },
        filter,
        imageConfig: 'boxArticles',
        size: size.tripleSize || size,
        sourceOrigin,
        excludeSectionId,
        type: globalContent.type,
        shouldNotFilter: false,
        website,
        promoItemsOnly: false,
        staticMode: false,
        collectionId: false,
        withPagination: true,
        page
    };

    const { articles, moreArticles } =
        useGetArticlesFromAcumSource(...Object.values(searchArgs)) || {};

    const articlesInNoCollection =
        (articles &&
            articles.filter(
                art => !idsArticlesToExclude.some(idArt => idArt === art._id)
            )) ||
        [];

    const bannerConfig = getBannerConfig(customFields);

    return [
        {
            page,
            articles: [...articles, ...articlesInNoCollection],
            moreArticles
        }
    ];
};

const GrillaNotas = props => {
    const {
        globalContent = {},
        loading,
        typeArticle,
        outputType,
        idsArticlesToExclude = [],
        articlesInCollection = []
    } = props;

    const [articlesGrid] = useGridArticles(props);

    const { articles, moreArticles } = articlesGrid;

    const bannerProps = {
        bannerConfig,
        globalContentConfig,
        outputType,
        globalContent
    };

    const getBanner = Banner(bannerProps);

    return (
        <>
            <ArticlesAcum
                getBanner={getBanner}
                articles={articles}
                typeArticle={typeArticle}
                classCondition={moreArticles > 0 && 'hlp-degrade'}
                outputType={outputType}
                nodeType={globalContent.node_type}
                articlesInCollection={articlesInCollection}
            />

            {outputType !== 'amp' && moreArticles > 0 && (
                <section className="row">
                    <BtnMasNotas
                        onClickHandler={() => {}}
                        name={globalContent.name || ''}
                        loadingIcon={<LoadingIcon />}
                        loading={loading}
                    />
                </section>
            )}
        </>
    );
};

GrillaNotas.propTypes = {
    typeArticle: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        name: PropTypes.string
    }).isRequired,
    globalContentConfig: PropTypes.shape({
        query: PropTypes.shape({
            id: PropTypes.string
        })
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    bannerConfig: PropTypes.arrayOf(
        PropTypes.shape({
            background: PropTypes.bool,
            position: PropTypes.number,
            sticky: PropTypes.bool,
            tablet: PropTypes.string
        })
    ).isRequired,
    articlesInCollection: PropTypes.arrayOf(PropTypes.object)
};

export default Consumer(GrillaNotas);
