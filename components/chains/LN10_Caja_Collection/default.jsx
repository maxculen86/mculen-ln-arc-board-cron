/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { Roof } from '@ln/contenidos-ui-roof';
import '../../../resources/packages/css/@ln/contenidos-ui-roof/index.css';
import CajaTema from '../../private/LN/common/cajaTema';
import {
    cajaTemasCustomsFields,
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

export const roofData = {
    textButton: 'Text button',
    hrefButton: 'https://www.lanacion.com.ar/',
    links: [
        {
            text: 'LA NACION',
            href: 'https://www.lanacion.com.ar/',
            target: 'blank'
        },
        {
            text: 'LA NACION',
            href: 'https://www.lanacion.com.ar/',
            target: 'blank'
        },
        {
            text: 'LA NACION',
            href: 'https://www.lanacion.com.ar/',
            target: 'blank'
        }
    ],
    logo: {
        src:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Logo_La_Naci%C3%B3n.svg/1200px-Logo_La_Naci%C3%B3n.svg.png',
        alt: 'imagen ejemplo alt',
        width: 55,
        height: 55
    }
};

const CajaCollection = props => {
    const {
        id: featureId,
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
            exclusiveSuscriptor = true
        },
        outputType,
        renderables,
        tree = {},
        layout: pageLayout
    } = props;

    if (hideCaja) return <></>;

    if (exclusiveSuscriptor) {
        return (
            <Roof roofType="exc-sub">
                <Roof.Left text="EXCLUSIVO SUSCRIPTORES" />
                <Roof.Right
                    textButton={roofData.textButton}
                    hrefButton={roofData.hrefButton}
                    navData={roofData.links}
                />
            </Roof>
        );
    }

    const {
        collectionsInPage,
        notesQuantity,
        classCondition,
        position,
        sectionName,
        positionInsideSection
    } = getCommonProps(props);

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
        featureId
    });
    const articlesToShow = !isInSiteService
        ? getArticleInCollection(
              notesQuantity,
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

    if (isAdmin && !!error) {
        return (
            <WarningMessage
                id={featureId}
                type={error.type}
                message={error.message}
            />
        );
    }

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

    const noStaticComponent =
        (_articles && _articles.length && Component) || getPlaceholder(layout);

    return isHome ? (
        <StaticContent>{Component}</StaticContent>
    ) : (
        noStaticComponent
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
        ...cajaTemasCustomsFields('cajaCollection')
    }),
    tree: PropTypes.shape(PropTypes.node),
    globalContent: PropTypes.shape({
        name: PropTypes.string
    })
};

export default Consumer(CajaCollection);
