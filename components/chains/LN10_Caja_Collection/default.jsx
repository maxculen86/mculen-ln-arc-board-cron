/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import '../../../resources/packages/css/@ln/contenidos-ui-bngrid/index.css';
import CajaTema from '../../private/LN/common/cajaTema';
import {
    getArticlesOfChain,
    getCommonProps,
    isInApertura
} from '../../private/LN/common/utils/cajaTemasHelperLN10';
import { getMarkupForDatalayer } from '../../private/LN/common/utils/cajaTemasHelper';
import { productClickFromClient } from '../../private/common/utils/viewability';
import getDataChainCollection from '../utils/getDataChainCollection';
import getArticleInCollection from '../../private/LN/common/hooks/useGetArticleInCollection';
import { validateChain, getBreakingChildren } from './_helper';
import ExclusiveSubscriptor from '../../private/LN10/home/components/exclusiveSubscriptor/default';
import setCommonCustomFields from '../utils/setCommonCustomFields';
import diagramationRules from '../../private/common/utils/diagramationRules';
import checkChildInSection from '../utils/checkChildBySection';
import setRender from '../utils/setRender';
import StaticContent from '../../private/common/staticContent';

const CajaCollection = props => {
    const {
        id: chainId,
        isAdmin,
        customFields: {
            idCollection,
            url,
            title,
            layout = '',
            initialPosition,
            imageId,
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
        outputType,
        renderables,
        tree = {},
        layout: pageLayout
    } = props;

    const {
        collectionsInPage,
        notesQuantity,
        classCondition,
        position,
        sectionName,
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
        isAdmin
    };

    const {
        isInSiteService,
        articlesFromCollectionSiteService,
        idsArticlesToExclude,
        titleSize,
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

    const isExclusiveSuscriptor = chainStyle === 'exclusiveSub';

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

    const Component = (
        <CajaTema
            title={title}
            hideTitle={hideTitle}
            url={url}
            imageId={imageId}
            outputType={outputType}
            layout={layout}
            classCondition={`${classCondition}${(isInApertura &&
                layout.includes('focal') &&
                ' --apertura') ||
                ''}`}
            notesQuantity={notesQuantity}
            position={position}
            positionInsideSection={positionInsideSection}
            sectionName={sectionName}
            articles={_articles}
            titleSize={titleSize}
            handleClick={productClickFromClient}
            pageLayout={pageLayout}
        />
    );

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
                    isExclusiveSuscriptor: isExclusiveSuscriptor && (
                        <ExclusiveSubscriptor
                            layout={layout}
                            roof={roofData}
                            rules={diagramationRules(layout)}
                            articles={_articles}
                        />
                    ),
                    default: Component
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
