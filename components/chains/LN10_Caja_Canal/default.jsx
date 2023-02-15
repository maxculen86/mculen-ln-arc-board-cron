/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import CajaTema from '../../private/LN/common/cajaTema';
import {
    getArticlesOfChain,
    getCommonProps,
    isInApertura
} from '../../private/LN/common/utils/cajaTemasHelperLN10';
import { validateFeature } from '../../private/LN/common/utils/cajaTemasValidators';
import { getPlaceholder } from '../../private/LN/common/utils/cajaTemasPlaceholder';
import { productClickFromClient } from '../../private/common/utils/viewability';
import StaticContent from '../../private/common/staticContent';
import getDataChainCollection from '../utils/getDataChainCollection';
import getArticleInCollection from '../../private/LN/common/hooks/useGetArticleInCollection';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import setCommonCustomFields from '../utils/setCommonCustomFields';
import { getMarkupForDatalayer } from '../../private/LN/common/utils/cajaTemasHelper';
import getComponent from '../utils/getComponent';
import CommonCollection from '../../private/LN10/home/components/CommonCollection/default';
import setRender from '../utils/setRender';
import getGridType from '../utils/getGridType';
import diagramationRules from '../../private/common/utils/diagramationRules';

const CajaCanal = props => {
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
        outputType,
        renderables,
        tree = {},
        layout: pageLayout
    } = props;

    if (hideCaja) return <></>;

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
        collectionsInPage,
        notesQuantity,
        classCondition,
        position,
        sectionName,
        positionInsideSection
    } = getCommonProps(props);

    const rules = diagramationRules(layout) || [];

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
        website,
        notesQuantity,
        featureId: chainId
    });
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

    const error = validateFeature(idCollection, _articles, layout);

    const { extraOptsDiv, extraOpts: viewabilityData } = getMarkupForDatalayer(
        '',
        layout,
        position,
        '',
        positionInsideSection
    );

    const ContainerCards = getComponent(chainStyle, layout);

    if (isAdmin && !!error) {
        return (
            <WarningMessage
                id={chainId}
                type={error.type}
                message={error.message}
            />
        );
    }

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
                            ContainerCards={ContainerCards}
                            position={position}
                        />
                    )
                }
            })}
        </StaticContent>
    );

    // const Component = (
    //     <CajaTema
    //         title={title}
    //         hideTitle={hideTitle}
    //         url={url}
    //         imageId={imageId}
    //         outputType={outputType}
    //         layout={layout}
    //         classCondition={`${classCondition}${(isInApertura &&
    //             layout.includes('focal') &&
    //             ' --apertura') ||
    //             ''}`}
    //         notesQuantity={notesQuantity}
    //         position={position}
    //         positionInsideSection={positionInsideSection}
    //         sectionName={sectionName}
    //         articles={_articles}
    //         titleSize={titleSize}
    //         handleClick={productClickFromClient}
    //         pageLayout={pageLayout}
    //     />
    // );

    // const noStaticComponent =
    //     (_articles && _articles.length && Component) || getPlaceholder(layout);

    // return isHome ? (
    //     <StaticContent>{Component}</StaticContent>
    // ) : (
    //     noStaticComponent
    // );
};

CajaCanal.label = 'LN10 Caja Canal';

CajaCanal.propTypes = {
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

export default Consumer(CajaCanal);
