/* eslint-disable react/prop-types */
import React from 'react';
import Static from 'fusion:static';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import CajaTema from '../private/LN/common/cajaTema';
import {
    cajaTemasCustomsFields,
    getArticlesFromMyCurrentCollection,
    validateFeature,
    getCommonProps,
    isInApertura
} from '../private/LN/common/utils/cajaTemasHelper';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

const CajaTemaCollections = props => {
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
        tree
    } = props;

    const {
        collectionsInPage,
        notesQuantity,
        bgColor,
        classCondition
    } = getCommonProps(props);

    const articlesFiltered = getArticlesFromMyCurrentCollection(
        collectionsInPage,
        idCollection,
        Number(initialPosition) - 1,
        Number(notesQuantity)
    );

    const isInsideApertura = isInApertura(tree, featureId);

    const error = validateFeature(
        idCollection,
        articlesFiltered,
        `La colección ${idCollection} no encontró notas (verificar si está en Site Service)`
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
                articles={articlesFiltered}
                titleSize={isInsideApertura && '--l'}
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

CajaTemaCollections.label = 'LN Caja Collections';

CajaTemaCollections.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    outputType: PropTypes.bool.isRequired,
    customFields: PropTypes.shape({
        ...cajaTemasCustomsFields('cajaTemaCollections')
    }).isRequired,
    tree: PropTypes.shape(PropTypes.node).isRequired
};

export default Consumer(CajaTemaCollections);
