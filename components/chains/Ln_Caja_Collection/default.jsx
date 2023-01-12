/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import getArticleInCollection from '../../private/LN/common/hooks/useGetArticleInCollection';
import CajaTema from '../../private/LN/common/cajaTema';
import {
    cajaTemasCustomsFields,
    getCommonProps,
    isInApertura
} from '../../private/LN/common/utils/cajaTemasHelper';
import {
    validateFeature,
    getArticlesFromMyCurrentCollection
} from '../../private/LN/common/utils/cajaTemasValidators';
import PageBuilderMessage from '../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import siteConfig from '../../../properties/sites/la-nacion-ar';
import get from '../../private/common/utils/get';
import { getPlaceholder } from '../../private/LN/common/utils/cajaTemasPlaceholder';
import { productClickFromClient } from '../../private/common/utils/viewability';
import StaticContent from '../../private/common/staticContent';
import checkHydrateOnly from '../../private/LN/common/utils/checkHydrateOnly';

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
            website
        },
        outputType,
        renderables = [],
        tree = {},
        globalContent: { node_type: nodeType } = {},
        layout: pageLayout
    } = props;

    if (hideCaja) return <></>;

    const {
        collectionsInPage,
        notesQuantity,
        classCondition,
        position,
        sectionName,
        positionInsideSection
    } = getCommonProps(props);

    const { layoutsName = {} } = siteConfig;
    const hasHydrateOnly = checkHydrateOnly({ nodeType, layout: pageLayout });

    const diagramation = renderables.some(
        elem =>
            get(elem, 'collection') === 'layouts' &&
            get(elem, 'type') === layoutsName.Home
    )
        ? layout
        : '';

    const articlesFromCollectionSiteService = getArticlesFromMyCurrentCollection(
        collectionsInPage,
        idCollection,
        Number(initialPosition) - 1,
        notesQuantity
    );

    const idCollectionsInPage = get(
        props,
        'globalContent.acumuladoGeneral.colecciones',
        []
    );

    const isInSiteService = idCollectionsInPage.includes(idCollection);
    const isInsideApertura =
        tree.type === 'LN-acumulado' ? isInApertura(featureId, tree) : false;

    const titleSize =
        ((isInsideApertura || layout === 'grilla1' || layout === 'grilla2') &&
            '--l') ||
        undefined;

    const articlesToShow = !isInSiteService
        ? getArticleInCollection(
              notesQuantity,
              diagramation,
              idCollection,
              20,
              Number(initialPosition) - 1,
              idCollectionsInPage,
              true,
              !isInSiteService,
              layout,
              website,
              hasHydrateOnly
          )
        : [];

    const _articles = isInSiteService
        ? articlesFromCollectionSiteService
        : articlesToShow;

    const error = validateFeature(idCollection, _articles, layout);

    if (isAdmin && !!error) {
        return (
            <div
                style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    width: '100%'
                }}
            >
                <PageBuilderMessage
                    key={featureId}
                    type={error.type}
                    message={error.message}
                />
            </div>
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

    return hasHydrateOnly ? (
        <StaticContent>{Component}</StaticContent>
    ) : (
        noStaticComponent
    );
};

CajaCollection.label = 'LN Caja Collection';

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
