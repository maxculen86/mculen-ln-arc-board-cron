import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import getArticleInCollection from '../../private/LN/common/utils/getArticleInCollection';
import CajaTema from '../../private/LN/common/cajaTema';
import {
    cajaTemasCustomsFields,
    getCommonProps,
    isInApertura
} from '../../private/LN/common/utils/cajaTemasHelper';
import {
    validateFeature,
    getIdsArticlesFromOtherCollections,
    getArticlesFromMyCurrentCollection
} from '../../private/LN/common/utils/cajaTemasValidators';
import PageBuilderMessage from '../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import siteConfig from '../../../properties/sites/la-nacion-ar';
import get from '../../private/common/utils/get';

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
            hideCaja
        },
        outputType,
        renderables,
        tree = {}
    } = props;

    if (hideCaja) return <></>;

    const {
        collectionsInPage,
        notesQuantity,
        classCondition,
        position,
        sectionName
    } = getCommonProps(props);

    const { layoutsName = {} } = siteConfig || {};

    const diagramation =
        (renderables.some(
            elem =>
                get(elem, 'collection') === 'layouts' &&
                get(elem, 'type') === layoutsName.Home
        ) &&
            layout) ||
        '';

    const articlesFromCollectionSiteService = getArticlesFromMyCurrentCollection(
        collectionsInPage,
        idCollection,
        Number(initialPosition) - 1,
        notesQuantity
    );

    const isInSiteService = articlesFromCollectionSiteService.length > 0;

    const idsArticlesToExclude = !isInSiteService
        ? getIdsArticlesFromOtherCollections(renderables, collectionsInPage)
        : [];

    const isInsideApertura =
        tree.type === 'LN-acumulado' ? isInApertura(tree, featureId) : false;

    const titleSize =
        ((isInsideApertura || layout === 'grilla1' || layout === 'grilla2') &&
            '--l') ||
        '';

    const articlesToShow = !isInSiteService
        ? getArticleInCollection(
              idCollection,
              20,
              Number(initialPosition) - 1,
              idsArticlesToExclude,
              true,
              !isInSiteService,
              notesQuantity,
              layout,
              diagramation
          )
        : [];

    const error = validateFeature(
        idCollection,
        isInSiteService ? articlesFromCollectionSiteService : articlesToShow,
        layout
    );

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

    return (
        <CajaTema
            title={title}
            hideTitle={hideTitle}
            url={url}
            imageId={imageId}
            outputType={outputType}
            layout={layout}
            classCondition={classCondition}
            notesQuantity={notesQuantity}
            position={position}
            sectionName={sectionName}
            articles={
                isInSiteService
                    ? articlesFromCollectionSiteService
                    : articlesToShow
            }
            titleSize={titleSize}
        />
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
                    initialPosition: PropTypes.string
                })
            })
        })
    ).isRequired,
    customFields: PropTypes.shape({
        ...cajaTemasCustomsFields('cajaCollection')
    }).isRequired,
    tree: PropTypes.shape(PropTypes.node).isRequired,
    globalContent: PropTypes.shape({
        name: PropTypes.string
    }).isRequired
};

CajaCollection.defaultProps = {
    outputType: 'default',
    isAdmin: false
};

export default Consumer(CajaCollection);
