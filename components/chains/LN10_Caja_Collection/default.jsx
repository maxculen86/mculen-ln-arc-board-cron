/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import '../../../resources/packages/css/@ln/contenidos-ui-bngrid/index.css';
import {
    getArticlesOfChain,
    getCommonProps
} from '../../private/LN/common/utils/cajaTemasHelperLN10';
import { getMarkupForDatalayer } from '../../private/LN/common/utils/cajaTemasHelper';
import getDataChainCollection from '../utils/getDataChainCollection';
import checkChildInSection from '../utils/checkChildBySection';
import getArticleInCollection from '../../private/LN/common/hooks/useGetArticleInCollection';
import { validateChain, getBreakingChildren } from './_helper';
import setCommonCustomFields from '../utils/setCommonCustomFields';
import diagramationRules from '../../private/common/utils/diagramationRules';
import setRender from '../utils/setRender';
import StaticContent from '../../private/common/staticContent';
import getGridType from '../utils/getGridType';
import CommonCollection from '../../private/LN10/home/components/CommonCollection/default';

const CajaCollection = props => {
    const {
        id: chainId,
        isAdmin,
        customFields: {
            idCollection,
            title,
            layout = '',
            initialPosition,
            hideTitle,
            hideCaja,
            website,
            chainStyle,
            link,
            logoId,
            navigator,
            buttonText,
            linkButton,
            buttonStyle
        },
        renderables,
        tree = {},
        layout: pageLayout
    } = props;

    const {
        collectionsInPage,
        notesQuantity,
        position,
        positionInsideSection
    } = getCommonProps(props);

    const roofData = {
        title,
        titleLink: link,
        logoId,
        buttonText,
        linkButton,
        buttonStyle,
        hideRoof: hideTitle,
        navigationId: navigator,
        isAdmin,
        chainStyle
    };

    const {
        isInSiteService,
        articlesFromCollectionSiteService,
        idsArticlesToExclude,
        diagramation,
        isHome
    } = getDataChainCollection({
        idCollection,
        pageLayout,
        renderables,
        layout,
        initialPosition,
        collectionsInPage,
        tree,
        notesQuantity,
        featureId: chainId
    });

    const breakingsChildren = getBreakingChildren(renderables);
    const rules = diagramationRules(layout) || [];
    const isInBreakings = checkChildInSection(chainId, breakingsChildren);

    const articlesToShow = !isInSiteService
        ? getArticleInCollection(
              rules.length || notesQuantity,
              diagramation,
              idCollection,
              20,
              Number(initialPosition) - 1,
              idsArticlesToExclude,
              true,
              !isInSiteService,
              layout,
              website,
              isHome
          )
        : [];

    const _articles = getArticlesOfChain({
        isInSiteService,
        articlesFromCollectionSiteService,
        articlesToShow
    });

    const error = validateChain({
        idCollection,
        renderables,
        layout,
        articles: _articles,
        chainId,
        isInBreakings
    });

    const { extraOptsDiv, extraOpts: viewabilityData } = getMarkupForDatalayer(
        '',
        layout,
        position,
        '',
        positionInsideSection
    );

    return (
        <StaticContent {...extraOptsDiv}>
            {setRender({
                chainId,
                viewabilityData,
                isAdmin,
                error,
                hideBox: hideCaja,
                extraOptions: {
                    default: (
                        <CommonCollection
                            roofData={roofData}
                            rules={rules}
                            gridType={getGridType(layout)}
                            articles={_articles}
                            layout={layout}
                        />
                    )
                }
            })}
        </StaticContent>
    );
};

CajaCollection.label = 'LN10 Caja Collection';

CajaCollection.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool,
    outputType: PropTypes.string,
    renderables: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string,
            props: PropTypes.shape({
                customFields: PropTypes.shape({
                    layout: PropTypes.string,
                    idCollection: PropTypes.string,
                    initialPosition: PropTypes.number
                })
            })
        })
    ),
    customFields: PropTypes.shape({
        ...setCommonCustomFields('cajaCollection')
    }),
    tree: PropTypes.shape(PropTypes.node),
    globalContent: PropTypes.shape({
        name: PropTypes.string
    })
};

export default Consumer(CajaCollection);
