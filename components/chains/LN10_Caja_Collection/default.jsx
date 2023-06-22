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
import { CHAIN_STYLE } from '../utils/common/_helpers-WebApi';
import getDataChainCollection from '../utils/getDataChainCollection';
import checkChildInSection from '../utils/checkChildBySection';
import getArticleInCollection from '../../private/LN/common/hooks/useGetArticleInCollection';
import { validateChain, getBreakingChildren } from './common/_helper-WebApi';
import setCommonCustomFields from '../utils/setCommonCustomFields';
import diagramationRules from '../../private/common/utils/diagramationRules';
import setRender from '../utils/setRender';
import StaticContent from '../../private/common/staticContent';
import getGridType from '../utils/getGridType';
import getComponent from '../utils/getComponent';
import CommonCollection from '../../private/LN10/home/components/CommonCollection/default';
import { useRoofData } from '../utils/_helpers';
import getDynamicBanners from '../../private/common/banners/dynamicBanners/getDynamicBanners';
import DivBannerSSR from '../../private/common/banners/DivBannerSSR';
import isContentLabAt100 from '../utils/isContentLabAt100';

const CajaCollection = props => {
    const {
        id: chainId,
        isAdmin,
        customFields,
        renderables = [],
        tree = {},
        layout: pageLayout
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

    const roofData = useRoofData({ ...propsForRoof, isAdmin, chainStyle });

    const {
        isInSiteService,
        articlesFromCollectionSiteService,
        idsArticlesToExclude,
        diagramation,
        isHome,
        shouldUseV2
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
              website,
              hasHydrateOnly: isHome,
              shouldUseV2
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
        isInBreakings
    });

    const { extraOptsDiv, extraOpts: viewabilityData } = getMarkupForDatalayer(
        '',
        layout,
        position,
        '',
        positionInsideSection
    );

    const { bannerMob = undefined, bannerDsk = undefined } =
        getDynamicBanners({
            renderables,
            featureId: chainId
        }) || {};

    const ContainerCards = getComponent(chainStyle, layout);

    const bannersCajaSuscriptor = (
        <>
            <DivBannerSSR
                bannerConfiguration={{
                    slotId: 'cajasuscriptores_dsk',
                    isStatic: true,
                    lazyClass: 'lazy'
                }}
            />
            <DivBannerSSR
                bannerConfiguration={{
                    slotId: 'cajasuscriptores_mob',
                    isStatic: true,
                    lazyClass: 'lazy'
                }}
            />
            <DivBannerSSR
                bannerConfiguration={{
                    slotId: 'cajasuscriptores_tab',
                    isStatic: true,
                    lazyClass: 'lazy'
                }}
            />
        </>
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
                                isExclusiveSub={
                                    chainStyle === CHAIN_STYLE.SUB_EXCLUSIVE
                                }
                            />
                            {chainStyle === CHAIN_STYLE.SUB_EXCLUSIVE && (
                                <Bannersubscriber>
                                    {bannersCajaSuscriptor}
                                </Bannersubscriber>
                            )}
                            {bannerMob}
                        </>
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
