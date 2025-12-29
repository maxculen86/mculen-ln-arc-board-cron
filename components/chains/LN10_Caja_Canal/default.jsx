/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import {
    getMarkupForDatalayer,
    getArticlesOfChain,
    getCommonProps
} from '../../private/LN/common/utils/cajaTemasHelper';
import getDataChainCollection from '../utils/getDataChainCollection';
import getArticleInCollection from '../../private/LN/common/hooks/useGetArticleInCollection';
import { validateChain } from '../LN10_Caja_Collection/common/_helper-WebApi';
import setCommonCustomFields from '../utils/setCommonCustomFields';
import diagramationRules from '../../private/common/utils/diagramationRules';
import setRender from '../utils/setRender';
import getGridType from '../utils/getGridType';
import CommonCollection from '../../private/LN10/home/components/CommonCollection/default';
import { useRoofData } from '../utils/_helpers';
import StaticContentV2 from '../LN10-global/staticContentV2';
import getViewabilityRoof from '../utils/getViewabilityRoof';
import getImageConfigByCollections from '../utils/getImageConfigByCollections';

function CajaCanal(props) {
    const {
        id: chainId,
        isAdmin,
        customFields,
        renderables,
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

    const viewabilityRoof = getViewabilityRoof(
        chainId,
        renderables,
        propsForRoof
    );

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

    const rules = diagramationRules(layout) || [];

    const imagesConfigByCollections = getImageConfigByCollections(rules);

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
              staticMode: isHome,
              imagesConfigByCollections
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
        chainStyle
    });

    const roofData = useRoofData({
        ...propsForRoof,
        isAdmin,
        chainStyle,
        isStatic: true,
        shouldLoadRoof: !hideCaja
    });

    const { extraOptsDiv, extraOpts: viewabilityData } = getMarkupForDatalayer(
        '',
        layout,
        position,
        '',
        positionInsideSection,
        false,
        false,
        viewabilityRoof
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
                        <CommonCollection
                            roofData={roofData}
                            rules={rules}
                            gridType={getGridType(layout)}
                            articles={_articles}
                            layout={layout}
                            position={position}
                        />
                    )
                }
            })}
        </StaticContentV2>
    );
}

CajaCanal.label = 'LN10 Caja Canal';

CajaCanal.propTypes = {
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
        ...setCommonCustomFields('cajaCanal')
    }),
    tree: PropTypes.shape(PropTypes.node),
    globalContent: PropTypes.shape({
        name: PropTypes.string
    })
};

export default Consumer(CajaCanal);
