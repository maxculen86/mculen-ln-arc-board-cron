import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import getArticleInCollection from '../private/LN/common/utils/getArticleInCollection';
import CajaTema from '../private/LN/common/cajaTema';
import {
    cajaTemasCustomsFields,
    calculateSizeOfCollection,
    validateFeature,
    getCommonProps,
    getIdsArticlesFromOtherCollections,
    isInApertura,
    getArticlesFromMyCurrentCollection
} from '../private/LN/common/utils/cajaTemasHelper';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

const CajaCollection = props => {
    const {
        id: featureId,
        isAdmin,
        customFields: {
            idCollection,
            url,
            title,
            layout = '',
            backgroundColor,
            initialPosition,
            imageId,
            hideTitle,
            hideCaja
        },
        outputType,
        renderables,
        tree
    } = props;

    if (hideCaja) return <></>;

    const {
        collectionsInPage,
        notesQuantity,
        bgColor,
        classCondition
    } = getCommonProps(props);

    const articlesFromCollectionSiteService = getArticlesFromMyCurrentCollection(
        collectionsInPage,
        idCollection,
        Number(initialPosition) - 1,
        Number(notesQuantity)
    );

    const isManualCollection = articlesFromCollectionSiteService.length > 0;

    const idsArticlesToExclude = !isManualCollection
        ? getIdsArticlesFromOtherCollections(renderables, collectionsInPage)
        : [];

    const isInsideApertura = isInApertura(tree, featureId);

    const size = calculateSizeOfCollection(collectionsInPage, notesQuantity);

    const articlesToShow = !isManualCollection
        ? getArticleInCollection(
              idCollection,
              size,
              Number(initialPosition) - 1,
              idsArticlesToExclude,
              true,
              !isManualCollection,
              Number(notesQuantity)
          )
        : [];

    const error = validateFeature(
        idCollection,
        isManualCollection ? articlesFromCollectionSiteService : articlesToShow,
        `La colección ${idCollection} no encontró notas`
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
            idsArticlesToExclude={idsArticlesToExclude}
            notesQuantity={notesQuantity}
            articles={
                isManualCollection
                    ? articlesFromCollectionSiteService
                    : articlesToShow
            }
            idCollection={idCollection}
            size={size}
            titleSize={isInsideApertura && '--l'}
            from={initialPosition - 1}
            backgroundColor={
                backgroundColor !== 'default'
                    ? `${bgColor}${backgroundColor}`
                    : ''
            }
        />
    );
};

CajaCollection.label = 'LN Caja Collection';

CajaCollection.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    outputType: PropTypes.bool.isRequired,
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
    tree: PropTypes.shape(PropTypes.node).isRequired
};

export default Consumer(CajaCollection);
