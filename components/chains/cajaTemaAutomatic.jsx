import React from 'react';
import Static from 'fusion:static';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import getArticleInCollection from '../private/LN/common/utils/getArticleInCollection';
import CajaTema from '../private/LN/common/cajaTema';
import {
    cajaTemasCustomsFields,
    calculateSizeOfCollection,
    getArticlesToShow
} from '../private/LN/common/utils/cajaTemasHelper';
import config from '../../properties/sites/la-nacion-ar';

const CajaTemaAutomatic = props => {
    const validateFeature = (idCollection, layout) => {
        let error;
        if (!idCollection)
            error = {
                type: 'warning',
                message: 'Se requiere el id de la colección de la caja de temas'
            };
        return error;
    };

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
        globalContent
    } = props;

    const { cajaTemaCss = {} } = config || {};
    const { collectionsInPage = [] } = globalContent || {};
    const error = validateFeature(idCollection, layout);
    const notesQuantity = Number(layout.slice(-1));
    const bgColor =
        backgroundColor === 'default' || backgroundColor === null
            ? ''
            : '--bgcolor ';
    const classCondition = cajaTemaCss[layout];

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

    const size = calculateSizeOfCollection(collectionsInPage, notesQuantity);
    const articles = getArticleInCollection(
        idCollection,
        size,
        initialPosition - 1
    );

    const articlesToShow = getArticlesToShow(
        articles,
        collectionsInPage,
        initialPosition,
        notesQuantity
    );

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
    customFields: PropTypes.shape({
        ...cajaTemasCustomsFields('cajaTemaAutomatic')
    }).isRequired
};

export default Consumer(CajaTemaAutomatic);
