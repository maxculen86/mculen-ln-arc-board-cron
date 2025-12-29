/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { Bannersubscriber } from '@ln/contenidos-ui-bannersubscriber';
import {
    getArticlesOfChain,
    getCommonProps,
    getMarkupForDatalayer
} from '../../private/LN/common/utils/cajaTemasHelper';
import { CHAIN_STYLE, LAYOUTS } from '../utils/common/_helpers-WebApi';
import getDataChainCollection from '../utils/getDataChainCollection';
import checkChildInSection from '../utils/checkChildBySection';
import getArticleInCollection from '../../private/LN/common/hooks/useGetArticleInCollection';
import {
    validateChain,
    getBreakingChildren,
    filteredChildren,
    assignPropsToChildren
} from './common/_helper-WebApi';
import setCommonCustomFields from '../utils/setCommonCustomFields';
import setRender from '../utils/setRender';
import getGridType from '../utils/getGridType';
import getComponent from '../utils/getComponent';
import CommonCollection from '../../private/LN10/home/components/CommonCollection/default';
import { useRoofData } from '../utils/_helpers';
import getDynamicBanners from '../../private/common/banners/dynamicBanners/getDynamicBanners';
import isContentLabAt100 from '../utils/isContentLabAt100';
import bannersHome from '../../private/common/banners/bannersDivHome';
import StaticContentV2 from '../LN10-global/staticContentV2';
import CajaFooditEventScript from '../../private/common/scriptManager/scriptDataLayerCajaFoodit';
import getViewabilityRoof from '../utils/getViewabilityRoof';
import siteConfig from '../../../properties/sites/la-nacion-ar';
import getImageConfigByCollections from '../utils/getImageConfigByCollections';
import { diagramationRulesCustomOptions } from './common/helpers';
import diagramationRules from '../../private/common/utils/diagramationRules';

const { BN_6_GRID_MAS_TIMELINE } = LAYOUTS;

function CajaCollection(props) {
    const { layoutsName = {} } = siteConfig || {};
    const {
        id: chainId,
        isAdmin,
        customFields,
        renderables = [],
        tree = {},
        layout: pageLayout,
        children,
        childProps
    } = props;

    const {
        idCollection,
        layout = '',
        initialPosition,
        hideCaja,
        website,
        chainStyle,
        ...propsForRoof
    } = customFields;

    const {
        collectionsInPage,
        notesQuantity,
        position,
        positionInsideSection
    } = getCommonProps(props);

    const viewabilityRoof = getViewabilityRoof(
        chainId,
        renderables,
        propsForRoof
    );

    const {
        isInSiteService,
        articlesFromCollectionSiteService,
        idsArticlesToExclude,
        diagramation
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

    const customOptions = diagramationRulesCustomOptions({
        layout,
        pageLayout,
        layoutsName
    });

    const breakingsChildren = getBreakingChildren(renderables);

    const rules = diagramationRules(layout, customOptions) || [];

    const imagesConfigByCollections = getImageConfigByCollections(rules);

    const isInBreakings = checkChildInSection(chainId, breakingsChildren);

    const isFoodit = chainStyle === CHAIN_STYLE.FOODIT;

    const isGrid6MasTimeline = layout === BN_6_GRID_MAS_TIMELINE;

    const articlesToShow = !isInSiteService
        ? getArticleInCollection({
              notesQuantity: rules.length || notesQuantity,
              diagramation,
              idCollection,
              size: 20,
              initialPosition: Number(initialPosition) - 1,
              idCollectionsInPage: idsArticlesToExclude,
              filterRecomendar: true,
              filterRepetead: !isInSiteService,
              layout,
              imagesConfigByCollections,
              website: isFoodit ? 'foodit' : 'la-nacion-ar',
              staticMode: true
          })
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
        chainStyle,
        isInBreakings,
        isGrid6MasTimeline
    });

    const roofData = useRoofData({
        ...propsForRoof,
        isAdmin,
        chainStyle,
        isStatic: true,
        shouldLoadRoof: !hideCaja
    });

    const isExclusiveSub = chainStyle === CHAIN_STYLE.SUB_EXCLUSIVE;

    const { extraOptsDiv, extraOpts: viewabilityData } = getMarkupForDatalayer(
        '',
        layout,
        position,
        '',
        positionInsideSection,
        isExclusiveSub,
        isFoodit,
        viewabilityRoof
    );

    const { bannerMob = undefined, bannerDsk = undefined } =
        getDynamicBanners({
            renderables,
            featureId: chainId
        }) || {};

    const ContainerCards = getComponent(chainStyle, layout);

    const filterTimeline = filteredChildren(
        assignPropsToChildren(children, childProps)
    );

    return (
        <StaticContentV2 {...{ ...extraOptsDiv, id: chainId }}>
            {setRender({
                chainId,
                viewabilityData,
                isAdmin,
                error,
                hideBox: hideCaja,
                extraOptions: {
                    default: (
                        <>
                            {bannerDsk}
                            <CommonCollection
                                roofData={roofData}
                                rules={rules}
                                gridType={getGridType(layout)}
                                articles={_articles}
                                layout={layout}
                                ContainerCards={ContainerCards}
                                position={position}
                                isContentLab100={isContentLabAt100(
                                    chainId,
                                    layout,
                                    renderables
                                )}
                                isExclusiveSub={isExclusiveSub}
                                isFoodit={isFoodit}
                            >
                                {isGrid6MasTimeline
                                    ? filterTimeline?.nodo
                                    : null}
                            </CommonCollection>
                            {chainStyle === CHAIN_STYLE.SUB_EXCLUSIVE && (
                                <Bannersubscriber>
                                    {bannersHome.suscriptor}
                                </Bannersubscriber>
                            )}
                            {bannerMob}
                        </>
                    )
                }
            })}
            {isFoodit && <CajaFooditEventScript />}
        </StaticContentV2>
    );
}

CajaCollection.label = 'LN10 Caja Collection';

CajaCollection.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool,
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
