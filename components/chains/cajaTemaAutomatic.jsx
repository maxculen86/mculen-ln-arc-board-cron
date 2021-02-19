import React from 'react';
import Static from 'fusion:static';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import getArticleInCollection from '../private/LN/common/utils/getArticleInCollection';
import CajaTema from '../private/LN/common/cajaTema';
import {
    cajaTemasCustomsFields,
    calculateSizeOfCollection,
    validateFeature,
    getCommonProps,
    getIdsArticlesFromOtherCollections
} from '../private/LN/common/utils/cajaTemasHelper';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

const CajaTemaAutomatic = props => {
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
            hideTitle
        },
        outputType,
        renderables
    } = props;

    const {
        collectionsInPage,
        notesQuantity,
        bgColor,
        classCondition
    } = getCommonProps(props);

    const idsArticlesToExclude = getIdsArticlesFromOtherCollections(
        renderables,
        collectionsInPage
    );

    const size = calculateSizeOfCollection(collectionsInPage, notesQuantity);

    const articlesToShow = getArticleInCollection(
        idCollection,
        size,
        Number(initialPosition) - 1,
        idsArticlesToExclude,
        true,
        Number(notesQuantity)
    );

    const error = validateFeature(
        idCollection,
        articlesToShow,
        `La colección ${idCollection} no encontró notas (verificar si el tamaño de la colección esta configurado en 20 notas)`
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
        <Static id={featureId}>
            <CajaTema
                title={title}
                hideTitle={hideTitle}
                url={url}
                imageId={imageId}
                outputType={outputType}
                layout={layout}
                classCondition={classCondition}
                articles={articlesToShow}
                notesQuantity={notesQuantity}
                backgroundColor={
                    backgroundColor !== 'default'
                        ? `${bgColor}${backgroundColor}`
                        : ''
                }
            />
        </Static>
    );
};

CajaTemaAutomatic.label = 'LN Caja Automatica';

CajaTemaAutomatic.propTypes = {
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
        ...cajaTemasCustomsFields('cajaTemaAutomatic')
    }).isRequired
};

export default Consumer(CajaTemaAutomatic);
